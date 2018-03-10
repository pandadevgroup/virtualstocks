import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromServices from "./services";
import * as fromGuards from "./guards";

import { reducers, effects } from "./store";

import * as fromComponents from "./components";
import * as fromContainers from "./containers";

const routes: Routes = [
	{
		path: "login",
		canActivate: [fromGuards.NoAuthGuard],
		component: fromContainers.LoginComponent
	},
	{
		path: "register",
		component: fromContainers.RegisterComponent
	},
	{ path: "logout", component: fromContainers.LogoutComponent }
];

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature("auth", reducers),
		EffectsModule.forFeature(effects),

		ReactiveFormsModule
	],
	providers: [
		...fromServices.services,
		...fromGuards.guards
	],
	declarations: [
		...fromContainers.containers,
		...fromComponents.components
	]
})
export class AuthModule {}
