import { TestBed } from "@angular/core/testing";

import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { hot, cold } from "jasmine-marbles";

import { UserEffects, AuthService } from "@app/auth";
import * as fromActions from "../actions/user.actions";

const mockAuthService = {
	logout: () => {}
};

describe("User Effects", () => {
	let effects: UserEffects;
	let actions$: Observable<any>;
	let logoutSpy;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				UserEffects,
				provideMockActions(() => actions$),
				{ provide: AuthService, useValue: mockAuthService }
			]
		});

		logoutSpy = spyOn(mockAuthService, "logout");

		effects = TestBed.get(UserEffects);
	});

	describe("logout$", () => {
		it("should call the logout() method of authService", () => {
			actions$ = new ReplaySubject(1);
			const action = new fromActions.Logout();
			(actions$ as ReplaySubject<any>).next(action);

			effects.logout$.subscribe(() => {
				expect(logoutSpy).toHaveBeenCalled();
			});
		});
	});
});
