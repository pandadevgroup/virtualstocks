import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take, filter, tap } from "rxjs/operators";

import * as fromRoot from "@app/core/store";
import * as fromActions from "../actions";
import { StocksService } from "@app/stocks/services";

@Injectable()
export class StocksDataEffects {
	constructor(
		private actions$: Actions,
		private stocksService: StocksService
	) {}

	@Effect()
	queryBatchStockPrices$ = this.actions$.ofType(fromActions.QUERY_BATCH_STOCK_PRICES).pipe(
		switchMap((action: fromActions.QueryBatchStockPrices) =>
			this.stocksService.queryBatchStockPrices(action.payload).pipe(
				map(data => new fromActions.QueryBatchStockPricesSuccess(data)),
				catchError(error => of(new fromActions.QueryBatchStockPricesFail(error)))
			)
		)
	);

	@Effect()
	queryStockDetail$ = this.actions$.ofType(fromActions.QUERY_STOCK_DETAIL).pipe(
		switchMap((action: fromActions.QueryStockDetail) =>
			this.stocksService.getStockDetail(action.payload).pipe(
				map(data => new fromActions.QueryStockDetailSuccess(data)),
				catchError(error => of(new fromActions.QueryStockDetailFail(error)))
			)
		)
	)
}
