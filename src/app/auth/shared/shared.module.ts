import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import * as fromServices from "./services";

import * as fromGuards from "./guards";

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
			providers: [
				...fromServices.services,
				...fromGuards.guards
			]
		};
	}
}
