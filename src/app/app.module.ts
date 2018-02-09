import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';

import { MatToolbarModule } from "@angular/material";

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { CoreModule } from '@app/core';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
	AppComponent,
	ToolbarComponent
  ],
  imports: [
	BrowserModule,
	BrowserAnimationsModule,
	AppRoutingModule,
	ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
	CoreModule,

	MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
