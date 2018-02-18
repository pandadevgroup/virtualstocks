import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import * as fromServices from "@app/auth/services";
import * as fromGuards from "@app/auth/guards";

const routes: Routes = [
	{ path: "login", loadChildren: "./login/login.module#LoginModule" },
	{ path: "register", loadChildren: "./register/register.module#RegisterModule" }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
	],
	providers: [
		...fromServices.services,
		...fromGuards.guards
	],
	declarations: []
})
export class AuthModule {}
