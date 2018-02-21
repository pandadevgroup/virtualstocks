import { Action } from "@ngrx/store";

import { StockOrder } from "@app/stocks/models";

// Buy stock
export const BUY_STOCK = "[Stocks] Buy Stock";
export const BUY_STOCK_SUCCESS = "[Stocks] Buy Stock Success";
export const BUY_STOCK_FAIL = "[Stocks] Buy Stock Fail";

export class BuyStock implements Action {
	readonly type = BUY_STOCK;
	constructor(public payload: StockOrder) {}
}
export class BuyStockSuccess implements Action {
	readonly type = BUY_STOCK_SUCCESS;
}
export class BuyStockFail implements Action {
	readonly type = BUY_STOCK_FAIL;
	constructor(public payload: any) {}
}

export type OrdersAction =
	| BuyStock
	| BuyStockSuccess
	| BuyStockFail;
