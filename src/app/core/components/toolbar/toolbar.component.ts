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
	@Input() searchResults: StockSearchResult[] = [];
	@Output() tickerSearch: EventEmitter<string> = new EventEmitter();
	@Output() partialTickerSearch: EventEmitter<string> = new EventEmitter();
	@Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
	@Output() toggleSidebarMobile: EventEmitter<any> = new EventEmitter();
	searchActive = false;

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
			this.tickerSearch.emit(this.ticker.trim().toUpperCase());
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
	}

	onMenuClick() {
		this.toggleSidebar.emit();
	}

	onMobileMenuClick() {
		this.toggleSidebarMobile.emit();
	}

	ngOnDestroy() {
		this.ngUnsubscribe.next();
		this.ngUnsubscribe.complete();
	}
}
