import { Component, Input, ChangeDetectionStrategy } from "@angular/core";

@Component({
	selector: "vs-toolbar",
	templateUrl: "toolbar.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["toolbar.component.scss"]
})
export class ToolbarComponent {
	@Input() loggedIn: boolean = false;
}
