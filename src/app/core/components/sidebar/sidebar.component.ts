import { Component, Input } from "@angular/core";

@Component({
	selector: "vs-sidebar",
	templateUrl: "sidebar.component.html",
	styleUrls: ["sidebar.component.scss"]
})
export class SidebarComponent {
	@Input() loggedIn: boolean;
}
