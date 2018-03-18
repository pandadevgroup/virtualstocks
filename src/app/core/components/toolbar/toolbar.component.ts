import { Component, Input, Output, ChangeDetectionStrategy, ViewChild, ElementRef, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";

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
	@Output() tickerSearch: EventEmitter<{ success: boolean, ticker: string | null, search: string }> = new EventEmitter();
	@Output() partialTickerSearch: EventEmitter<string> = new EventEmitter();
	@Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
	@Output() toggleSidebarMobile: EventEmitter<any> = new EventEmitter();
	searchActive = false;
	searchResultSelectedIndex = 0;

	private _searchResults: StockSearchResult[] = [];
	get searchResults() {
		return this._searchResults;
	}
	@Input() set searchResults(searchResults: StockSearchResult[]) {
		this._searchResults = searchResults;
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
		this.searchForm.get("ticker").valueChanges.pipe(
			debounceTime(200)
		).takeUntil(this.ngUnsubscribe).subscribe((search: string) => {
			search = search.trim();
			this.partialTickerSearch.emit(search.toUpperCase());
		});
	}

	onSubmit(el) {
		if (this.ticker && this.ticker.trim() !== "") {
			let success = this.searchResults.length > this.searchResultSelectedIndex;
			this.tickerSearch.emit({
				success,
				ticker: success ? this.searchResults[this.searchResultSelectedIndex].symbol : null,
				search: this.ticker.trim().toUpperCase()
			});
			this.searchForm.get("ticker").setValue("");
			this.closeSearch(el);
		}
	}

	openSearch(el) {
		this.searchActive = true;
		setTimeout(() => el.focus(), 0);
	}

	closeSearch(el) {
		this.searchActive = false;
		this.clearSearch();
		setTimeout(() => el.blur(), 0);
	}

	clearSearch() {
		this.searchForm.get("ticker").setValue("");
		this.searchResults = [];
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
