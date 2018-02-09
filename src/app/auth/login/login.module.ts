import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./containers/login/login.component";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: LoginComponent }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	],
	declarations: [
		LoginComponent
	]
})
export class LoginModule {}
