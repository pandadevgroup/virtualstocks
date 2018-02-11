import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthService } from "./services";

import { AuthGuard } from "./guards";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	exports: []
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [AuthService, AuthGuard]
		};
	}
}
