import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, ElementRef, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
	selector: "vs-toolbar",
	templateUrl: "toolbar.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["toolbar.component.scss"]
})
export class ToolbarComponent {
	@Input() loggedIn: boolean = false;
	@Output() search: EventEmitter<string> = new EventEmitter();

	searchForm = new FormGroup({
		ticker: new FormControl()
	});

	get ticker() {
		return this.searchForm.get("ticker").value;
	}

	onSubmit() {
		if (this.ticker && this.ticker.trim() !== "") {
			this.search.emit(this.ticker.trim());
			this.searchForm.get("ticker").setValue("");
		}
	}
}
