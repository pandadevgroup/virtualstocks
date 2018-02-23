import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import * as fromContainers from "./containers";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: fromContainers.PortfolioComponent }
];

@NgModule({
	declarations: [
		...fromContainers.containers
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class PortfolioModule {}
