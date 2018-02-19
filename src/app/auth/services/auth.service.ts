import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from 'firebase/app';

import { AuthInfo, User, GoogleLoginResponse } from "@app/auth";

import { Observable } from "rxjs/Observable";
import { switchMap, catchError, tap, map } from "rxjs/operators";

@Injectable()
export class AuthService {
	constructor(private af: AngularFireAuth, private db: AngularFirestore) {}

	get user(): Observable<User> {
		return this.af.authState.pipe(
			switchMap(this.parseAuthUser.bind(this))
		);
	}

	logout() {
		this.af.auth.signOut();
	}

	getUser(id): Observable<User> {
		return this.db.doc<User>(`/user/${id}`).valueChanges().pipe(tap(x => console.log("boo:",x)));
	}

	loginWithGoogle(): Observable<GoogleLoginResponse> {
		return Observable.fromPromise(
			this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
		).pipe(
			switchMap(googleResponse => {
				return this.parseAuthUser(googleResponse.user).pipe(
					map(user => ({ user, googleResponse }))
				)
			}),
		);
	}

	private loginWithCreds(authInfo: AuthInfo): Observable<User> {
		return Observable.fromPromise(
			this.af.auth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
		).pipe(
			switchMap(response => this.parseAuthUser(response))
		);
	}

	private parseAuthUser(user): Observable<User> {
		if (!user) return null;

		const id = user.uid;

		return this.getUser(id);
	}
}
