import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: "", pathMatch: "full", loadChildren: "@app/landing#LandingModule" },
	{ path: "home", loadChildren: "@app/home#HomeModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
