import { ReplaySubject } from "rxjs";

import { browserSession, sessionSync } from "../decorators/session-sync-observable";

import I18nService from "./i18n.service";

@browserSession
export class BrowserI18nService extends I18nService {
  @sessionSync({ ctor: String })
  protected _locale: ReplaySubject<string>;
}
