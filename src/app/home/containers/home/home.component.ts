import { Component } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Stock, UserService } from "@app/shared";

@Component({
	templateUrl: "home.component.html",
	styleUrls: ["home.component.scss"]
})
export class HomeComponent {
	stocks: Observable<Stock[]> = this.userService.getStocks();

	constructor(private userService: UserService) {}
}
