import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take } from "rxjs/operators";

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
		switchMap(stocks => this.stocksService.queryBatchStockPrices(stocks)),
		map(data => new fromActions.QueryBatchStockPricesSuccess(data)),
		catchError(error => of(new fromActions.QueryBatchStockPricesFail(error)))
	);
}
