import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { AuthInfo, User } from "@app/auth";

import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class AuthService {
	constructor(private af: AngularFireAuth) {}

	login(authInfo: AuthInfo): Observable<User> {
		if (authInfo.type === "google") {
			return this._loginWithGoogle();
		} else if (authInfo.type === "credentials") {
			// TODO
			return Observable.fromPromise(
				this.af.auth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
			);
		} else {
			throw "AuthInfo.type should be either 'google' or 'credentials'";
		}
	}

	_loginWithGoogle(): Observable<User> {
		return Observable.fromPromise(
			this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
		).pipe(
			map(this._parseAuthResponse.bind(this))
		);
	}

	_parseAuthResponse(result) {
		const { user } = result;
		const name = user.displayName;
		const email = user.email;
		const id = user.uid;

		return {
			name, email, id
		};
	}
}
