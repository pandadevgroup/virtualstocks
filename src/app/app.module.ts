import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { CoreModule } from "@app/core";
import { AuthModule } from "@app/auth";
import { StocksModule } from "@app/stocks";

import { environment } from "@env/environment";

import { AppComponent } from "@app/core/containers";

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		CoreModule,
		AuthModule,
		StocksModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
