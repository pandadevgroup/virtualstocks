import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import "chart.js";
import { ChartsModule } from "ng2-charts";

import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { SharedModule } from "@app/stocks";

const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		component: fromContainers.PortfolioComponent
	}
];

@NgModule({
	declarations: [
		...fromContainers.containers,
		...fromComponents.components
	],
	imports: [
		CommonModule,
		SharedModule,

		RouterModule.forChild(routes),

		ChartsModule
	]
})
export class PortfolioModule {}
