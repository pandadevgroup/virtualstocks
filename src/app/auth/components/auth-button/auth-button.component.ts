import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "vs-auth-button",
	template: `
		<button type="button" class="auth-button" (click)="onClick()"
				[class.auth-button--google]="type == 'google'"
				[class.auth-button--facebook]="type == 'facebook'">
			<span class="auth-button__icon">
				<img [src]="'assets/' + type + '.svg'">
			</span>
			<span class="auth-button__text">
				<ng-content></ng-content>
			</span>
		</button>
	`,
	styleUrls: ["./auth-button.component.scss"]
})
export class AuthButtonComponent {
	@Input() type: string;
	@Output() action: EventEmitter<string> = new EventEmitter();

	onClick() {
		this.action.emit(this.type);
	}
}
