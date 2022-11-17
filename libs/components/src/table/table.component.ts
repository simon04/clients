import { Component, Input } from "@angular/core";

import { TableDataSource } from "./table-data-source";

@Component({
  selector: "bit-table",
  templateUrl: "./table.component.html",
})
export class TableComponent {
  @Input() dataSource: TableDataSource<any>;
}
