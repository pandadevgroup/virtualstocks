import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromStore from "./store";
import { services } from "./services";
import * as fromGuards from "./guards";
import * as fromAuth from "@app/auth";

const routes: Routes = [
	{
		path: "stock/:ticker",
		canActivate: [fromAuth.AuthGuard, fromGuards.PortfolioGuard],
		loadChildren: "./stock#StockModule"
	},
	{
		path: "stocks",
		canActivate: [fromAuth.AuthGuard, fromGuards.PortfolioGuard],
		loadChildren: "./stocks#StocksModule"
	},
	{
		path: "transactions",
		canActivate: [fromAuth.AuthGuard, fromGuards.TransactionsGuard],
		loadChildren: "./transactions#TransactionsModule"
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		StoreModule.forFeature("stocks", fromStore.reducers),
		EffectsModule.forFeature(fromStore.effects)
	],
	providers: [
		...services,
		...fromGuards.guards
	]
})
export class StocksModule {}
