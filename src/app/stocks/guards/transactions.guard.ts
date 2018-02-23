import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { tap, filter, take, switchMap } from "rxjs/operators";

import * as fromStore from "@app/stocks/store";
import { AuthGuard } from "@app/auth";

@Injectable()
export class TransactionsGuard implements CanActivate {
	constructor(private authGuard: AuthGuard, private store: Store<fromStore.StocksState>) {}

	canActivate(): Observable<boolean> {
		return this.authGuard.canActivate().pipe(
			switchMap(canActivate => {
				if (canActivate) return this.checkTransactions();
				return of(false);
			})
		);
	}

	checkTransactions(): Observable<boolean> {
		return this.store.select(fromStore.getTransactionsLoaded).pipe(
			tap(loaded => {
				if (!loaded) this.store.dispatch(new fromStore.LoadTransactions())
			}),
			filter(loaded => loaded),
			take(1)
		);
	}
}
