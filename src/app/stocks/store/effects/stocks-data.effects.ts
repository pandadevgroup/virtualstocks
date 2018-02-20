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
}
