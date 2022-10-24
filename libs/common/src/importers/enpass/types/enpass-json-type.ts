import { EnpassItemTemplates } from "./enpass-item-templates";

export type EnpassJsonFile = {
  folders: EnpassFolder[];
  items: EnpassItem[];
};

export type EnpassFolder = {
  icon: string;
  parent_uuid: string;
  title: string;
  updated_at: number;
  uuid: string;
};

export type EnpassItem = {
  archived: number;
  auto_submit: number;
  category: string;
  createdAt: number;
  favorite: number;
  fields?: EnpassField[];
  icon: Icon;
  note: string;
  subtitle: string;
  template_type: string | EnpassItemTemplates;
  title: string;
  trashed: number;
  updated_at: number;
  uuid: string;
  folders?: string[];
};

export const enum EnpassFieldTypes {
  text = "text",
  password = "password",
  pin = "pin",
  numeric = "numeric",
  date = "date",
  email = "email",
  url = "url",
  phone = "phone",
  username = "username",
  totp = "totp",
  multiline = "multiline",
  ccName = "ccName",
  ccNumber = "ccNumber",
  ccCvc = "ccCvc",
  ccPin = "ccPin",
  ccExpiry = "ccExpiry",
  ccBankname = "ccBankname",
  ccTxnpassword = "ccTxnpassword",
  ccType = "ccType",
  ccValidfrom = "ccValidfrom",
  section = "section",
  androidUrl = ".Android#",
}

export type EnpassField = {
  deleted: number;
  history?: History[];
  label: string;
  order: number;
  sensitive: number;
  type: string | EnpassFieldTypes;
  uid: number;
  updated_at: number;
  value: string;
  value_updated_at: number;
};

export type History = {
  updated_at: number;
  value: string;
};

export type Icon = {
  fav: string;
  image: Image;
  type: number;
  uuid: string;
};

export type Image = {
  file: string;
};
