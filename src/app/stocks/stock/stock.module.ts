import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { AccordionModule } from 'ngx-bootstrap/accordion';

import * as fromContainers from "./containers";
import * as fromComponents from "./components";

import { SharedModule } from "../shared";

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

		SharedModule,

		AccordionModule.forRoot()
	],
	providers: []
})
export class StockModule {}
