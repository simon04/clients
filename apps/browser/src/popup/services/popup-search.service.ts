import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { ConsoleLogService } from "@bitwarden/common/services/console-log.service";
import { SearchServiceImpl } from "@bitwarden/common/services/search.service.impl";

export class PopupSearchService extends SearchServiceImpl {
  constructor(
    private mainSearchService: SearchServiceImpl,
    cipherService: CipherService,
    consoleLogService: ConsoleLogService,
    i18nService: I18nService
  ) {
    super(cipherService, consoleLogService, i18nService);
  }

  clearIndex() {
    throw new Error("Not available.");
  }

  indexCiphers(): Promise<void> {
    throw new Error("Not available.");
  }

  getIndexForSearch() {
    return this.mainSearchService.getIndexForSearch();
  }
}
