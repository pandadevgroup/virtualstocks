import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "vs-auth-form",
	templateUrl: "auth-form.component.html",
	styleUrls: ["auth-form.component.scss"]
})
export class AuthFormComponent {
	@Input() type: "login" | "register";
	@Output() action: EventEmitter<any> = new EventEmitter();
}
