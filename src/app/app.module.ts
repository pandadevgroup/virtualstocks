import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MatToolbarModule } from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";

import { ServiceWorkerModule } from "@angular/service-worker";

import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { CoreModule } from "@app/core";
import { AuthModule } from "@app/auth";
import { StocksModule } from "@app/stocks";

import { environment } from "@env/environment";

@NgModule({
	declarations: [
		...fromContainers.containers,
		...fromComponents.components
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		ServiceWorkerModule.register("/ngsw-worker.js", {
			enabled: environment.production
		}),

		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,

		StoreModule.forRoot({
			router: routerReducer
		}),
		EffectsModule.forRoot([]),
		environment.production ? [] : StoreDevtoolsModule.instrument(),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router'
		}),

		CoreModule,
		AuthModule,
		StocksModule,

		MatToolbarModule
	],
	providers: [],
	bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
