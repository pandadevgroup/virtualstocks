import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MatToolbarModule } from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";

import { ServiceWorkerModule } from "@angular/service-worker";

import { AppComponent } from "./app.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { CoreModule } from "@app/core";

import { environment } from "@env/environment";

@NgModule({
	declarations: [AppComponent, ToolbarComponent],
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
		CoreModule,

		MatToolbarModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
