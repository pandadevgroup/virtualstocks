import { Component } from "@angular/core";

@Component({
	selector: "vs-login-button",
	template: `
		<button type="button" class="login-button" (click)="onClick()">
			<span class="login-button__icon">
				<img src="/assets/google.svg">
			</span>
			<span class="login-button__text">
				Login with Google
			</span>
		</button>
	`,
	styleUrls: ["./login-button.component.scss"]
})
export class LoginButtonComponent {
	onClick() {}
}
