import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError, take } from "rxjs/operators";

import * as fromActions from "../actions";
import { OrdersService } from "@app/stocks/services";
import { AuthService } from "@app/auth";

@Injectable()
export class OrdersEffects {
	constructor(
		private actions$: Actions,
		private ordersService: OrdersService,
		private authService: AuthService
	) {}

	@Effect()
	buyStock$ = this.actions$.ofType(fromActions.BUY_STOCK).pipe(
		map((action: fromActions.BuyStock) => action.payload),
		switchMap(order => this.authService.userId.pipe(
			take(1),
			switchMap(id => this.ordersService.buyStock(id, order).pipe(
				map(() => new fromActions.BuyStockSuccess()),
				catchError(error => of(new fromActions.BuyStockFail(error)))
			))
		))
	)
}
