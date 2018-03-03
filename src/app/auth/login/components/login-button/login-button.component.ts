import { Component } from "@angular/core";

@Component({
	selector: "vs-login-button",
	template: `
		<button class="login-button">
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
export class LoginButtonComponent {}
