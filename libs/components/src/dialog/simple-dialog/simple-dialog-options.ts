// export type SimpleDialogType = "primary" | "success" | "info" | "warning" | "danger";

// + of using enum is we can ensure no misspelling issues in simple dialog html
// - of using enum is that comps have to import it in order to create SimpleDialogOptions & takes up more space.

export enum SimpleDialogType {
  PRIMARY = "primary",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
}

// TODO: clean up comments
// Note: using class over type lets default values work
// export class SimpleDialogOptions {
//   constructor(
//     public title: string,
//     public content: string,
//     public type: SimpleDialogType = SimpleDialogType.PRIMARY,
//     public isLocalized: boolean = true,
//     public icon?: string, // if empty, infer from type
//     public acceptButtonText?: string, // if empty, default to "Yes"
//     public cancelButtonText?: string // if empty, default to "No", unless acceptButtonText is overriden, in which case default to "Cancel"
//   ) {}
// }

// Using type lets devs skip optional params w/out having to pass undefined.

/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} SimpleDialogOptions
 * @property {string} title - Indicates whether the Courage component is present.
 */
export type SimpleDialogOptions = {
  /** Dialog title. If not already localized, you must set isLocalized to false. */
  title: string;

  /** Dialog content. If not already localized, you must set isLocalized to false. */
  content: string;

  /** Dialog type. It controls default icons and icon colors. */
  type: SimpleDialogType;

  /** Dialog custom icon class. If not provided, a standard icon will be inferred from type.
   * Note: icon color is enforced based on dialog type.
   */
  icon?: string;

  /** Affects title, content, acceptButtonText, and cancelButtonText. Defaults to true.
   * If false, the i18n pipe will be applied to the passed in values.  */
  isLocalized?: boolean;

  /** Dialog custom accept button text. If not provided, ("yes" | i18n) will be used */
  acceptButtonText?: string;

  /**
   * Dialog custom cancel button text. If not provided, ("no" | i18n) will be used.
   * If custom acceptButtonText is passed in, ("cancel" | i18n) will be used
   * // TODO more here on isLocalized false
   * */
  cancelButtonText?: string;

  /** Whether or not the user can use escape or clicking the backdrop to close the dialog */
  disableClose?: boolean;

  /**
   * Title translation placeholder values. Only used if isLocalized is false and the
   * title string is a translation key which maps to a message with placeholders.
   */
  titleI18nPlaceholderValues?: Array<string | number>;

  /**
   * Content translation placeholder values. Only used if isLocalized is false and the
   * content string is a translation key which maps to a message with placeholders.
   */
  contentI18nPlaceholderValues?: Array<string | number>;

  /**
   * Acccept button text translation placeholder values. Only used if isLocalized is false
   * and the Acccept button text string is a translation key which maps to a message with placeholders.
   */
  acceptButtonTextI18nPlaceholderValues?: Array<string | number>;

  /**
   * Cancel button text translation placeholder values. Only used if isLocalized is false
   * and the Cancel button text string is a translation key which maps to a message with placeholders.
   */
  cancelButtonTextI18nPlaceholderValues?: Array<string | number>;
};

export function isSimpleDialogOptions(obj: any): obj is SimpleDialogOptions {
  return (
    typeof obj === "object" &&
    typeof obj.title === "string" &&
    typeof obj.content === "string" &&
    typeof obj.type === "string" &&
    (typeof obj.icon === "string" || obj.icon === undefined) &&
    (typeof obj.isLocalized === "boolean" || obj.isLocalized === undefined) &&
    (typeof obj.acceptButtonText === "string" || obj.acceptButtonText === undefined) &&
    (typeof obj.cancelButtonText === "string" || obj.cancelButtonText === undefined) &&
    (typeof obj.disableClose === "boolean" || obj.disableClose === undefined)
  );
}

// TODO: consider breaking out classes into own model files?
export enum SimpleDialogCloseType {
  ACCEPT = "accept",
  CANCEL = "cancel",
}
