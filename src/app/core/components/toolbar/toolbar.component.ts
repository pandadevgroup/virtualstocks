import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, ElementRef, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW, TAB } from '@angular/cdk/keycodes';

import { debounceTime, tap } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { StockSearchResult } from "@app/stocks";

@Component({
	selector: "vs-toolbar",
	templateUrl: "toolbar.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ["toolbar.component.scss"]
})
export class ToolbarComponent implements OnInit, OnDestroy {
	@Input() loggedIn: boolean = false;
	@Output() tickerSearch: EventEmitter<string> = new EventEmitter();
	@Output() partialTickerSearch: EventEmitter<string> = new EventEmitter();
	@Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
	@Output() toggleSidebarMobile: EventEmitter<any> = new EventEmitter();
	searchActive = false;
	searchResultSelectedIndex = 0;

	private _searchResults: StockSearchResult[] = [];
	get searchResults() {
		return this._searchResults;
	}
	@Input()
	set searchResults(searchResults: StockSearchResult[]) {
		if (!this.searchActive) {
			this._searchResults = [];
		} else {
			this._searchResults = searchResults;
		}
		this.searchResultSelectedIndex = 0;
	}

	searchForm = new FormGroup({
		ticker: new FormControl()
	});

	private ngUnsubscribe: Subject<any> = new Subject();

	get ticker() {
		return this.searchForm.get("ticker").value;
	}

	ngOnInit() {
		this.searchForm
			.get("ticker")
			.valueChanges.pipe(debounceTime(100))
			.takeUntil(this.ngUnsubscribe)
			.subscribe((search: string) => {
				search = search.trim();
				this.partialTickerSearch.emit(search.toUpperCase());
			});
	}

	onSubmit(el) {
		if (this.ticker && this.ticker.trim() !== "") {
			let success =
				this.searchResults.length > this.searchResultSelectedIndex;
			this.tickerSearch.emit(
				success
					? this.searchResults[this.searchResultSelectedIndex].symbol
					: this.ticker.trim().toUpperCase()
			);
		}
		this.closeSearch(el);
	}

	openSearch(el?) {
		this.searchActive = true;
		if (el) setTimeout(() => el.focus(), 0);
	}

	closeSearch(el?) {
		this.searchActive = false;
		this.clearSearch();
		if (el) setTimeout(() => el.blur(), 0);
	}

	clearSearch() {
		this.searchForm.get("ticker").setValue("");
		this.searchResults = [];
	}

	handleKeydown(event: KeyboardEvent, el: any) {
		const keyCode = event.keyCode;

		// Prevent the default action on all escape key presses. This is here primarily to bring IE
		// in line with other browsers. By default, pressing escape on IE will cause it to revert
		// the input value to the one that it had on focus, however it won't dispatch any events
		// which means that the model value will be out of sync with the view.
		if (keyCode === ESCAPE) {
			event.preventDefault();
		}

		// Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
		// See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
		if (keyCode === ESCAPE || (keyCode === UP_ARROW && event.altKey)) {
			this.closeSearch(el);
			event.stopPropagation();
		} else if (keyCode === DOWN_ARROW) {
			this.searchResultSelectedIndex++;
			if (this.searchResultSelectedIndex >= this.searchResults.length) this.searchResultSelectedIndex = 0;
		} else if (keyCode === UP_ARROW) {
			this.searchResultSelectedIndex--;
			if (this.searchResultSelectedIndex < 0) this.searchResultSelectedIndex = this.searchResults.length - 1;
		}
	}

	onMenuClick() {
		this.toggleSidebar.emit();
	}

	onMobileMenuClick() {
		this.toggleSidebarMobile.emit();
	}

	setSelectedSearchResult(index: number) {
		this.searchResultSelectedIndex = index;
	}

	onSearchResultClick(index: number, searchEl: any) {
		this.setSelectedSearchResult(index);
		this.onSubmit(searchEl);
	}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
