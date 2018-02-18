import { PortfolioStock } from "./portfolio-stock.model";

export interface Portfolio {
	stocks: PortfolioStock[];
	totalValue: number;
}
