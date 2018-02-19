import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromServices from "./services";
import * as fromGuards from "./guards";

import { reducers, effects } from "./store";

const routes: Routes = [
	{ path: "login", loadChildren: "./login/login.module#LoginModule" },
	{ path: "register", loadChildren: "./register/register.module#RegisterModule" }
];

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature("auth", reducers),
		EffectsModule.forFeature(effects)
	],
	providers: [
		...fromServices.services,
		...fromGuards.guards
	],
	declarations: []
})
export class AuthModule {}
