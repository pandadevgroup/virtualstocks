import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { Portfolio } from "../models";

import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class PortfolioService {
	constructor(private db: AngularFirestore) {}

	getPortfolio(userId): Observable<Portfolio> {
		return this.db.doc<Portfolio>(`portfolios/${userId}`).valueChanges();
	}
}
