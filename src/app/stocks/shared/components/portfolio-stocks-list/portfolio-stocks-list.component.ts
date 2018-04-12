import { Component, Input } from "@angular/core";

import { PortfolioStock, BatchStockData } from "@app/stocks/models";

@Component({
	selector: "vs-portfolio-stocks-list",
	templateUrl: "portfolio-stocks-list.component.html",
	styleUrls: ["portfolio-stocks-list.component.scss"]
})
export class PortfolioStocksListComponent {
	@Input() stocks: PortfolioStock[];
	@Input() stockPrices: BatchStockData;

	getPercentChange(stock: PortfolioStock) {
		if (!this.stockPrices[stock.ticker]) return 0;
		let purchase = stock.purchaseValue;
		return this.getStockGain(stock) / purchase;
	}

	getStockGain(stock: PortfolioStock) {
		if (!this.stockPrices[stock.ticker]) return 0;
		let purchase = stock.purchaseValue;
		let current = this.getStockValue(stock);
		return current - purchase;
	}

	getStockValue(stock: PortfolioStock) {
		if (!this.stockPrices[stock.ticker]) return 0;
		return this.stockPrices[stock.ticker].price * stock.quantity;
	}
}
