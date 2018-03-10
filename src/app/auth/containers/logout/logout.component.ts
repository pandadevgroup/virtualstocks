import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

import { AuthService } from "@app/auth/services";

@Component({
	template: ""
})
export class LogoutComponent {
	constructor(private store: Store<fromRoot.State>, private authService: AuthService) {}

	ngOnInit() {
		if (this.authService.userId) this.store.dispatch(new fromAuth.Logout());
		this.store.dispatch(new fromRoot.Go({
			path: ["/"],
			extras: { replaceUrl: true }
		}));
	}
}
