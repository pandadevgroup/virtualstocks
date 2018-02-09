import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { RegisterComponent } from "./containers/register/register.component";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: RegisterComponent }
]

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		RegisterComponent
	]
})
export class RegisterModule {}
