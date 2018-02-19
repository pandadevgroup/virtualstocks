import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from '@ngrx/router-store';

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ServiceWorkerModule } from "@angular/service-worker";

import { MatToolbarModule } from "@angular/material";

import { environment } from "@env/environment";

import * as fromStore from "./store";

import * as fromContainers from "./containers";
import * as fromComponents from "./components";

import { CoreRoutingModule } from "./core-routing.module";

@NgModule({
	declarations: [
		...fromContainers.containers,
		...fromComponents.components
	],
	imports: [
		CommonModule,
		HttpClientModule,

		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production
		}),

		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,

		StoreModule.forRoot(fromStore.reducers),
		EffectsModule.forRoot(fromStore.effects),
		environment.production ? [] : StoreDevtoolsModule.instrument(),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router'
		}),

		MatToolbarModule,

		CoreRoutingModule
	],
	providers: [
		{ provide: RouterStateSerializer, useClass: fromStore.CustomSerializer }
	]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error(
				"CoreModule is already loaded. Import only in AppModule"
			);
		}
	}
}
