import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, ElementRef, EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CollapseModule } from 'ngx-bootstrap/collapse';
@Component({
	selector: "vs-toolbar",
	templateUrl: "toolbar.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["toolbar.component.scss"]
})
export class ToolbarComponent {
	@Input() loggedIn: boolean = false;
	@Output() tickerSearch: EventEmitter<string> = new EventEmitter();
	@ViewChild("search") searchEl: ElementRef;

	searchForm = new FormGroup({
		ticker: new FormControl()
	});
	searchActive = false;

	get ticker() {
		return this.searchForm.get("ticker").value;
	}

	onSubmit() {
		if (this.ticker && this.ticker.trim() !== "") {
			this.tickerSearch.emit(this.ticker.trim());
			this.searchForm.get("ticker").setValue("");
		}
		this.searchActive = false;
	}

	openSearch() {
		this.searchActive = true;
		setTimeout(() => this.searchEl.nativeElement.focus(), 0);
	}
}
