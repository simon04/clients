import { SimpleDialogType } from "./simple-dialog-type.enum";

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
 *
 * @typedef {Object} SimpleDialogOptions - A configuration type for the Simple Dialog component
 */
export type SimpleDialogOptions = {
  /**
   * Dialog title. If not localized, set `isLocalized` to false and pass in a translation key
   * and any required placeholders (see `titleI18nPlaceholderValues`). */
  title: string;

  /** Dialog content. If not localized, set `isLocalized` to false and pass in a translation key
   * and any required placeholders (see `contentI18nPlaceholderValues`). */
  content: string;

  /** Dialog type. It controls default icons and icon colors. */
  type: SimpleDialogType;

  /** Dialog custom icon class. If not provided, a standard icon will be inferred from type.
   * Note: icon color is enforced based on dialog type.  */
  icon?: string;

  /**
   * Whether or not the dialog is localized (see `title`, `content`, `acceptButtonText`, and `cancelButtonText`).
   *
   * Defaults to true.
   *
   * If false, passed in strings will be treated as translation keys and translated
   * (with placeholders interpolated if they are also passed in).   */
  isLocalized?: boolean;

  /** Dialog custom accept button text. If not provided, ("yes" | i18n) will be used.
   * If not localized, set `isLocalized` to false and pass in a translation key
   * and any required placeholders (see `acceptButtonTextI18nPlaceholderValues`)  */
  acceptButtonText?: string;

  /**
   * Dialog custom cancel button text.
   * If not provided, ("no" | i18n) will be used.
   * If custom acceptButtonText is passed in, ("cancel" | i18n) will be used.
   * If null is provided, the cancel button will be removed.
   * If not localized, set `isLocalized` to false and pass in a translation key
   * and any required placeholders (see `cancelButtonTextI18nPlaceholderValues`) */
  cancelButtonText?: string;

  /** Whether or not the user can use escape or clicking the backdrop to close the dialog */
  disableClose?: boolean;

  /**
   * Title translation placeholder values. Only used if `isLocalized` is false and the
   * title string is a translation key which maps to a message with placeholders.   */
  titleI18nPlaceholderValues?: Array<string | number>;

  /**
   * Content translation placeholder values. Only used if `isLocalized` is false and the
   * content string is a translation key which maps to a message with placeholders.   */
  contentI18nPlaceholderValues?: Array<string | number>;

  /**
   * Acccept button text translation placeholder values. Only used if `isLocalized` is false
   * and `acceptButtonText` is a translation key which maps to a message with placeholders.   */
  acceptButtonTextI18nPlaceholderValues?: Array<string | number>;

  /**
   * Cancel button text translation placeholder values. Only used if `isLocalized` is false
   * and `cancelButtonText` is a translation key which maps to a message with placeholders.   */
  cancelButtonTextI18nPlaceholderValues?: Array<string | number>;
};

/**
 * Custom type guard for SimpleDialogOptions.
 *
 * @param {any} obj - The object to check.
 * @returns {obj is SimpleDialogOptions} - True if the object is a SimpleDialogOptions, false otherwise.
 */
export function isSimpleDialogOptions(obj: any): obj is SimpleDialogOptions {
  return (
    typeof obj === "object" &&
    typeof obj.title === "string" &&
    typeof obj.content === "string" &&
    typeof obj.type === "string" &&
    (typeof obj.icon === "string" || obj.icon === undefined) &&
    (typeof obj.isLocalized === "boolean" || obj.isLocalized === undefined) &&
    (typeof obj.acceptButtonText === "string" || obj.acceptButtonText === undefined) &&
    (typeof obj.cancelButtonText === "string" ||
      obj.cancelButtonText === undefined ||
      obj.cancelButtonText === null) &&
    (typeof obj.disableClose === "boolean" || obj.disableClose === undefined) &&
    (Array.isArray(obj.titleI18nPlaceholderValues) ||
      obj.titleI18nPlaceholderValues === undefined) &&
    (Array.isArray(obj.contentI18nPlaceholderValues) ||
      obj.contentI18nPlaceholderValues === undefined) &&
    (Array.isArray(obj.acceptButtonTextI18nPlaceholderValues) ||
      obj.acceptButtonTextI18nPlaceholderValues === undefined) &&
    (Array.isArray(obj.cancelButtonTextI18nPlaceholderValues) ||
      obj.cancelButtonTextI18nPlaceholderValues === undefined)
  );
}
