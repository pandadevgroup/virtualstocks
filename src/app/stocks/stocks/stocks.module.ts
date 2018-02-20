import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

import * as fromContainers from "./containers";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: fromContainers.StocksComponent}
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		...fromContainers.containers
	]
})
export class StocksModule {}
