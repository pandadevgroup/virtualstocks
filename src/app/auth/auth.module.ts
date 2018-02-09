import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "@app/auth";

const routes: Routes = [
	{ path: "login", loadChildren: "./login/login.module#LoginModule" },
	{ path: "register", loadChildren: "./register/register.module#RegisterModule" }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		SharedModule.forRoot()
	],
	declarations: []
})
export class AuthModule {}
