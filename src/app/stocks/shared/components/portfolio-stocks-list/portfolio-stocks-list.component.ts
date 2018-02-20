import { Component, Input } from "@angular/core";

import { PortfolioStock } from "@app/stocks";

@Component({
	selector: "vs-portfolio-stocks-list",
	templateUrl: "portfolio-stocks-list.component.html",
	styleUrls: ["portfolio-stocks-list.component.scss"]
})
export class PortfolioStocksListComponent {
	@Input() stocks: PortfolioStock[];
}
