import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { CipherType } from "@bitwarden/common/enums/cipherType";
import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { Utils } from "@bitwarden/common/misc/utils";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { CipherView } from "@bitwarden/common/models/view/cipher.view";

import { CachedServices } from "../background/service_factories/factory-options";
import {
  i18nServiceFactory,
  I18nServiceInitOptions,
} from "../background/service_factories/i18n-service.factory";
import {
  stateServiceFactory,
  StateServiceInitOptions,
} from "../background/service_factories/state-service.factory";
import { Account } from "../models/account";

export const ROOT_ID = "root";

export const AUTOFILL_ID = "autofill";
export const COPY_USERNAME_ID = "copy-username";
export const COPY_PASSWORD_ID = "copy-password";
export const COPY_VERIFICATIONCODE_ID = "copy-totp";
export const COPY_IDENTIFIER_ID = "copy-identifier";

const SEPARATOR_ID = "separator";
export const GENERATE_PASSWORD_ID = "generate-password";

export const NOOP_COMMAND_SUFFIX = "noop";

export class MainContextMenuHandler {
  create: (options: chrome.contextMenus.CreateProperties) => Promise<void>;

  constructor(private stateService: StateService, private i18nService: I18nService) {
    if (chrome.contextMenus) {
      this.create = (options) => {
        return new Promise<void>((resolve, reject) => {
          chrome.contextMenus.create(options, () => {
            if (chrome.runtime.lastError) {
              reject(chrome.runtime.lastError);
              return;
            }
            resolve();
          });
        });
      };
    } else {
      this.create = (_options) => Promise.resolve();
    }
  }

  static async mv3Create(cachedServices: CachedServices) {
    const stateFactory = new StateFactory(GlobalState, Account);
    const serviceOptions: StateServiceInitOptions & I18nServiceInitOptions = {
      cryptoFunctionServiceOptions: {
        win: self,
      },
      encryptServiceOptions: {
        logMacFailures: false,
      },
      i18nServiceOptions: {
        systemLanguage: chrome.i18n.getUILanguage(),
      },
      logServiceOptions: {
        isDev: false,
      },
      stateMigrationServiceOptions: {
        stateFactory: stateFactory,
      },
      stateServiceOptions: {
        stateFactory: stateFactory,
      },
    };

    return new MainContextMenuHandler(
      await stateServiceFactory(cachedServices, serviceOptions),
      await i18nServiceFactory(cachedServices, serviceOptions)
    );
  }

  /**
   *
   * @returns a boolean showing whether or not items were created
   */
  async init(): Promise<boolean> {
    const menuDisabled = await this.stateService.getDisableContextMenuItem();

    if (menuDisabled) {
      await MainContextMenuHandler.removeAll();
      return false;
    }

    const create = async (options: Omit<chrome.contextMenus.CreateProperties, "contexts">) => {
      await this.create({ ...options, contexts: ["all"] });
    };

    await create({
      id: ROOT_ID,
      title: "Bitwarden",
    });

    await create({
      id: AUTOFILL_ID,
      parentId: ROOT_ID,
      title: this.i18nService.t("autoFill"),
    });

    await create({
      id: COPY_USERNAME_ID,
      parentId: ROOT_ID,
      title: this.i18nService.t("copyUsername"),
    });

    await create({
      id: COPY_PASSWORD_ID,
      parentId: ROOT_ID,
      title: this.i18nService.t("copyPassword"),
    });

    if (await this.stateService.getCanAccessPremium()) {
      await create({
        id: COPY_VERIFICATIONCODE_ID,
        parentId: ROOT_ID,
        title: this.i18nService.t("copyVerificationCode"),
      });
    }

    await create({
      id: SEPARATOR_ID,
      type: "separator",
      parentId: ROOT_ID,
    });

    await create({
      id: GENERATE_PASSWORD_ID,
      parentId: ROOT_ID,
      title: this.i18nService.t("generatePasswordCopied"),
    });

    await create({
      id: COPY_IDENTIFIER_ID,
      parentId: ROOT_ID,
      title: this.i18nService.t("copyElementIdentifier"),
    });

    return true;
  }

  static async removeAll() {
    return new Promise<void>((resolve, reject) => {
      chrome.contextMenus.removeAll(() => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
          return;
        }

        resolve();
      });
    });
  }

  async loadOptions(title: string, id: string, cipher?: CipherView | undefined) {
    if (cipher != null && cipher.type !== CipherType.Login) {
      return;
    }

    const sanitizedTitle = MainContextMenuHandler.sanitizeContextMenuTitle(title);

    const createChildItem = (parent: string) => {
      return this.create({
        type: "normal",
        id: `${parent}_${id}`,
        parentId: parent,
        title: sanitizedTitle,
        contexts: ["all"],
      });
    };

    if (cipher == null || !Utils.isNullOrEmpty(cipher.login.password)) {
      await createChildItem(AUTOFILL_ID);
      if (cipher?.viewPassword ?? true) {
        await createChildItem(COPY_PASSWORD_ID);
      }
    }

    if (cipher == null || !Utils.isNullOrEmpty(cipher.login.username)) {
      await createChildItem(COPY_USERNAME_ID);
    }

    const canAccessPremium = await this.stateService.getCanAccessPremium();
    if (canAccessPremium && (cipher == null || !Utils.isNullOrEmpty(cipher.login.totp))) {
      await createChildItem(COPY_VERIFICATIONCODE_ID);
    }
  }

  static sanitizeContextMenuTitle(title: string): string {
    return title.replace(/&/g, "&&");
  }

  async noAccess() {
    if (await this.init()) {
      const authed = await this.stateService.getIsAuthenticated();
      await this.loadOptions(
        this.i18nService.t(authed ? "unlockVaultMenu" : "loginToVaultMenu"),
        NOOP_COMMAND_SUFFIX
      );
    }
  }

  async noLogins() {
    await this.loadOptions(this.i18nService.t("noMatchingLogins"), NOOP_COMMAND_SUFFIX);
  }
}
