import { DialogRef, DIALOG_DATA } from "@angular/cdk/dialog";
import { Component, ContentChild, Directive, Inject } from "@angular/core";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";

import { SimpleDialogCloseType } from "./models/simple-dialog-close-type.enum";
import { isSimpleDialogOptions, SimpleDialogOptions } from "./models/simple-dialog-options";
import { SimpleDialogType } from "./models/simple-dialog-type.enum";

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

  constructor(
    public dialogRef: DialogRef,
    private i18nService: I18nService,
    @Inject(DIALOG_DATA) public data?: any
  ) {
    // console.log("simple dialog data: ", data);
    // All existing data objects get passed in here so, we have to be sure that
    // we have a simple dialog config obj.

    // TODO: if testing out configurable simple dialog comp, must comment this out.
    if (isSimpleDialogOptions(data)) {
      this.simpleDialogOpts = data;

      // Assume localized
      if (this.simpleDialogOpts.isLocalized === undefined) {
        this.simpleDialogOpts.isLocalized = true;
      } else if (!this.simpleDialogOpts.isLocalized) {
        // Must localize title, content, and button texts.
        this.localizeText();
      }
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
