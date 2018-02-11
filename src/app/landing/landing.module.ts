import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from "./containers";

const routes: Routes = [
	{ path: "", pathMatch: "full", component: LandingComponent },
];

@NgModule({
  imports: [
	CommonModule,
	RouterModule.forChild(routes)
  ],
  declarations: [
	  LandingComponent
  ]
})
export class LandingModule { }
