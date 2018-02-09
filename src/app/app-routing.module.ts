import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "@app/auth";

const routes: Routes = [
	{ path: "", pathMatch: "full", loadChildren: "@app/landing#LandingModule" },
	{ path: "home", canActivate: [AuthGuard], loadChildren: "@app/home#HomeModule" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
