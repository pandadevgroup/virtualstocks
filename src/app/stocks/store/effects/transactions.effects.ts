import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take } from "rxjs/operators";

import * as fromActions from "../actions";
import { TransactionsService } from "@app/stocks/services";
import { StockTransactionPayload, StockOrderType } from "@app/stocks/models";

@Injectable()
export class TransactionsEffects {
	constructor(
		private actions$: Actions,
		private transactionsService: TransactionsService
	) {}

	@Effect()
	stockTransaction$ = this.actions$.ofType(fromActions.STOCK_TRANSACTION).pipe(
		map((action: fromActions.StockTransaction) => action.payload),
		map((order: StockTransactionPayload) => ({
			...order,
			fulfilled: false
		})),
		switchMap(order => this.transactionsService.orderStock(order).pipe(
			map(() => new fromActions.StockTransactionSuccess()),
			catchError(error => of(new fromActions.StockTransactionFail(error)))
		))
	)
}
