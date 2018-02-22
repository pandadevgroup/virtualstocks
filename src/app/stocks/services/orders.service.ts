import { Injectable } from "@angular/core";

import { AngularFirestore } from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { StockOrder } from "@app/stocks/models";

@Injectable()
export class OrdersService {
	constructor(private db: AngularFirestore) {}

	orderStock(order: StockOrder): Observable<any> {
		const ordersCollection = this.db.collection<StockOrder>("orders");
		return Observable.fromPromise(ordersCollection.add(order));
	}
}
