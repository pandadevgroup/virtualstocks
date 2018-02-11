import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserService } from "./services";

@NgModule({
	imports: [CommonModule],
	declarations: []
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				UserService
			]
		};
	}
}
