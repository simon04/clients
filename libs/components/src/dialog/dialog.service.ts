import { Dialog, DialogConfig, DialogRef } from "@angular/cdk/dialog";
import { ComponentType } from "@angular/cdk/overlay";
import { Injectable, TemplateRef } from "@angular/core";

// import { ConfigurableSimpleDialogComponent } from "./configurable-simple-dialog/configurable-simple-dialog.component";
import { SimpleDialogOptions } from "./simple-dialog/models/simple-dialog-options";
import { SimpleDialogComponent } from "./simple-dialog/simple-dialog.component";
// import { SimpleDialogComponent } from "./simple-dialog/simple-dialog.component";

@Injectable()
export class DialogService extends Dialog {
  private backDropClasses = [
    "tw-fixed",
    "tw-bg-black",
    "tw-bg-opacity-30",
    "tw-inset-0",
    "tw-z-40",
  ];

  override open<R = unknown, D = unknown, C = unknown>(
    componentOrTemplateRef: ComponentType<C> | TemplateRef<C>,
    config?: DialogConfig<D, DialogRef<R, C>>
  ): DialogRef<R, C> {
    config = {
      backdropClass: this.backDropClasses,
      ...config,
    };

    return super.open(componentOrTemplateRef, config);
  }

  /**
   * Opens a simple dialog.
   *
   * @param {SimpleDialogOptions} simpleDialogOptions - An object containing options for the dialog.
   * @returns `DialogRef` - The reference to the opened dialog.
   * Contains a closed observable which can be subscribed to for determining which button
   * a user pressed (see `SimpleDialogCloseType`)
   */
  openSimpleDialog(simpleDialogOptions: SimpleDialogOptions): DialogRef {
    // Method needs to return dialog reference so devs can sub to closed and get results.
    return this.open(SimpleDialogComponent, {
      // return this.open(ConfigurableSimpleDialogComponent, {
      data: simpleDialogOptions,
      disableClose: simpleDialogOptions.disableClose,
      backdropClass: this.backDropClasses,
    });
  }
}
