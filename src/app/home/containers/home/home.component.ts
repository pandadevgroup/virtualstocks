import { Component } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { Stock } from "@app/models";
import { UserService } from "@app/services";

@Component({
	templateUrl: "home.component.html",
	styleUrls: ["home.component.scss"]
})
export class HomeComponent {
	stocks: Observable<Stock[]> = this.userService.getStocks();

	constructor(private userService: UserService) {}
}
