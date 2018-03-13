import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "vs-sidebar",
	templateUrl: "sidebar.component.html",
	styleUrls: ["sidebar.component.scss"]
})
export class SidebarComponent {
	@Input() loggedIn: boolean;
	@Input() small: boolean;
	@Input() showMobile: boolean;
	@Output() toggleSidebar: EventEmitter<any> = new EventEmitter();

	onAction() {
		if (this.showMobile) this.toggleSidebar.emit();
	}
}
