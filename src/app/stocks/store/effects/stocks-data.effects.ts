import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take, filter, tap } from "rxjs/operators";

import * as fromRoot from "@app/core/store";
import * as fromActions from "../actions";
import { StocksService } from "@app/stocks/services";
import { StockSearchResult } from "@app/stocks";

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
	queryStockInfo$ = this.actions$.ofType(fromActions.QUERY_STOCK_INFO).pipe(
		switchMap((action: fromActions.QueryStockInfo) =>
			this.stocksService.getStockInfo(action.payload).pipe(
				map(data => new fromActions.QueryStockInfoSuccess(data)),
				catchError(error => of(new fromActions.QueryStockInfoFail(error)))
			)
		)
	);

	@Effect()
	stockSearch$ = this.actions$.ofType(fromActions.STOCK_SEARCH).pipe(
		switchMap((action: fromActions.StockSearch) =>
			this.stocksService.runStockSearch(action.payload).pipe(
				map(results => new fromActions.StockSearchSuccess(results)),
				catchError(error => of(new fromActions.StockSearchFail(error)))
			)
		)
	);
}
