import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

import { StoreModule, Store, combineReducers } from "@ngrx/store";

import { LogoutComponent } from "./logout.component";

import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

describe("LogoutComponent (container)", () => {
	let comp: LogoutComponent;
	let fixture: ComponentFixture<LogoutComponent>;
	let store: Store<fromRoot.State>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				StoreModule.forRoot({
					...fromRoot.reducers,
					"auth": combineReducers(fromAuth.reducers)
				})
			],
			declarations: [ LogoutComponent ]
		});

		store = TestBed.get(Store);

		spyOn(store, "dispatch").and.callThrough();

		fixture = TestBed.createComponent(LogoutComponent);
		comp = fixture.componentInstance;

		fixture.detectChanges();
	});

	it("should dispatch two actions", () => {
		const logoutAction = new fromAuth.Logout();
		const goHomeAction = new fromRoot.Go({
			path: ["/"]
		});

		expect(store.dispatch).toHaveBeenCalledWith(logoutAction);
		expect(store.dispatch).toHaveBeenCalledWith(goHomeAction);
	});
});
