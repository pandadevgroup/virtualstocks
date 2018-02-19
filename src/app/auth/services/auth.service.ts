import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

import { AuthInfo, User } from "@app/auth";

import { Observable } from "rxjs/Observable";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class AuthService {
	constructor(private af: AngularFireAuth) {}

	get user(): Observable<User> {
		return this.af.authState.pipe(
			map(this._parseAuthUser.bind(this))
		);
	}

	login(authInfo: AuthInfo): Observable<User> {
		if (authInfo.type === "google") {
			return this._loginWithGoogle();
		} else if (authInfo.type === "credentials") {
			return this._loginWithCreds(authInfo);
		} else {
			throw "AuthInfo.type should be either 'google' or 'credentials'";
		}
	}

	logout() {
		this.af.auth.signOut();
	}

	_loginWithGoogle(): Observable<User> {
		return Observable.fromPromise(
			this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
		).pipe(
			map(response => this._parseAuthUser(response.user))
		);
	}

	_loginWithCreds(authInfo: AuthInfo): Observable<User> {
		return Observable.fromPromise(
			this.af.auth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
		).pipe(
			map(response => this._parseAuthUser(response))
		);
	}

	_parseAuthUser(user): User {
		if (!user) return null;

		const name = user.displayName;
		const email = user.email;
		const id = user.uid;

		return {
			name, email, id
		};
	}
}
