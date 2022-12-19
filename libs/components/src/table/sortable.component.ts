import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Component, HostListener, Input, OnInit } from "@angular/core";

import { SortDirection } from "./table-data-source";
import { TableComponent } from "./table.component";

@Component({
  selector: "th[bitSortable]",
  template: `
    <button class="tw-border-none tw-bg-transparent tw-p-0 tw-font-bold tw-text-muted">
      <ng-content></ng-content>
    </button>
    <i *ngIf="isActive" class="bwi tw-ml-2 tw-w-0" [ngClass]="icon"></i>
    <i *ngIf="!isActive" class="-tw-w-0 tw-ml-2"></i>
  `,
  // The 2nd <i> is to prevent the column from shifting when the icon is added
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
  @Input() fn: (a: any, b: any, direction: SortDirection) => number;

  constructor(private table: TableComponent) {}

  ngOnInit(): void {
    if (this._default && !this.isActive) {
      this.setActive();
    }
  }

  @HostListener("click") onClick() {
    this.setActive();
  }

  private setActive() {
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
    return this.direction === "asc" ? "bwi-arrow-circle-down" : "bwi-arrow-circle-up";
  }
}
