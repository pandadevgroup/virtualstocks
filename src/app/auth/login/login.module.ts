import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";

import * as fromContainers from "./containers";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: fromContainers.LoginComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		MatButtonModule
	],
	declarations: [
		...fromContainers.containers
	]
})
export class LoginModule {}
