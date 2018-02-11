import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from "./containers";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: fromContainers.LandingComponent },
];

@NgModule({
  imports: [
	CommonModule,
	RouterModule.forChild(routes)
  ],
  declarations: [
	  ...fromContainers.containers
  ]
})
export class LandingModule { }
