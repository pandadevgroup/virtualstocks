import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromStore from "./store";

const routes: Routes = [
	{ path: "stock/:ticker", loadChildren: "./stock#StockModule" }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		StoreModule.forFeature("stocks", fromStore.reducers),
		EffectsModule.forFeature([])
	]
})
export class StocksModule {}
