import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, ElementRef, EventEmitter } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
	selector: "vs-toolbar",
	templateUrl: "toolbar.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["toolbar.component.scss"]
})
export class ToolbarComponent {
	@Input() loggedIn: boolean = false;
	@Output() search: EventEmitter<string> = new EventEmitter();
	@ViewChild("search") searchRef: ElementRef;

	showSearch = false;
	searchControl = new FormControl();

	onSearchClick() {
		this.showSearch = !this.showSearch;
		if (this.showSearch) this.searchRef.nativeElement.focus();
	}

	onEnter() {
		this.runSearch();
		this.showSearch = !this.showSearch;
	}

	onBlur() {
		this.hideSearch();
	}

	runSearch() {
		if (this.searchControl.value && this.searchControl.value.trim() !== "") {
			this.search.emit(this.searchControl.value.trim());
			this.searchControl.setValue("");
		}
	}

	hideSearch() {
		this.showSearch = false;
	}
}
