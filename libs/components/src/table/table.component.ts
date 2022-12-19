import { isDataSource } from "@angular/cdk/collections";
import {
  AfterContentChecked,
  Component,
  ContentChild,
  Input,
  OnDestroy,
  TemplateRef,
} from "@angular/core";
import { Observable } from "rxjs";

import { TableDataSource } from "./table-data-source";

@Component({
  selector: "bit-table",
  templateUrl: "./table.component.html",
})
export class TableComponent implements OnDestroy, AfterContentChecked {
  @Input() dataSource: TableDataSource<any>;

  @ContentChild(TemplateRef) templateVariable: TemplateRef<any>;

  protected rows: Observable<readonly any[]>;

  private _initialized = false;

  ngAfterContentChecked(): void {
    if (!this._initialized && isDataSource(this.dataSource)) {
      this._initialized = true;

      const dataStream = this.dataSource.connect();
      this.rows = dataStream;
    }
  }

  ngOnDestroy(): void {
    if (isDataSource(this.dataSource)) {
      this.dataSource.disconnect();
    }
  }
}
