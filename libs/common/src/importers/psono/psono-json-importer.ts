import { CipherType } from "../../enums/cipherType";
import { FieldType } from "../../enums/fieldType";
import { SecureNoteType } from "../../enums/secureNoteType";
import { ImportResult } from "../../models/domain/import-result";
import { CipherView } from "../../models/view/cipher.view";
import { SecureNoteView } from "../../models/view/secure-note.view";
import { BaseImporter } from "../base-importer";
import { Importer } from "../importer";

import {
  AppPasswordEntry,
  BookmarkEntry,
  EnvironmentVariablesEntry,
  FoldersEntity,
  GPGEntry,
  NotesEntry,
  PsonoItemTypes,
  PsonoJsonExport,
  TOTPEntry,
  WebsitePasswordEntry,
} from "./psono-json-types";

export class PsonoJsonImporter extends BaseImporter implements Importer {
  parse(data: string): Promise<ImportResult> {
    const result = new ImportResult();
    const psonoExport: PsonoJsonExport = JSON.parse(data);
    if (psonoExport == null) {
      result.success = false;
      return Promise.resolve(result);
    }

    this.parseFolders(result, psonoExport.folders);
    this.handleItemParsing(result, psonoExport.items);

    if (this.organization) {
      this.moveFoldersToCollections(result);
    }

    result.success = true;
    return Promise.resolve(result);
  }

  private parseFolders(result: ImportResult, folders: FoldersEntity[]) {
    if (folders == null || folders.length === 0) {
      return;
    }

    folders.forEach((folder) => {
      if (folder.items == null || folder.items.length == 0) {
        return;
      }

      this.processFolder(result, folder.name);

      this.handleItemParsing(result, folder.items);
    });
  }

  private handleItemParsing(result: ImportResult, items?: PsonoItemTypes[]) {
    if (items == null || items.length === 0) {
      return;
    }

    items.forEach((record) => {
      const cipher = this.parsePsonoItem(record);

      // this.convertToNoteIfNeeded(cipher);
      this.cleanupCipher(cipher);
      result.ciphers.push(cipher);
    });
  }

  private parsePsonoItem(item: PsonoItemTypes): CipherView {
    const cipher = this.initLoginCipher();

    switch (item.type) {
      case "website_password":
        this.parseWebsiteLogins(item, cipher);
        break;
      case "application_password":
        this.parseApplicationPasswords(item, cipher);
        break;
      case "environment_variables":
        this.parseEnvironmentVariables(item, cipher);
        break;
      case "totp":
        this.parseTOTP(item, cipher);
        break;
      case "bookmark":
        this.parseBookmarks(item, cipher);
        break;
      case "mail_gpg_own_key":
        this.parseGPG(item, cipher);
        break;
      case "note":
        this.parseNotes(item, cipher);
        break;
      default:
        break;
    }

    return cipher;
  }

  private parseWebsiteLogins(entry: WebsitePasswordEntry, cipher: CipherView) {
    if (entry == null || entry.type != "website_password") {
      return;
    }

    cipher.name = entry.website_password_title;
    cipher.notes = entry.website_password_notes;

    cipher.login.username = entry.website_password_username;
    cipher.login.password = entry.website_password_password;

    cipher.login.uris = this.makeUriArray(entry.website_password_url);
  }

  private parseApplicationPasswords(entry: AppPasswordEntry, cipher: CipherView) {
    if (entry == null || entry.type != "application_password") {
      return;
    }

    cipher.name = entry.application_password_title;
    cipher.notes = entry.application_password_notes;

    cipher.login.username = entry.application_password_username;
    cipher.login.password = entry.application_password_password;
  }

  private parseBookmarks(entry: BookmarkEntry, cipher: CipherView) {
    if (entry == null || entry.type != "bookmark") {
      return;
    }

    cipher.name = entry.bookmark_title;
    cipher.notes = entry.bookmark_notes;

    cipher.login.uris = this.makeUriArray(entry.bookmark_url);
  }

  private parseNotes(entry: NotesEntry, cipher: CipherView) {
    if (entry == null || entry.type != "note") {
      return;
    }
    cipher.type = CipherType.SecureNote;
    cipher.secureNote = new SecureNoteView();
    cipher.secureNote.type = SecureNoteType.Generic;
    cipher.name = entry.note_title;
    cipher.notes = entry.note_notes;
  }

  readonly mappedValues: string[] = ["type", "name", "totp_title", "totp_notes"];
  private parseTOTP(entry: TOTPEntry, cipher: CipherView) {
    if (entry == null || entry.type != "totp") {
      return;
    }

    cipher.name = entry.totp_title;
    cipher.notes = entry.totp_notes;

    cipher.login.totp = entry.totp_code;

    this.importUnmappedFields(cipher, entry, new Set(this.mappedValues));
  }

  private importUnmappedFields(
    cipher: CipherView,
    entry: PsonoItemTypes,
    mappedValues: Set<string>
  ) {
    const unmappedFields = Object.keys(entry).filter((x) => !mappedValues.has(x));
    unmappedFields.forEach((key) => {
      const item = entry as any;
      this.processKvp(cipher, key, item[key]);
    });
  }

  private parseEnvironmentVariables(entry: EnvironmentVariablesEntry, cipher: CipherView) {
    if (entry == null || entry.type != "environment_variables") {
      return;
    }

    cipher.type = CipherType.SecureNote;
    cipher.secureNote = new SecureNoteView();
    cipher.secureNote.type = SecureNoteType.Generic;
    cipher.name = entry.environment_variables_title;
    cipher.notes = entry.environment_variables_notes;

    entry.environment_variables_variables.forEach((KvPair) => {
      this.processKvp(cipher, KvPair.key, KvPair.value);
    });
  }

  private parseGPG(entry: GPGEntry, cipher: CipherView) {
    if (entry == null || entry.type != "mail_gpg_own_key") {
      return;
    }

    cipher.type = CipherType.SecureNote;
    cipher.secureNote = new SecureNoteView();
    cipher.secureNote.type = SecureNoteType.Generic;
    cipher.name = entry.mail_gpg_own_key_title;
    cipher.notes = entry.mail_gpg_own_key_public;

    this.processKvp(cipher, "mail_gpg_own_key_name", entry.mail_gpg_own_key_name);
    this.processKvp(cipher, "mail_gpg_own_key_email", entry.mail_gpg_own_key_email);
    this.processKvp(
      cipher,
      "mail_gpg_own_key_private",
      entry.mail_gpg_own_key_private,
      FieldType.Hidden
    );
  }
}
