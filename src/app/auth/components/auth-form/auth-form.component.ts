import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from "@angular/forms";

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
	}, {
		validator: this.matchPasswordValidator()
	});

	constructor(private fb: FormBuilder) {}

	onSubmit() {
		this.form.get("name").markAsTouched();
		this.form.get("email").markAsTouched();
		this.form.get("password").markAsTouched();
		this.form.get("password2").markAsTouched();
		this.form.get("rememberMe").markAsTouched();
		if (this.form.valid) {
			this.action.emit(this.form.value);
		}
	}

	isInvalid(controlName) {
		return this.form.get(controlName).touched && this.form.get(controlName).invalid;
	}

	private updateValidators(type) {
		if (type === "login") {
			this.form.get("name").clearValidators();
			this.form.get("email").setValidators([Validators.required, Validators.email]);
			this.form.get("password").setValidators([Validators.required]);
			this.form.get("password2").clearValidators();
			this.form.clearValidators();
		} else {
			this.form.get("name").setValidators([Validators.required]);
			this.form.get("email").setValidators([Validators.required, Validators.email]);
			this.form.get("password").setValidators([Validators.required]);
			this.form.get("password2").setValidators([Validators.required]);
			this.form.setValidators(this.matchPasswordValidator());
		}
	}

	private matchPasswordValidator(): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
			const password = control.get("password").value;
			const password2 = control.get("password2").value;
			if (password2 === password) {
				return null;
			}
			return { "differentPasswords": true };
		};
	}
}
