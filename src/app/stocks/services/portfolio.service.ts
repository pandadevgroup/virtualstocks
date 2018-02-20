import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Portfolio } from "../models";

@Injectable()
export class PortfolioService {
	constructor() {}

	getPortfolio(userId): Observable<Portfolio> {
		return Observable.of({
			stocks: [],
			value: 1000
		});
	}
}
