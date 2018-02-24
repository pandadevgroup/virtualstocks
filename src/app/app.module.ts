import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { CoreModule } from "@app/core";
import { AuthModule } from "@app/auth";
import { StocksModule } from "@app/stocks";

import { environment } from "@env/environment";

import { AppComponent } from "@app/core/containers";

import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		CoreModule,
		AuthModule,
		StocksModule,
		ModalModule.forRoot()
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
