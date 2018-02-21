import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take } from "rxjs/operators";

import * as fromActions from "../actions";
import { OrdersService } from "@app/stocks/services";
import { BuyStockOrder, StockOrderType } from "@app/stocks/models";

@Injectable()
export class OrdersEffects {
	constructor(
		private actions$: Actions,
		private ordersService: OrdersService
	) {}

	@Effect()
	buyStock$ = this.actions$.ofType(fromActions.BUY_STOCK).pipe(
		map((action: fromActions.BuyStock) => action.payload),
		map((order: BuyStockOrder) => ({
			...order,
			fulfilled: false,
			error: null,
			type: StockOrderType.BUY
		})),
		switchMap(order => this.ordersService.buyStock(order).pipe(
			map(() => new fromActions.BuyStockSuccess()),
			catchError(error => of(new fromActions.BuyStockFail(error)))
		))
	)
}
