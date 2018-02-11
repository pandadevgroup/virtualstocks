import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./containers";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: HomeComponent }
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		HomeComponent
	]
})
export class HomeModule {}
