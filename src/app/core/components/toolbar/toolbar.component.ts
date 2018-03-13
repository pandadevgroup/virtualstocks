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
	@Output() toggleSidebar: EventEmitter<any> = new EventEmitter();
	@Output() toggleSidebarMobile: EventEmitter<any> = new EventEmitter();
	searchActive = false;

	searchForm = new FormGroup({
		ticker: new FormControl()
	});

	get ticker() {
		return this.searchForm.get("ticker").value;
	}

	onSubmit(el) {
		if (this.ticker && this.ticker.trim() !== "") {
			this.tickerSearch.emit(this.ticker.trim());
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
		setTimeout(() => el.blur(), 0);
	}

	onMenuClick() {
		this.toggleSidebar.emit();
	}

	onMobileMenuClick() {
		this.toggleSidebarMobile.emit();
	}
}
