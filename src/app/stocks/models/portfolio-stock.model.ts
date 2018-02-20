import { Stock } from "./stock.model";

export interface PortfolioStock extends Stock {
	/** Number of stocks owned */
	quantity: number;
	/** Initial total price paid for stocks */
	purchaseValue: number;
}
