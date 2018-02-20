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

	runSearch() {
		if (this.showSearch && this.searchControl.value.trim() !== "") {
			this.search.emit(this.searchControl.value.trim());
		}
		this.toggleSearch();
	}

	toggleSearch() {
		this.showSearch = !this.showSearch;
		if (this.showSearch) this.searchRef.nativeElement.focus();
		else this.searchControl.setValue("");
	}

	hideSearch() {
		this.showSearch = false;
		this.searchControl.setValue("");
	}
}
