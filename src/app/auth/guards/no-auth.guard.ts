import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import { tap, switchMap, filter, take, map } from "rxjs/operators";

import * as fromAuth from "../store";

import { AuthService } from "../services";

@Injectable()
export class NoAuthGuard implements CanActivate {
	constructor(private router: Router, private store: Store<fromAuth.AuthState>) {}

	canActivate(): Observable<boolean> {
		return this.checkStore().pipe(switchMap(this.checkAuth.bind(this)));
	}

	private checkStore() {
		return this.store.select(fromAuth.getUserLoaded).pipe(
			filter(loaded => loaded),
			take(1)
		);
	}

	private checkAuth() {
		return this.store.select(fromAuth.getUserLoggedIn).pipe(
			map(loggedIn => {
				if (loggedIn) {
					this.router.navigate(["/home"]);
				}
				return !loggedIn;
			})
		);
	}
}
