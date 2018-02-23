import { Injectable } from "@angular/core";

import { AngularFirestore } from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { StockOrder, StockTransaction } from "@app/stocks/models";

@Injectable()
export class TransactionsService {
	constructor(private db: AngularFirestore) {}

	orderStock(order: StockOrder): Observable<any> {
		const transactionsCollection = this.db.collection<StockOrder>("transactions");
		return Observable.fromPromise(transactionsCollection.add(order));
	}

	getTransactions(): Observable<StockTransaction[]> {
		// TODO
		const transactionsCollection = this.db.collection<StockTransaction>("transactions");
		return Observable.of([]);
	}
}
