import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { MatToolbarModule } from "@angular/material";

import * as fromContainers from "./containers";
import * as fromComponents from "./components";
import { CoreModule } from "@app/core";
import { AuthModule } from "@app/auth";
import { StocksModule } from "@app/stocks";

import { AppRoutingModule } from "./app-routing.module";

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

		CoreModule,
		AuthModule,
		StocksModule,

		MatToolbarModule
	],
	providers: [],
	bootstrap: [fromContainers.AppComponent]
})
export class AppModule {}
