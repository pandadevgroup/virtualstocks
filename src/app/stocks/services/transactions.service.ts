import { Injectable } from "@angular/core";

import { AngularFirestore } from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { StockOrder, StockTransaction } from "@app/stocks/models";
import { AuthService } from "@app/auth";

@Injectable()
export class TransactionsService {
	constructor(private db: AngularFirestore, private authService: AuthService) {}

	orderStock(order: StockOrder): Observable<any> {
		const transactionsCollection = this.db.collection<StockTransaction>("transactions");
		return Observable.fromPromise(transactionsCollection.add(order));
	}

	getTransactions(): Observable<StockTransaction[]> {
		return this.db.collection<StockTransaction>(
			"transactions",
			ref => ref.where("uid", "==", this.authService.userId).orderBy("timestamp", "desc")
		).valueChanges();
	}
}
