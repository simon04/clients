import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, ContentChild, Directive, Inject } from "@angular/core";

import {
  isSimpleDialogOptions,
  SimpleDialogCloseType,
  SimpleDialogOptions,
  SimpleDialogType,
} from "./simple-dialog-options";

@Directive({ selector: "[bit-dialog-icon]" })
export class IconDirective {}

@Component({
  selector: "bit-simple-dialog",
  templateUrl: "./simple-dialog.component.html",
})
export class SimpleDialogComponent {
  @ContentChild(IconDirective) icon!: IconDirective;

  get hasIcon() {
    return this.icon != null;
  }

  dialogHeaderContainerClasses =
    "tw-flex tw-flex-col tw-items-center tw-gap-2 tw-px-4 tw-pt-4 tw-text-center";

  dialogContentContainerClasses =
    "tw-overflow-y-auto tw-px-4 tw-pt-2 tw-pb-4 tw-text-center tw-text-base";

  dialogFooterContainerClasses =
    "tw-border-0 tw-border-t tw-border-solid tw-border-secondary-300 tw-p-4";

  simpleDialogOpts?: SimpleDialogOptions;
  SimpleDialogType = SimpleDialogType;
  SimpleDialogCloseType = SimpleDialogCloseType;

  constructor(public dialogRef: DialogRef, @Inject(DIALOG_DATA) public data?: any) {
    // All existing data objects get passed in here so, we have to be sure that
    // we have a simple dialog config obj.
    if (isSimpleDialogOptions(data)) {
      this.simpleDialogOpts = data;
    }
  }
}
