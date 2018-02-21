import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { MatButtonModule } from '@angular/material';

import * as fromContainers from "./containers";
import * as fromComponents from "./components";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: fromContainers.StockComponent }
];

@NgModule({
	declarations: [
		...fromContainers.containers,
		...fromComponents.components
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		MatButtonModule
	],
	providers: []
})
export class StockModule {}
