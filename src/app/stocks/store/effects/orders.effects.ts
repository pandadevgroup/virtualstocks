import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take } from "rxjs/operators";

import * as fromActions from "../actions";
import { OrdersService } from "@app/stocks/services";
import { StockTransactionPayload, StockOrderType } from "@app/stocks/models";

@Injectable()
export class OrdersEffects {
	constructor(
		private actions$: Actions,
		private ordersService: OrdersService
	) {}

	@Effect()
	stockTransaction$ = this.actions$.ofType(fromActions.STOCK_TRANSACTION).pipe(
		map((action: fromActions.StockTransaction) => action.payload),
		map((order: StockTransactionPayload) => ({
			...order,
			fulfilled: false,
			error: null
		})),
		switchMap(order => this.ordersService.orderStock(order).pipe(
			map(() => new fromActions.StockTransactionSuccess()),
			catchError(error => of(new fromActions.StockTransactoinFail(error)))
		))
	)
}
