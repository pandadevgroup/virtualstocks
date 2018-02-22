import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { combineLatest } from 'rxjs/observable/combineLatest';

import { Portfolio, PortfolioStock } from "../models";

import { AngularFirestore } from "angularfire2/firestore";

@Injectable()
export class PortfolioService {
	constructor(private db: AngularFirestore) {}

	getPortfolio(userId): Observable<Portfolio> {
		const stocks = this.db.collection<PortfolioStock>(`portfolios/${userId}/stocks`);
		return combineLatest(
			this.db.doc<any>(`portfolios/${userId}`).valueChanges(),
			stocks.valueChanges()
		).pipe(
			map(([portfolio, stocks]) => ({ ...portfolio, stocks }))
		);
	}
}
