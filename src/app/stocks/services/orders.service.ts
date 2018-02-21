import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError, map } from "rxjs/operators";

import { StockOrder } from "@app/stocks/models";

@Injectable()
export class OrdersService {
	constructor(private http: HttpClient) {}


}
