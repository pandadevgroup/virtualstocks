import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import "chart.js";
import { ChartsModule } from "ng2-charts";

import * as fromComponents from "./components";

@NgModule({
	imports: [
		CommonModule,
		ChartsModule
	],
	declarations: [
		...fromComponents.components
	],
	exports: [
		...fromComponents.components
	]
})
export class SharedModule {}
