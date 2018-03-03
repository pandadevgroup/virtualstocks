import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";


import * as fromContainers from "./containers";
import * as fromComponents from "./components";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: fromContainers.LoginComponent }
];
@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		...fromContainers.containers,
		...fromComponents.components
	]
})
export class LoginModule {}
