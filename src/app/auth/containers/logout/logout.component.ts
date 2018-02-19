import { Component } from "@angular/core";

import { Store } from "@ngrx/store";
import * as fromRoot from "@app/core/store";
import * as fromAuth from "@app/auth/store";

@Component({
	template: ""
})
export class LogoutComponent {
	constructor(private store: Store<fromRoot.State>) {}

	ngOnInit() {
		this.store.dispatch(new fromAuth.Logout());
		this.store.dispatch(new fromRoot.Go({
			path: ["/"]
		}));
	}
}
