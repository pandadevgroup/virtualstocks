import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
	selector: "vs-auth-form",
	templateUrl: "auth-form.component.html",
	styleUrls: ["auth-form.component.scss"]
})
export class AuthFormComponent {
	private _type: "login" | "register";

	get type() {
		return this._type;
	}
	@Input() set type(type: "login" | "register") {
		this._type = type;
		this.updateValidators(type);
	}
	@Output() action: EventEmitter<any> = new EventEmitter();

	form = this.fb.group({
		name: ["", Validators.required],
		email: ["", Validators.compose([Validators.required, Validators.email])],
		password: ["", Validators.required],
		password2: ["", Validators.required],
		rememberMe: false
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		console.log(this.form.value, this.form.valid);
	}

	private updateValidators(type) {
		if (type === "login") {
			this.form.get("name").clearValidators();
			this.form.get("email").setValidators([Validators.required, Validators.email]);
			this.form.get("password").setValidators([Validators.required]);
			this.form.get("password2").clearValidators();
			this.form.get("rememberMe").setValidators([Validators.required]);
		} else {
			this.form.get("name").setValidators([Validators.required]);
			this.form.get("email").setValidators([Validators.required, Validators.email]);
			this.form.get("password").setValidators([Validators.required]);
			this.form.get("password2").setValidators([Validators.required]);
			this.form.get("rememberMe").clearValidators();
		}
	}
}
