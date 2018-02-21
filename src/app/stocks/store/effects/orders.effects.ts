import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { switchMap, map, catchError } from "rxjs/operators";

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


}
