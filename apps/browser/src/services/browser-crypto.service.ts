import { KeySuffixOptions } from "@bitwarden/common/enums/keySuffixOptions";
import { CryptoServiceImpl } from "@bitwarden/common/services/crypto.service.impl";

export class BrowserCryptoService extends CryptoServiceImpl {
  protected async retrieveKeyFromStorage(keySuffix: KeySuffixOptions) {
    if (keySuffix === "biometric") {
      await this.platformUtilService.authenticateBiometric();
      return (await this.getKey())?.keyB64;
    }

    return await super.retrieveKeyFromStorage(keySuffix);
  }
}
