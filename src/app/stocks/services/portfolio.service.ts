import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { Portfolio, PortfolioStock } from "../models";

import { AngularFirestore } from "angularfire2/firestore";

import { withLatestFrom } from "rxjs/operators";

@Injectable()
export class PortfolioService {
	constructor(private db: AngularFirestore) {}

	getPortfolio(userId): Observable<Portfolio> {
		const stocks = this.db.collection<PortfolioStock>(`portfolios/${userId}/stocks`);
		return this.db.doc<any>(`portfolios/${userId}`).valueChanges().pipe(
			withLatestFrom(stocks.valueChanges()),
			map(([portfolio, stocks]) => ({ ...portfolio, stocks }))
		);
	}
}
