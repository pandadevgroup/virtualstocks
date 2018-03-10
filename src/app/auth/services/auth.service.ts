import { Injectable } from "@angular/core";

import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore } from "angularfire2/firestore";
import * as firebase from 'firebase/app';

import { AuthInfo, User, GoogleLoginResponse } from "@app/auth";

import { Observable } from "rxjs/Observable";
import { switchMap, catchError, map, take, tap } from "rxjs/operators";

@Injectable()
export class AuthService {
	userId: string = null;

	constructor(private af: AngularFireAuth, private db: AngularFirestore) {}

	get user(): Observable<User> {
		return this.af.authState.pipe(
			tap(user => {
				if (user) this.userId = user.uid;
				else this.userId = null;
			}),
			switchMap(this.parseAuthUser.bind(this))
		);
	}

	logout() {
		this.af.auth.signOut();
	}

	getUser(id): Observable<User> {
		return this.db.doc<User>(`/users/${id}`).valueChanges();
	}

	login(authInfo): Observable<User> {
		return null;
	}

	loginWithGoogle(): Observable<any> {
		return Observable.fromPromise(
			this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
		);
	}

	private loginWithCreds(authInfo: AuthInfo): Observable<User> {
		return Observable.fromPromise(
			this.af.auth.signInWithEmailAndPassword(authInfo.email, authInfo.password)
		);
	}

	private parseAuthUser(user): Observable<User> {
		if (!user) return Observable.of(null);

		const id = user.uid;

		return this.getUser(id);
	}
}
