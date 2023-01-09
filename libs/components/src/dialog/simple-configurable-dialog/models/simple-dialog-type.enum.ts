// + of using enum is we can ensure no misspelling issues in simple dialog html
// - of using enum is that comps have to import it in order to create SimpleDialogOptions & takes up more space.
export enum SimpleDialogType {
  PRIMARY = "primary",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger",
}
