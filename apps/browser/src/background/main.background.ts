import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { AppIdService } from "@bitwarden/common/abstractions/appId.service";
import { AuditService } from "@bitwarden/common/abstractions/audit.service";
import { AuthService } from "@bitwarden/common/abstractions/auth.service";
import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { CollectionService } from "@bitwarden/common/abstractions/collection.service";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import { EventService } from "@bitwarden/common/abstractions/event.service";
import { ExportService } from "@bitwarden/common/abstractions/export.service";
import { FileUploadService } from "@bitwarden/common/abstractions/fileUpload.service";
import { FolderApiServiceAbstraction } from "@bitwarden/common/abstractions/folder/folder-api.service.abstraction";
import { InternalFolderService } from "@bitwarden/common/abstractions/folder/folder.service.abstraction";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { KeyConnectorService } from "@bitwarden/common/abstractions/keyConnector.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { NotificationsService } from "@bitwarden/common/abstractions/notifications.service";
import { OrganizationService } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";
import { PasswordGenerationService } from "@bitwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { PolicyApiServiceAbstraction } from "@bitwarden/common/abstractions/policy/policy-api.service.abstraction";
import { InternalPolicyService } from "@bitwarden/common/abstractions/policy/policy.service.abstraction";
import { ProviderService } from "@bitwarden/common/abstractions/provider.service";
import { SearchService } from "@bitwarden/common/abstractions/search.service";
import { SendService } from "@bitwarden/common/abstractions/send.service";
import { SettingsService } from "@bitwarden/common/abstractions/settings.service";
import { AbstractStorageService } from "@bitwarden/common/abstractions/storage.service";
import { SyncService } from "@bitwarden/common/abstractions/sync/sync.service.abstraction";
import { SyncNotifierService } from "@bitwarden/common/abstractions/sync/syncNotifier.service.abstraction";
import { SystemService } from "@bitwarden/common/abstractions/system.service";
import { TokenService } from "@bitwarden/common/abstractions/token.service";
import { TotpService } from "@bitwarden/common/abstractions/totp.service";
import { TwoFactorService } from "@bitwarden/common/abstractions/twoFactor.service";
import { UserVerificationApiServiceAbstraction } from "@bitwarden/common/abstractions/userVerification/userVerification-api.service.abstraction";
import { UserVerificationService } from "@bitwarden/common/abstractions/userVerification/userVerification.service.abstraction";
import { UsernameGenerationService } from "@bitwarden/common/abstractions/usernameGeneration.service";
import { VaultTimeoutService } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeout.service";
import { VaultTimeoutSettingsService } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeoutSettings.service";
import { AuthenticationStatus } from "@bitwarden/common/enums/authenticationStatus";
import { CipherRepromptType } from "@bitwarden/common/enums/cipherRepromptType";
import { CipherType } from "@bitwarden/common/enums/cipherType";
import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { CipherView } from "@bitwarden/common/models/view/cipher.view";
import { ApiServiceImpl } from "@bitwarden/common/services/api.service.impl";
import { AppIdServiceImpl } from "@bitwarden/common/services/app-id.service.impl";
import { AuditServiceImpl } from "@bitwarden/common/services/audit.service.impl";
import { AuthServiceImpl } from "@bitwarden/common/services/auth.service.impl";
import { CipherServiceImpl } from "@bitwarden/common/services/cipher.service.impl";
import { CollectionServiceImpl } from "@bitwarden/common/services/collection.service.impl";
import { ConsoleLogService } from "@bitwarden/common/services/console-log.service";
import { ContainerService } from "@bitwarden/common/services/container.service";
import { EncryptServiceImpl } from "@bitwarden/common/services/cryptography/encrypt.service.impl";
import { MultithreadEncryptServiceImpl } from "@bitwarden/common/services/cryptography/multithread-encrypt.service.impl";
import { EventServiceImpl } from "@bitwarden/common/services/event.service.impl";
import { ExportServiceImpl } from "@bitwarden/common/services/export.service.impl";
import { FileUploadServiceImpl } from "@bitwarden/common/services/file-upload.service.impl";
import { FolderApiServiceImpl } from "@bitwarden/common/services/folder/folder-api.service.impl";
import { KeyConnectorServiceImpl } from "@bitwarden/common/services/key-connector.service.impl";
import { MemoryStorageService } from "@bitwarden/common/services/memory-storage.service";
import { NotificationsServiceImpl } from "@bitwarden/common/services/notifications.service.impl";
import { OrganizationServiceImpl } from "@bitwarden/common/services/organization/organization.service.impl";
import { PasswordGenerationServiceImpl } from "@bitwarden/common/services/password-generation.service.impl";
import { PolicyApiServiceImpl } from "@bitwarden/common/services/policy/policy-api.service.impl";
import { PolicyServiceImpl } from "@bitwarden/common/services/policy/policy.service.impl";
import { ProviderServiceImpl } from "@bitwarden/common/services/provider.service.impl";
import { SearchServiceImpl } from "@bitwarden/common/services/search.service.impl";
import { SendServiceImpl } from "@bitwarden/common/services/send.service.impl";
import { SettingsServiceImpl } from "@bitwarden/common/services/settings.service.impl";
import { StateMigrationServiceImpl } from "@bitwarden/common/services/state-migration.service.impl";
import { SyncNotifierServiceImpl } from "@bitwarden/common/services/sync/sync-notifier.service.impl";
import { SyncServiceImpl } from "@bitwarden/common/services/sync/sync.service.impl";
import { SystemServiceImpl } from "@bitwarden/common/services/system.service.impl";
import { TokenServiceImpl } from "@bitwarden/common/services/token.service.impl";
import { TotpServiceImpl } from "@bitwarden/common/services/totp.service.impl";
import { TwoFactorServiceImpl } from "@bitwarden/common/services/two-factor.service.impl";
import { UserVerificationApiServiceImpl } from "@bitwarden/common/services/user-verification/user-verification-api.service.impl";
import { UserVerificationServiceImpl } from "@bitwarden/common/services/user-verification/user-verification.service.impl";
import { UsernameGenerationServiceImpl } from "@bitwarden/common/services/username-generation.service.impl";
import { VaultTimeoutSettingsServiceImpl } from "@bitwarden/common/services/vault-timeout/vault-timeout-settings.service.impl";
import { WebCryptoFunctionService } from "@bitwarden/common/services/web-crypto-function.service";

import { BrowserApi } from "../browser/browserApi";
import { SafariApp } from "../browser/safariApp";
import { flagEnabled } from "../flags";
import { UpdateBadge } from "../listeners/update-badge";
import { Account } from "../models/account";
import { PopupUtilsService } from "../popup/services/popup-utils.service";
import { AutofillService } from "../services/abstractions/autofill.service";
import { BrowserStateService } from "../services/abstractions/browser-state.service";
import AutofillServiceImpl from "../services/autofill.service.impl";
import { BrowserCryptoService } from "../services/browser-crypto.service";
import { BrowserEnvironmentService } from "../services/browser-environment.service";
import BrowserI18nService from "../services/browser-i18n.service";
import BrowserLocalStorageService from "../services/browser-local-storage.service";
import BrowserMessagingPrivateModeBackgroundService from "../services/browser-messaging-private-mode-background.service";
import BrowserMessagingService from "../services/browser-messaging.service";
import BrowserPlatformUtilsService from "../services/browser-platform-utils.service";
import { BrowserStateServiceImpl } from "../services/browser-state.service.impl";
import { BrowserVaultFilterService } from "../services/browser-vault-filter.service";
import { BrowserFolderService } from "../services/folders/browser-folder.service";
import { KeyGenerationServiceImpl } from "../services/key-generation.service.impl";
import { LocalBackedSessionStorageService } from "../services/local-backed-session-storage.service";
import BrowserVaultTimeoutService from "../services/vault-timeout/browser-vault-timeout.service";

import CommandsBackground from "./commands.background";
import ContextMenusBackground from "./contextMenus.background";
import IdleBackground from "./idle.background";
import IconDetails from "./models/iconDetails";
import { NativeMessagingBackground } from "./nativeMessaging.background";
import NotificationBackground from "./notification.background";
import RuntimeBackground from "./runtime.background";
import TabsBackground from "./tabs.background";
import WebRequestBackground from "./webRequest.background";

export default class MainBackground {
  messagingService: MessagingService;
  storageService: AbstractStorageService;
  secureStorageService: AbstractStorageService;
  memoryStorageService: AbstractStorageService;
  i18nService: I18nService;
  platformUtilsService: PlatformUtilsService;
  logService: LogService;
  cryptoService: CryptoService;
  cryptoFunctionService: CryptoFunctionService;
  tokenService: TokenService;
  appIdService: AppIdService;
  apiService: ApiService;
  environmentService: BrowserEnvironmentService;
  settingsService: SettingsService;
  cipherService: CipherService;
  folderService: InternalFolderService;
  collectionService: CollectionService;
  vaultTimeoutService: VaultTimeoutService;
  vaultTimeoutSettingsService: VaultTimeoutSettingsService;
  syncService: SyncService;
  passwordGenerationService: PasswordGenerationService;
  totpService: TotpService;
  autofillService: AutofillService;
  containerService: ContainerService;
  auditService: AuditService;
  authService: AuthService;
  exportService: ExportService;
  searchService: SearchService;
  notificationsService: NotificationsService;
  stateService: BrowserStateService;
  stateMigrationService: StateMigrationServiceImpl;
  systemService: SystemService;
  eventService: EventService;
  policyService: InternalPolicyService;
  popupUtilsService: PopupUtilsService;
  sendService: SendService;
  fileUploadService: FileUploadService;
  organizationService: OrganizationService;
  providerService: ProviderService;
  keyConnectorService: KeyConnectorService;
  userVerificationService: UserVerificationService;
  twoFactorService: TwoFactorService;
  vaultFilterService: BrowserVaultFilterService;
  usernameGenerationService: UsernameGenerationService;
  encryptService: EncryptService;
  folderApiService: FolderApiServiceAbstraction;
  policyApiService: PolicyApiServiceAbstraction;
  userVerificationApiService: UserVerificationApiServiceAbstraction;
  syncNotifierService: SyncNotifierService;

  // Passed to the popup for Safari to workaround issues with theming, downloading, etc.
  backgroundWindow = window;

  onUpdatedRan: boolean;
  onReplacedRan: boolean;
  loginToAutoFill: CipherView = null;

  private commandsBackground: CommandsBackground;
  private contextMenusBackground: ContextMenusBackground;
  private idleBackground: IdleBackground;
  private notificationBackground: NotificationBackground;
  private runtimeBackground: RuntimeBackground;
  private tabsBackground: TabsBackground;
  private webRequestBackground: WebRequestBackground;

  private sidebarAction: any;
  private buildingContextMenu: boolean;
  private menuOptionsLoaded: any[] = [];
  private syncTimeout: any;
  private isSafari: boolean;
  private nativeMessagingBackground: NativeMessagingBackground;
  popupOnlyContext: boolean;

  constructor(public isPrivateMode: boolean = false) {
    this.popupOnlyContext = isPrivateMode || BrowserApi.manifestVersion === 3;

    // Services
    const lockedCallback = async (userId?: string) => {
      if (this.notificationsService != null) {
        this.notificationsService.updateConnection(false);
      }
      await this.refreshBadge();
      await this.refreshMenu(true);
      if (this.systemService != null) {
        await this.systemService.clearPendingClipboard();
        await this.systemService.startProcessReload(this.authService);
      }
    };

    const logoutCallback = async (expired: boolean, userId?: string) =>
      await this.logout(expired, userId);

    this.messagingService = this.popupOnlyContext
      ? new BrowserMessagingPrivateModeBackgroundService()
      : new BrowserMessagingService();
    this.logService = new ConsoleLogService(false);
    this.cryptoFunctionService = new WebCryptoFunctionService(window);
    this.storageService = new BrowserLocalStorageService();
    this.secureStorageService = new BrowserLocalStorageService();
    this.memoryStorageService =
      BrowserApi.manifestVersion === 3
        ? new LocalBackedSessionStorageService(
            new EncryptServiceImpl(this.cryptoFunctionService, this.logService, false),
            new KeyGenerationServiceImpl(this.cryptoFunctionService)
          )
        : new MemoryStorageService();
    this.stateMigrationService = new StateMigrationServiceImpl(
      this.storageService,
      this.secureStorageService,
      new StateFactory(GlobalState, Account)
    );
    this.stateService = new BrowserStateServiceImpl(
      this.storageService,
      this.secureStorageService,
      this.memoryStorageService,
      this.logService,
      this.stateMigrationService,
      new StateFactory(GlobalState, Account)
    );
    this.platformUtilsService = new BrowserPlatformUtilsService(
      this.messagingService,
      (clipboardValue, clearMs) => {
        if (this.systemService != null) {
          this.systemService.clearClipboard(clipboardValue, clearMs);
        }
      },
      async () => {
        if (this.nativeMessagingBackground != null) {
          const promise = this.nativeMessagingBackground.getResponse();

          try {
            await this.nativeMessagingBackground.send({ command: "biometricUnlock" });
          } catch (e) {
            return Promise.reject(e);
          }

          return promise.then((result) => result.response === "unlocked");
        }
      },
      window
    );
    this.i18nService = new BrowserI18nService(BrowserApi.getUILanguage(window));
    this.encryptService = flagEnabled("multithreadDecryption")
      ? new MultithreadEncryptServiceImpl(this.cryptoFunctionService, this.logService, true)
      : new EncryptServiceImpl(this.cryptoFunctionService, this.logService, true);
    this.cryptoService = new BrowserCryptoService(
      this.cryptoFunctionService,
      this.encryptService,
      this.platformUtilsService,
      this.logService,
      this.stateService
    );
    this.tokenService = new TokenServiceImpl(this.stateService);
    this.appIdService = new AppIdServiceImpl(this.storageService);
    this.environmentService = new BrowserEnvironmentService(this.stateService, this.logService);
    this.apiService = new ApiServiceImpl(
      this.tokenService,
      this.platformUtilsService,
      this.environmentService,
      this.appIdService,
      (expired: boolean) => this.logout(expired)
    );
    this.settingsService = new SettingsServiceImpl(this.stateService);
    this.fileUploadService = new FileUploadServiceImpl(this.logService, this.apiService);
    this.cipherService = new CipherServiceImpl(
      this.cryptoService,
      this.settingsService,
      this.apiService,
      this.fileUploadService,
      this.i18nService,
      () => this.searchService,
      this.logService,
      this.stateService,
      this.encryptService
    );
    this.folderService = new BrowserFolderService(
      this.cryptoService,
      this.i18nService,
      this.cipherService,
      this.stateService
    );
    this.folderApiService = new FolderApiServiceImpl(this.folderService, this.apiService);
    this.collectionService = new CollectionServiceImpl(
      this.cryptoService,
      this.i18nService,
      this.stateService
    );
    this.searchService = new SearchServiceImpl(
      this.cipherService,
      this.logService,
      this.i18nService
    );
    this.sendService = new SendServiceImpl(
      this.cryptoService,
      this.apiService,
      this.fileUploadService,
      this.i18nService,
      this.cryptoFunctionService,
      this.stateService
    );
    this.syncNotifierService = new SyncNotifierServiceImpl();
    this.organizationService = new OrganizationServiceImpl(
      this.stateService,
      this.syncNotifierService
    );
    this.policyService = new PolicyServiceImpl(this.stateService, this.organizationService);
    this.policyApiService = new PolicyApiServiceImpl(
      this.policyService,
      this.apiService,
      this.stateService,
      this.organizationService
    );
    this.keyConnectorService = new KeyConnectorServiceImpl(
      this.stateService,
      this.cryptoService,
      this.apiService,
      this.tokenService,
      this.logService,
      this.organizationService,
      this.cryptoFunctionService,
      logoutCallback
    );
    this.vaultFilterService = new BrowserVaultFilterService(
      this.stateService,
      this.organizationService,
      this.folderService,
      this.cipherService,
      this.collectionService,
      this.policyService
    );

    this.twoFactorService = new TwoFactorServiceImpl(this.i18nService, this.platformUtilsService);

    // eslint-disable-next-line
    const that = this;
    const backgroundMessagingService = new (class extends MessagingService {
      // AuthService should send the messages to the background not popup.
      send = (subscriber: string, arg: any = {}) => {
        const message = Object.assign({}, { command: subscriber }, arg);
        that.runtimeBackground.processMessage(message, that, null);
      };
    })();
    this.authService = new AuthServiceImpl(
      this.cryptoService,
      this.apiService,
      this.tokenService,
      this.appIdService,
      this.platformUtilsService,
      backgroundMessagingService,
      this.logService,
      this.keyConnectorService,
      this.environmentService,
      this.stateService,
      this.twoFactorService,
      this.i18nService
    );

    this.vaultTimeoutSettingsService = new VaultTimeoutSettingsServiceImpl(
      this.cryptoService,
      this.tokenService,
      this.policyService,
      this.stateService
    );

    this.vaultTimeoutService = new BrowserVaultTimeoutService(
      this.cipherService,
      this.folderService,
      this.collectionService,
      this.cryptoService,
      this.platformUtilsService,
      this.messagingService,
      this.searchService,
      this.keyConnectorService,
      this.stateService,
      this.authService,
      this.vaultTimeoutSettingsService,
      lockedCallback,
      logoutCallback
    );

    this.providerService = new ProviderServiceImpl(this.stateService);
    this.syncService = new SyncServiceImpl(
      this.apiService,
      this.settingsService,
      this.folderService,
      this.cipherService,
      this.cryptoService,
      this.collectionService,
      this.messagingService,
      this.policyService,
      this.sendService,
      this.logService,
      this.keyConnectorService,
      this.stateService,
      this.providerService,
      this.folderApiService,
      this.syncNotifierService,
      logoutCallback
    );
    this.eventService = new EventServiceImpl(
      this.apiService,
      this.cipherService,
      this.stateService,
      this.logService,
      this.organizationService
    );
    this.passwordGenerationService = new PasswordGenerationServiceImpl(
      this.cryptoService,
      this.policyService,
      this.stateService
    );
    this.totpService = new TotpServiceImpl(this.cryptoFunctionService, this.logService);
    this.autofillService = new AutofillServiceImpl(
      this.cipherService,
      this.stateService,
      this.totpService,
      this.eventService,
      this.logService
    );
    this.containerService = new ContainerService(this.cryptoService, this.encryptService);
    this.auditService = new AuditServiceImpl(this.cryptoFunctionService, this.apiService);
    this.exportService = new ExportServiceImpl(
      this.folderService,
      this.cipherService,
      this.apiService,
      this.cryptoService,
      this.cryptoFunctionService
    );
    this.notificationsService = new NotificationsServiceImpl(
      this.syncService,
      this.appIdService,
      this.apiService,
      this.environmentService,
      logoutCallback,
      this.logService,
      this.stateService,
      this.authService
    );
    this.popupUtilsService = new PopupUtilsService(isPrivateMode);

    this.userVerificationApiService = new UserVerificationApiServiceImpl(this.apiService);

    this.userVerificationService = new UserVerificationServiceImpl(
      this.cryptoService,
      this.i18nService,
      this.userVerificationApiService
    );

    const systemUtilsServiceReloadCallback = () => {
      const forceWindowReload =
        this.platformUtilsService.isSafari() ||
        this.platformUtilsService.isFirefox() ||
        this.platformUtilsService.isOpera();
      BrowserApi.reloadExtension(forceWindowReload ? window : null);
      return Promise.resolve();
    };

    this.systemService = new SystemServiceImpl(
      this.messagingService,
      this.platformUtilsService,
      systemUtilsServiceReloadCallback,
      this.stateService
    );

    // Other fields
    this.isSafari = this.platformUtilsService.isSafari();
    this.sidebarAction = this.isSafari
      ? null
      : typeof opr !== "undefined" && opr.sidebarAction
      ? opr.sidebarAction
      : (window as any).chrome.sidebarAction;

    // Background
    this.runtimeBackground = new RuntimeBackground(
      this,
      this.autofillService,
      this.platformUtilsService as BrowserPlatformUtilsService,
      this.i18nService,
      this.notificationsService,
      this.systemService,
      this.environmentService,
      this.messagingService,
      this.logService
    );
    this.nativeMessagingBackground = new NativeMessagingBackground(
      this.cryptoService,
      this.cryptoFunctionService,
      this.runtimeBackground,
      this.i18nService,
      this.messagingService,
      this.appIdService,
      this.platformUtilsService,
      this.stateService,
      this.logService,
      this.authService
    );
    this.commandsBackground = new CommandsBackground(
      this,
      this.passwordGenerationService,
      this.platformUtilsService,
      this.vaultTimeoutService,
      this.authService
    );
    this.notificationBackground = new NotificationBackground(
      this.autofillService,
      this.cipherService,
      this.authService,
      this.policyService,
      this.folderService,
      this.stateService
    );

    this.tabsBackground = new TabsBackground(this, this.notificationBackground);
    this.contextMenusBackground = new ContextMenusBackground(
      this,
      this.cipherService,
      this.passwordGenerationService,
      this.platformUtilsService,
      this.authService,
      this.eventService,
      this.totpService
    );
    this.idleBackground = new IdleBackground(
      this.vaultTimeoutService,
      this.stateService,
      this.notificationsService
    );
    this.webRequestBackground = new WebRequestBackground(
      this.platformUtilsService,
      this.cipherService,
      this.authService
    );

    this.usernameGenerationService = new UsernameGenerationServiceImpl(
      this.cryptoService,
      this.stateService,
      this.apiService
    );
  }

  async bootstrap() {
    this.containerService.attachToGlobal(window);

    await this.stateService.init();

    await (this.vaultTimeoutService as BrowserVaultTimeoutService).init(true);
    await (this.i18nService as BrowserI18nService).init();
    await (this.eventService as EventServiceImpl).init(true);
    await this.runtimeBackground.init();
    await this.notificationBackground.init();
    await this.commandsBackground.init();

    this.twoFactorService.init();

    await this.tabsBackground.init();
    await this.contextMenusBackground.init();
    await this.idleBackground.init();
    await this.webRequestBackground.init();

    if (this.platformUtilsService.isFirefox() && !this.isPrivateMode) {
      // Set Private Mode windows to the default icon - they do not share state with the background page
      const privateWindows = await BrowserApi.getPrivateModeWindows();
      privateWindows.forEach(async (win) => {
        await new UpdateBadge(self).setBadgeIcon("", win.id);
      });

      BrowserApi.onWindowCreated(async (win) => {
        if (win.incognito) {
          await new UpdateBadge(self).setBadgeIcon("", win.id);
        }
      });
    }

    return new Promise<void>((resolve) => {
      setTimeout(async () => {
        await this.environmentService.setUrlsFromStorage();
        await this.refreshBadge();
        this.fullSync(true);
        setTimeout(() => this.notificationsService.init(), 2500);
        resolve();
      }, 500);
    });
  }

  async refreshBadge() {
    await new UpdateBadge(self).run({ existingServices: this as any });
  }

  async refreshMenu(forLocked = false) {
    if (!chrome.windows || !chrome.contextMenus) {
      return;
    }

    const menuDisabled = await this.stateService.getDisableContextMenuItem();
    if (!menuDisabled) {
      await this.buildContextMenu();
    } else {
      await this.contextMenusRemoveAll();
    }

    if (forLocked) {
      await this.loadMenuForNoAccessState(!menuDisabled);
      this.onUpdatedRan = this.onReplacedRan = false;
      return;
    }

    const tab = await BrowserApi.getTabFromCurrentWindow();
    if (tab) {
      await this.contextMenuReady(tab, !menuDisabled);
    }
  }

  async logout(expired: boolean, userId?: string) {
    await this.eventService.uploadEvents(userId);

    await Promise.all([
      this.eventService.clearEvents(userId),
      this.syncService.setLastSync(new Date(0), userId),
      this.cryptoService.clearKeys(userId),
      this.settingsService.clear(userId),
      this.cipherService.clear(userId),
      this.folderService.clear(userId),
      this.collectionService.clear(userId),
      this.policyService.clear(userId),
      this.passwordGenerationService.clear(userId),
      this.vaultTimeoutSettingsService.clear(userId),
      this.keyConnectorService.clear(),
      this.vaultFilterService.clear(),
    ]);

    await this.stateService.clean({ userId: userId });

    if (userId == null || userId === (await this.stateService.getUserId())) {
      this.searchService.clearIndex();
      this.messagingService.send("doneLoggingOut", { expired: expired, userId: userId });
    }

    if (BrowserApi.manifestVersion === 3) {
      BrowserApi.sendMessage("updateBadge");
    }
    await this.refreshBadge();
    await this.refreshMenu(true);
    await this.reseedStorage();
    this.notificationsService.updateConnection(false);
    await this.systemService.clearPendingClipboard();
    await this.systemService.startProcessReload(this.authService);
  }

  async collectPageDetailsForContentScript(tab: any, sender: string, frameId: number = null) {
    if (tab == null || !tab.id) {
      return;
    }

    const options: any = {};
    if (frameId != null) {
      options.frameId = frameId;
    }

    BrowserApi.tabSendMessage(
      tab,
      {
        command: "collectPageDetails",
        tab: tab,
        sender: sender,
      },
      options
    );
  }

  async openPopup() {
    // Chrome APIs cannot open popup

    // TODO: Do we need to open this popup?
    if (!this.isSafari) {
      return;
    }
    await SafariApp.sendMessageToApp("showPopover", null, true);
  }

  async reseedStorage() {
    if (
      !this.platformUtilsService.isChrome() &&
      !this.platformUtilsService.isVivaldi() &&
      !this.platformUtilsService.isOpera()
    ) {
      return;
    }

    const currentVaultTimeout = await this.stateService.getVaultTimeout();
    if (currentVaultTimeout == null) {
      return;
    }

    const getStorage = (): Promise<any> =>
      new Promise((resolve) => {
        chrome.storage.local.get(null, (o: any) => resolve(o));
      });

    const clearStorage = (): Promise<void> =>
      new Promise((resolve) => {
        chrome.storage.local.clear(() => resolve());
      });

    const storage = await getStorage();
    await clearStorage();

    for (const key in storage) {
      // eslint-disable-next-line
      if (!storage.hasOwnProperty(key)) {
        continue;
      }
      await this.storageService.save(key, storage[key]);
    }
  }

  private async buildContextMenu() {
    if (!chrome.contextMenus || this.buildingContextMenu) {
      return;
    }

    this.buildingContextMenu = true;
    await this.contextMenusRemoveAll();

    await this.contextMenusCreate({
      type: "normal",
      id: "root",
      contexts: ["all"],
      title: "Bitwarden",
    });

    await this.contextMenusCreate({
      type: "normal",
      id: "autofill",
      parentId: "root",
      contexts: ["all"],
      title: this.i18nService.t("autoFill"),
    });

    await this.contextMenusCreate({
      type: "normal",
      id: "copy-username",
      parentId: "root",
      contexts: ["all"],
      title: this.i18nService.t("copyUsername"),
    });

    await this.contextMenusCreate({
      type: "normal",
      id: "copy-password",
      parentId: "root",
      contexts: ["all"],
      title: this.i18nService.t("copyPassword"),
    });

    if (await this.stateService.getCanAccessPremium()) {
      await this.contextMenusCreate({
        type: "normal",
        id: "copy-totp",
        parentId: "root",
        contexts: ["all"],
        title: this.i18nService.t("copyVerificationCode"),
      });
    }

    await this.contextMenusCreate({
      type: "separator",
      parentId: "root",
    });

    await this.contextMenusCreate({
      type: "normal",
      id: "generate-password",
      parentId: "root",
      contexts: ["all"],
      title: this.i18nService.t("generatePasswordCopied"),
    });

    await this.contextMenusCreate({
      type: "normal",
      id: "copy-identifier",
      parentId: "root",
      contexts: ["all"],
      title: this.i18nService.t("copyElementIdentifier"),
    });

    this.buildingContextMenu = false;
  }

  private async contextMenuReady(tab: any, contextMenuEnabled: boolean) {
    await this.loadMenu(tab.url, tab.id, contextMenuEnabled);
    this.onUpdatedRan = this.onReplacedRan = false;
  }

  private async loadMenu(url: string, tabId: number, contextMenuEnabled: boolean) {
    if (!url || (!chrome.browserAction && !this.sidebarAction)) {
      return;
    }

    this.menuOptionsLoaded = [];
    const authStatus = await this.authService.getAuthStatus();
    if (authStatus === AuthenticationStatus.Unlocked) {
      try {
        const ciphers = await this.cipherService.getAllDecryptedForUrl(url);
        ciphers.sort((a, b) => this.cipherService.sortCiphersByLastUsedThenName(a, b));

        if (contextMenuEnabled) {
          ciphers.forEach((cipher) => {
            this.loadLoginContextMenuOptions(cipher);
          });
        }

        if (contextMenuEnabled && ciphers.length === 0) {
          await this.loadNoLoginsContextMenuOptions(this.i18nService.t("noMatchingLogins"));
        }

        return;
      } catch (e) {
        this.logService.error(e);
      }
    }

    await this.loadMenuForNoAccessState(contextMenuEnabled);
  }

  private async loadMenuForNoAccessState(contextMenuEnabled: boolean) {
    if (contextMenuEnabled) {
      const authed = await this.stateService.getIsAuthenticated();
      await this.loadNoLoginsContextMenuOptions(
        this.i18nService.t(authed ? "unlockVaultMenu" : "loginToVaultMenu")
      );
    }
  }

  private async loadLoginContextMenuOptions(cipher: any) {
    if (
      cipher == null ||
      cipher.type !== CipherType.Login ||
      cipher.reprompt !== CipherRepromptType.None
    ) {
      return;
    }

    let title = cipher.name;
    if (cipher.login.username && cipher.login.username !== "") {
      title += " (" + cipher.login.username + ")";
    }
    await this.loadContextMenuOptions(title, cipher.id, cipher);
  }

  private async loadNoLoginsContextMenuOptions(noLoginsMessage: string) {
    await this.loadContextMenuOptions(noLoginsMessage, "noop", null);
  }

  private async loadContextMenuOptions(title: string, idSuffix: string, cipher: any) {
    if (
      !chrome.contextMenus ||
      this.menuOptionsLoaded.indexOf(idSuffix) > -1 ||
      (cipher != null && cipher.type !== CipherType.Login)
    ) {
      return;
    }

    this.menuOptionsLoaded.push(idSuffix);

    if (cipher == null || (cipher.login.password && cipher.login.password !== "")) {
      await this.contextMenusCreate({
        type: "normal",
        id: "autofill_" + idSuffix,
        parentId: "autofill",
        contexts: ["all"],
        title: this.sanitizeContextMenuTitle(title),
      });
    }

    if (cipher == null || (cipher.login.username && cipher.login.username !== "")) {
      await this.contextMenusCreate({
        type: "normal",
        id: "copy-username_" + idSuffix,
        parentId: "copy-username",
        contexts: ["all"],
        title: this.sanitizeContextMenuTitle(title),
      });
    }

    if (
      cipher == null ||
      (cipher.login.password && cipher.login.password !== "" && cipher.viewPassword)
    ) {
      await this.contextMenusCreate({
        type: "normal",
        id: "copy-password_" + idSuffix,
        parentId: "copy-password",
        contexts: ["all"],
        title: this.sanitizeContextMenuTitle(title),
      });
    }

    const canAccessPremium = await this.stateService.getCanAccessPremium();
    if (canAccessPremium && (cipher == null || (cipher.login.totp && cipher.login.totp !== ""))) {
      await this.contextMenusCreate({
        type: "normal",
        id: "copy-totp_" + idSuffix,
        parentId: "copy-totp",
        contexts: ["all"],
        title: this.sanitizeContextMenuTitle(title),
      });
    }
  }

  private sanitizeContextMenuTitle(title: string): string {
    return title.replace(/&/g, "&&");
  }

  private async fullSync(override = false) {
    const syncInternal = 6 * 60 * 60 * 1000; // 6 hours
    const lastSync = await this.syncService.getLastSync();

    let lastSyncAgo = syncInternal + 1;
    if (lastSync != null) {
      lastSyncAgo = new Date().getTime() - lastSync.getTime();
    }

    if (override || lastSyncAgo >= syncInternal) {
      await this.syncService.fullSync(override);
      this.scheduleNextSync();
    } else {
      this.scheduleNextSync();
    }
  }

  private scheduleNextSync() {
    if (this.syncTimeout) {
      clearTimeout(this.syncTimeout);
    }

    this.syncTimeout = setTimeout(async () => await this.fullSync(), 5 * 60 * 1000); // check every 5 minutes
  }

  // Browser API Helpers

  private contextMenusRemoveAll() {
    return new Promise<void>((resolve) => {
      chrome.contextMenus.removeAll(() => {
        resolve();
        if (chrome.runtime.lastError) {
          return;
        }
      });
    });
  }

  private contextMenusCreate(options: any) {
    return new Promise<void>((resolve) => {
      chrome.contextMenus.create(options, () => {
        resolve();
        if (chrome.runtime.lastError) {
          return;
        }
      });
    });
  }

  private async actionSetIcon(theAction: any, suffix: string, windowId?: number): Promise<any> {
    if (!theAction || !theAction.setIcon) {
      return;
    }

    const options: IconDetails = {
      path: {
        19: "images/icon19" + suffix + ".png",
        38: "images/icon38" + suffix + ".png",
      },
    };

    if (this.platformUtilsService.isFirefox()) {
      options.windowId = windowId;
      await theAction.setIcon(options);
    } else if (this.platformUtilsService.isSafari()) {
      // Workaround since Safari 14.0.3 returns a pending promise
      // which doesn't resolve within a reasonable time.
      theAction.setIcon(options);
    } else {
      return new Promise<void>((resolve) => {
        theAction.setIcon(options, () => resolve());
      });
    }
  }
}
