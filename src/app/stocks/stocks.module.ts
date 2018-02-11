import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
	{ path: "details/:ticker", loadChildren: "./stock-detail#StockDetailModule" }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	]
})
export class StocksModule {}
