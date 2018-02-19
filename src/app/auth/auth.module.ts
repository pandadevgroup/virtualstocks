import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromServices from "./services";
import * as fromGuards from "./guards";

import { reducers } from "./store";

const routes: Routes = [
	{ path: "login", loadChildren: "./login/login.module#LoginModule" },
	{ path: "register", loadChildren: "./register/register.module#RegisterModule" }
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature("auth", reducers),
		EffectsModule.forFeature([])
	],
	providers: [
		...fromServices.services,
		...fromGuards.guards
	],
	declarations: []
})
export class AuthModule {}
