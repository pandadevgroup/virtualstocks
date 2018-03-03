import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "vs-login-button",
	template: `
		<button type="button" class="login-button" (click)="onClick()"
				[class.login-button--google]="type == 'google'"
				[class.login-button--facebook]="type == 'facebook'">
			<span class="login-button__icon">
				<img [src]="'/assets/' + type + '.svg'">
			</span>
			<span class="login-button__text">
				<ng-content></ng-content>
			</span>
		</button>
	`,
	styleUrls: ["./login-button.component.scss"]
})
export class LoginButtonComponent {
	@Input() type: string;
	@Output() login: EventEmitter<string> = new EventEmitter();

	onClick() {
		this.login.emit(this.type);
	}
}
