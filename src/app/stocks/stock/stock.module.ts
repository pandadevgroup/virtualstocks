import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

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

		MatButtonModule,
		MatDialogModule
	],
	providers: [],
	entryComponents: [
		...fromComponents.entryComponents
	]
})
export class StockModule {}
