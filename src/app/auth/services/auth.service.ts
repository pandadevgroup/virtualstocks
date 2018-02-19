import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";

import { AuthInfo, User } from "@app/auth";

import { Observable } from "rxjs/Observable";

@Injectable()
export class AuthService {
	constructor(private af: AngularFireAuth) {}

	login(authInfo: AuthInfo): Observable<User> {
		return Observable.of(authInfo);
	}
}
