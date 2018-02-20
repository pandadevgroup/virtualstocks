import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import * as fromContainers from "./containers";

import { SharedModule } from "@app/stocks";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: fromContainers.StocksComponent}
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		SharedModule
	],
	declarations: [
		...fromContainers.containers
	]
})
export class StocksModule {}
