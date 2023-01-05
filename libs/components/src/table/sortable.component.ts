import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, HostBinding, Input, OnInit } from "@angular/core";

import { Sort } from "./table-data-source";
import { TableComponent } from "./table.component";

@Component({
  selector: "th[bitSortable]",
  template: `
    <button
      class="tw-flex tw-h-full tw-w-full tw-items-center tw-border-none tw-bg-transparent tw-p-0 tw-font-bold tw-text-muted"
      [attr.aria-pressed]="isActive.toString()"
      (click)="setActive()"
    >
      <ng-content></ng-content>
      <i class="bwi tw-ml-2 tw-w-0" [ngClass]="icon"></i>
    </button>
  `,
})
export class SortableComponent implements OnInit {
  /**
   * Mark the column as sortable and specify the key to sort by
   */
  @Input() bitSortable: string;

  private _default: boolean;
  /**
   * Mark the column as the default sort column
   */
  @Input() set default(value: boolean | "") {
    this._default = coerceBooleanProperty(value);
  }

  /**
   * Custom sorting function
   *
   * @example
   * fn = (a, b) => a.name.localeCompare(b.name)
   */
  @Input() fn: Sort["fn"];

  constructor(private table: TableComponent) {}

  ngOnInit(): void {
    if (this._default && !this.isActive) {
      this.setActive();
    }
  }

  @HostBinding("attr.aria-sort") get ariaSort() {
    if (!this.isActive) {
      return undefined;
    }
    return this.sort.direction === "asc" ? "ascending" : "descending";
  }

  protected setActive() {
    if (this.table.dataSource) {
      const direction = this.isActive && this.direction === "asc" ? "desc" : "asc";
      this.table.dataSource.sort = { column: this.bitSortable, direction: direction, fn: this.fn };
    }
  }

  private get sort() {
    return this.table.dataSource?.sort;
  }

  get isActive() {
    return this.sort?.column === this.bitSortable;
  }

  get direction() {
    return this.sort?.direction;
  }

  get icon() {
    if (!this.isActive) {
      return "";
    }
    return this.direction === "asc" ? "bwi-chevron-up" : "bwi-angle-down";
  }
}
