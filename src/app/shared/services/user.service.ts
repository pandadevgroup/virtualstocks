import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { AngularFirestore } from "angularfire2/firestore";

import { Stock } from "../models/stock.model";

@Injectable()
export class UserService {
	constructor(private db: AngularFirestore) {}

	getStocks(): Observable<Stock[]> {
		return this.db.collection<Stock>("stocks").valueChanges();
	}
}
