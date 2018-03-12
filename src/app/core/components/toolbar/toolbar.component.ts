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
	@ViewChild("search") searchEl: ElementRef;
	searchActive = false;

	searchForm = new FormGroup({
		ticker: new FormControl()
	});

	get ticker() {
		return this.searchForm.get("ticker").value;
	}

	onSubmit() {
		if (this.ticker && this.ticker.trim() !== "") {
			this.tickerSearch.emit(this.ticker.trim());
			this.searchForm.get("ticker").setValue("");
		}
	}

	openSearch() {
		this.searchActive = true;
	}

	closeSearch() {
		this.searchActive = false;
	}

	onMenuClick() {
		this.toggleSidebar.emit();
	}

	onMobileMenuClick() {
		this.toggleSidebarMobile.emit();
	}
}
