import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import "chart.js";
import { ChartsModule } from "ng2-charts";

import { AccordionModule } from 'ngx-bootstrap/accordion';

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
		ReactiveFormsModule,

		AccordionModule.forRoot(),

		ChartsModule
	],
	providers: []
})
export class StockModule {}
