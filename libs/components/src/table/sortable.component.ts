import { Component, HostListener, Input } from "@angular/core";

import { TableComponent } from "./table.component";

@Component({
  selector: "th[bitSortable]",
  template: `
    <button class="tw-border-none tw-bg-transparent tw-p-0 tw-font-bold tw-text-muted">
      <ng-content></ng-content>
      <i *ngIf="isActive" class="bwi tw-ml-2 tw-w-0" [ngClass]="icon"></i>
      <i *ngIf="!isActive" class="-tw-w-0 tw-ml-2"></i>
    </button>
  `,
  // The 2nd <i> is to prevent the column from shifting when the icon is added
})
export class SortableComponent {
  @Input() bitSortable: string;

  constructor(private table: TableComponent) {}

  @HostListener("click") onClick() {
    if (this.table.dataSource) {
      const direction = this.isActive && this.direction === "asc" ? "desc" : "asc";
      this.table.dataSource.sort = { column: this.bitSortable, direction: direction };
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
