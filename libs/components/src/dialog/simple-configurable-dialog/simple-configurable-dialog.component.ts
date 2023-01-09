import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, Inject } from "@angular/core";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";

import { SimpleDialogCloseType } from "../simple-dialog/models/simple-dialog-close-type.enum";
import { SimpleDialogOptions } from "../simple-dialog/models/simple-dialog-options";
import { SimpleDialogType } from "../simple-dialog/models/simple-dialog-type.enum";
import { isTranslation } from "../simple-dialog/models/translation";

@Component({
  selector: "bit-simple-configurable-dialog",
  templateUrl: "./simple-configurable-dialog.component.html",
})
export class SimpleConfigurableDialogComponent {
  SimpleDialogType = SimpleDialogType;
  SimpleDialogCloseType = SimpleDialogCloseType;

  iconClasses: string;

  constructor(
    public dialogRef: DialogRef,
    private i18nService: I18nService,
    @Inject(DIALOG_DATA) public simpleDialogOpts?: SimpleDialogOptions
  ) {
    // Assume localized
    if (this.simpleDialogOpts.isLocalized === undefined) {
      this.simpleDialogOpts.isLocalized = true;
    } else if (!this.simpleDialogOpts.isLocalized) {
      // Must localize title, content, and button texts.
      this.localizeText();
    }

    this.setIconClasses();
  }

  private localizeText() {
    const undefArray: any[] = [undefined, undefined, undefined];
    let p1: string | number, p2: string | number, p3: string | number;

    if (isTranslation(this.simpleDialogOpts.title)) {
      [p1, p2, p3] = this.simpleDialogOpts.title.placeholderValues || undefArray;
      this.simpleDialogOpts.title = this.i18nService.t(this.simpleDialogOpts.title.key, p1, p2, p3);
    }

    if (isTranslation(this.simpleDialogOpts.content)) {
      [p1, p2, p3] = this.simpleDialogOpts.content.placeholderValues || undefArray;
      this.simpleDialogOpts.content = this.i18nService.t(
        this.simpleDialogOpts.content.key,
        p1,
        p2,
        p3
      );
    }

    if (
      this.simpleDialogOpts.acceptButtonText !== undefined &&
      isTranslation(this.simpleDialogOpts.acceptButtonText)
    ) {
      [p1, p2, p3] = this.simpleDialogOpts.acceptButtonText.placeholderValues || undefArray;
      this.simpleDialogOpts.acceptButtonText = this.i18nService.t(
        this.simpleDialogOpts.acceptButtonText.key,
        p1,
        p2,
        p3
      );
    }

    if (
      this.simpleDialogOpts.cancelButtonText !== undefined &&
      isTranslation(this.simpleDialogOpts.cancelButtonText)
    ) {
      [p1, p2, p3] = this.simpleDialogOpts.cancelButtonText.placeholderValues || undefArray;
      this.simpleDialogOpts.cancelButtonText = this.i18nService.t(
        this.simpleDialogOpts.cancelButtonText.key,
        p1,
        p2,
        p3
      );
    }
  }

  private setIconClasses() {
    if (this.simpleDialogOpts.icon) {
      this.iconClasses = this.simpleDialogOpts.icon;
    }
    switch (this.simpleDialogOpts.type) {
      case SimpleDialogType.PRIMARY:
        this.iconClasses = this.iconClasses ?? "bwi-business";
        this.iconClasses += " tw-text-primary-500";
        break;
      case SimpleDialogType.SUCCESS:
        this.iconClasses = this.iconClasses ?? "bwi-star";
        this.iconClasses += " tw-text-success";
        break;
      case SimpleDialogType.INFO:
        this.iconClasses = this.iconClasses ?? "bwi-info-circle";
        this.iconClasses += " tw-text-info";
        break;
      case SimpleDialogType.WARNING:
        this.iconClasses = this.iconClasses ?? "bwi-exclamation-triangle";
        this.iconClasses += " tw-text-warning";
        break;
      case SimpleDialogType.DANGER:
        this.iconClasses = this.iconClasses ?? "bwi-error";
        this.iconClasses += " tw-text-danger";
        break;
    }
  }
}
