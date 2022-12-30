import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";

import {
  SimpleDialogType,
  SimpleDialogCloseType,
  SimpleDialogOptions,
} from "../simple-dialog/simple-dialog-options";

@Component({
  selector: "bit-configurable-simple-dialog",
  templateUrl: "./configurable-simple-dialog.component.html",
})
export class ConfigurableSimpleDialogComponent {
  SimpleDialogType = SimpleDialogType;
  SimpleDialogCloseType = SimpleDialogCloseType;

  constructor(
    public dialogRef: DialogRef,
    private i18nService: I18nService,
    @Inject(DIALOG_DATA) public simpleDialogOpts?: SimpleDialogOptions
  ) {
    // All existing data objects get passed in here so, we have to be sure that
    // we have a simple dialog config obj.

    // Assume localized
    if (this.simpleDialogOpts.isLocalized === undefined) {
      this.simpleDialogOpts.isLocalized = true;
    } else if (!this.simpleDialogOpts.isLocalized) {
      // Must localize title, content, and button texts.
      this.localizeText();
    }
  }

  private localizeText() {
    const undefArray: any[] = [undefined, undefined, undefined];

    let [p1, p2, p3] = this.simpleDialogOpts.titleI18nPlaceholderValues || undefArray;
    this.simpleDialogOpts.title = this.i18nService.t(this.simpleDialogOpts.title, p1, p2, p3);

    [p1, p2, p3] = this.simpleDialogOpts.contentI18nPlaceholderValues || undefArray;
    this.simpleDialogOpts.content = this.i18nService.t(this.simpleDialogOpts.content, p1, p2, p3);

    if (this.simpleDialogOpts.acceptButtonText !== undefined) {
      [p1, p2, p3] = this.simpleDialogOpts.acceptButtonTextI18nPlaceholderValues || undefArray;
      this.simpleDialogOpts.acceptButtonText = this.i18nService.t(
        this.simpleDialogOpts.acceptButtonText,
        p1,
        p2,
        p3
      );
    }

    if (this.simpleDialogOpts.cancelButtonText !== undefined) {
      [p1, p2, p3] = this.simpleDialogOpts.cancelButtonTextI18nPlaceholderValues || undefArray;
      this.simpleDialogOpts.cancelButtonText = this.i18nService.t(
        this.simpleDialogOpts.cancelButtonText,
        p1,
        p2,
        p3
      );
    }
  }
}
