import { AuthService } from "@bitwarden/common/abstractions/auth.service";
import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import { AuthenticationStatus } from "@bitwarden/common/enums/authenticationStatus";
import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { Utils } from "@bitwarden/common/misc/utils";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { ContainerService } from "@bitwarden/common/services/container.service";

import IconDetails from "../background/models/iconDetails";
import { authServiceFactory } from "../background/service_factories/auth-service.factory";
import { cipherServiceFactory } from "../background/service_factories/cipher-service.factory";
import { searchServiceFactory } from "../background/service_factories/search-service.factory";
import { stateServiceFactory } from "../background/service_factories/state-service.factory";
import { BrowserApi } from "../browser/browserApi";
import { Account } from "../models/account";
import { BrowserStateService } from "../services/abstractions/browser-state.service";
import BrowserPlatformUtilsService from "../services/browserPlatformUtils.service";

export type BadgeOptions = {
  tab?: chrome.tabs.Tab;
  windowId?: number;
};

export class UpdateBadge {
  private authService: AuthService;
  private stateService: BrowserStateService;
  private cipherService: CipherService;
  private badgeAction: typeof chrome.action;
  private sidebarAction: OperaSidebarAction | FirefoxSidebarAction;
  private inited = false;
  private win: Window & typeof globalThis;

  private static readonly listenedToCommands = [
    "updateBadge",
    "loggedIn",
    "unlocked",
    "syncCompleted",
    "bgUpdateContextMenu",
    "editedCipher",
    "addedCipher",
    "deletedCipher",
  ];

  static async tabsOnActivatedListener(
    activeInfo: chrome.tabs.TabActiveInfo,
    serviceCache: Record<string, unknown>
  ) {
    await new UpdateBadge(self).run({
      tabId: activeInfo.tabId,
      existingServices: serviceCache,
      windowId: activeInfo.windowId,
    });
  }

  static async tabsOnReplacedListener(
    addedTabId: number,
    removedTabId: number,
    serviceCache: Record<string, unknown>
  ) {
    await new UpdateBadge(self).run({ tabId: addedTabId, existingServices: serviceCache });
  }

  static async tabsOnUpdatedListener(
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab,
    serviceCache: Record<string, unknown>
  ) {
    await new UpdateBadge(self).run({
      tabId,
      existingServices: serviceCache,
      windowId: tab.windowId,
    });
  }

  static async messageListener(
    message: { command: string; tabId: number },
    serviceCache: Record<string, unknown>
  ) {
    if (!UpdateBadge.listenedToCommands.includes(message.command)) {
      return;
    }

    await new UpdateBadge(self).run({ existingServices: serviceCache });
  }

  constructor(win: Window & typeof globalThis) {
    this.badgeAction = BrowserApi.getBrowserAction();
    this.sidebarAction = BrowserApi.getSidebarAction(self);
    this.win = win;
  }

  async run(opts?: {
    tabId?: number;
    windowId?: number;
    existingServices?: Record<string, unknown>;
  }): Promise<void> {
    await this.initServices(opts?.existingServices);

    const authStatus = await this.authService.getAuthStatus();

    await this.setBadgeBackgroundColor();

    switch (authStatus) {
      case AuthenticationStatus.LoggedOut: {
        await this.setLoggedOut();
        break;
      }
      case AuthenticationStatus.Locked: {
        await this.setLocked();
        break;
      }
      case AuthenticationStatus.Unlocked: {
        const tab = await this.getTab(opts?.tabId, opts?.windowId);
        await this.setUnlocked({ tab, windowId: tab?.windowId });
        break;
      }
    }
  }

  async setLoggedOut(): Promise<void> {
    await this.setBadgeIcon("_gray");
    await this.clearBadgeText();
  }

  async setLocked() {
    await this.setBadgeIcon("_locked");
    await this.clearBadgeText();
  }

  private async clearBadgeText() {
    const tabs = await BrowserApi.getActiveTabs();
    if (tabs != null) {
      tabs.forEach(async (tab) => {
        if (tab.id != null) {
          await this.setBadgeText("", tab.id);
        }
      });
    }
  }

  async setUnlocked(opts: BadgeOptions) {
    await this.initServices();

    await this.setBadgeIcon("");

    const disableBadgeCounter = await this.stateService.getDisableBadgeCounter();
    if (disableBadgeCounter) {
      return;
    }

    const ciphers = await this.cipherService.getAllDecryptedForUrl(opts?.tab?.url);
    let countText = ciphers.length == 0 ? "" : ciphers.length.toString();
    if (ciphers.length > 9) {
      countText = "9+";
    }
    await this.setBadgeText(countText, opts?.tab?.id);
  }

  setBadgeBackgroundColor(color = "#294e5f") {
    if (this.badgeAction?.setBadgeBackgroundColor) {
      this.badgeAction.setBadgeBackgroundColor({ color });
    }
    if (this.isOperaSidebar(this.sidebarAction)) {
      this.sidebarAction.setBadgeBackgroundColor({ color });
    }
  }

  setBadgeText(text: string, tabId?: number) {
    this.setActionText(text, tabId);
    this.setSideBarText(text, tabId);
  }

  async setBadgeIcon(iconSuffix: string, windowId?: number) {
    const options: IconDetails = {
      path: {
        19: "/images/icon19" + iconSuffix + ".png",
        38: "/images/icon38" + iconSuffix + ".png",
      },
    };
    if (windowId && BrowserPlatformUtilsService.isFirefox()) {
      options.windowId = windowId;
    }

    await this.setActionIcon(options);
    await this.setSidebarActionIcon(options);
  }

  private setActionText(text: string, tabId?: number) {
    if (this.badgeAction?.setBadgeText) {
      this.badgeAction.setBadgeText({ text, tabId });
    }
  }

  private setSideBarText(text: string, tabId?: number) {
    if (this.isOperaSidebar(this.sidebarAction)) {
      this.sidebarAction.setBadgeText({ text, tabId });
    } else if (this.sidebarAction) {
      // Firefox
      const title = `Bitwarden${Utils.isNullOrEmpty(text) ? "" : ` [${text}]`}`;
      this.sidebarAction.setTitle({ title, tabId });
    }
  }

  private async setActionIcon(options: IconDetails) {
    if (!this.badgeAction?.setIcon) {
      return;
    }

    if (this.useSyncApiCalls) {
      this.badgeAction.setIcon(options);
    } else {
      await new Promise<void>((resolve) => this.badgeAction.setIcon(options, () => resolve()));
    }
  }

  private async setSidebarActionIcon(options: IconDetails) {
    if (!this.sidebarAction?.setIcon) {
      return;
    }

    if (this.useSyncApiCalls) {
      this.sidebarAction.setIcon(options);
    } else {
      await new Promise<void>((resolve) => this.sidebarAction.setIcon(options, () => resolve()));
    }
  }

  private async getTab(tabId?: number, windowId?: number) {
    return (
      (await BrowserApi.getTab(tabId)) ??
      (windowId
        ? await BrowserApi.tabsQueryFirst({ active: true, windowId })
        : await BrowserApi.tabsQueryFirst({ active: true, currentWindow: true })) ??
      (await BrowserApi.tabsQueryFirst({ active: true, lastFocusedWindow: true })) ??
      (await BrowserApi.tabsQueryFirst({ active: true }))
    );
  }

  private get useSyncApiCalls() {
    return (
      BrowserPlatformUtilsService.isFirefox() || BrowserPlatformUtilsService.isSafari(this.win)
    );
  }

  private async initServices(existingServiceCache?: Record<string, unknown>): Promise<UpdateBadge> {
    if (this.inited) {
      return this;
    }

    const serviceCache: Record<string, unknown> = existingServiceCache || {};
    const opts = {
      cryptoFunctionServiceOptions: { win: self },
      encryptServiceOptions: { logMacFailures: false },
      logServiceOptions: { isDev: false },
      platformUtilsServiceOptions: {
        clipboardWriteCallback: (clipboardValue: string, clearMs: number) =>
          Promise.reject("not implemented"),
        biometricCallback: () => Promise.reject("not implemented"),
        win: self,
      },
      stateServiceOptions: {
        stateFactory: new StateFactory(GlobalState, Account),
      },
      stateMigrationServiceOptions: {
        stateFactory: new StateFactory(GlobalState, Account),
      },
      apiServiceOptions: {
        logoutCallback: () => Promise.reject("not implemented"),
      },
      keyConnectorServiceOptions: {
        logoutCallback: () => Promise.reject("not implemented"),
      },
      i18nServiceOptions: {
        systemLanguage: BrowserApi.getUILanguage(self),
      },
    };
    this.stateService = await stateServiceFactory(serviceCache, opts);
    this.authService = await authServiceFactory(serviceCache, opts);
    const searchService = await searchServiceFactory(serviceCache, opts);

    this.cipherService = await cipherServiceFactory(serviceCache, {
      ...opts,
      cipherServiceOptions: { searchServiceFactory: () => searchService },
    });

    // Needed for cipher decryption
    if (!self.bitwardenContainerService) {
      new ContainerService(
        serviceCache.cryptoService as CryptoService,
        serviceCache.encryptService as EncryptService
      ).attachToGlobal(self);
    }

    this.inited = true;

    return this;
  }

  private isOperaSidebar(
    action: OperaSidebarAction | FirefoxSidebarAction
  ): action is OperaSidebarAction {
    return action != null && (action as OperaSidebarAction).setBadgeText != null;
  }
}
