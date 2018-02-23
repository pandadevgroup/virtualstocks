import { TestBed } from "@angular/core/testing";

import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireModule } from "angularfire2";

import { Actions } from "@ngrx/effects";
import { provideMockActions } from "@ngrx/effects/testing";

import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import { of } from "rxjs/observable/of";
import { ReplaySubject } from "rxjs/ReplaySubject";

import { hot, cold } from "jasmine-marbles";

import { UserEffects, AuthService } from "@app/auth";
import * as fromActions from "../actions/user.actions";
import * as fromRoot from "@app/core/store";
import { mockUser } from "@app/auth/test";

import { environment } from "@env/environment";

describe("User Effects", () => {
	let effects: UserEffects;
	let actions$: Observable<any>;
	let service;
	let logoutSpy;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(environment.firebase),
				AngularFireAuthModule,
				AngularFirestoreModule
			],
			providers: [
				UserEffects,
				AuthService,
				provideMockActions(() => actions$),
			]
		});

		effects = TestBed.get(UserEffects);
		service = TestBed.get(AuthService);

		logoutSpy = spyOn(service, "logout");
		spyOn(service, "loginWithGoogle").and.returnValue(of({}));
		spyOnProperty(service, "user", "get").and.returnValue(of(mockUser));
	});

	describe("loginWithGoogle$", () => {
		it("should dispatch a LoginSuccess action", () => {
			const action = new fromActions.LoginWithGoogle();
			const completion = new fromActions.LoginSuccess(mockUser);

			actions$ = hot("-a", { a: action });
			const expected = cold("-b", { b: completion });

			expect(effects.loginWithGoogle$).toBeObservable(expected);
		});

		it("should dispatch a LoginFailure action on fail", () => {
			service.loginWithGoogle.and.returnValue(Observable.throw("Fake Error"));

			const action = new fromActions.LoginWithGoogle();
			const completion = new fromActions.LoginFailure("Fake Error");

			actions$ = hot("-a", { a: action });
			const expected = cold("-b", { b: completion });

			expect(effects.loginWithGoogle$).toBeObservable(expected);
		});
	});

	describe("loginSuccess$", () => {
		it("should dispatch a Go action", () => {
			const action = new fromActions.LoginSuccess(mockUser);
			const completion = new fromRoot.Go({
				path: ["/home"]
			});

			actions$ = hot("-a", { a: action });
			const expected = cold("-b", { b: completion });

			expect(effects.loginSuccess$).toBeObservable(expected);
		});
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
