import { PortfolioStock } from "./portfolio-stock.model";

export interface Portfolio {
	stocks: PortfolioStock[];
	cash: number;
}
