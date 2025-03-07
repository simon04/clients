import { AvatarUpdateService as AvatarUpdateServiceAbstraction } from "@bitwarden/common/abstractions/account/avatar-update.service";
import { ApiService as ApiServiceAbstraction } from "@bitwarden/common/abstractions/api.service";
import { AppIdService as AppIdServiceAbstraction } from "@bitwarden/common/abstractions/appId.service";
import { AuditService as AuditServiceAbstraction } from "@bitwarden/common/abstractions/audit.service";
import { AuthService as AuthServiceAbstraction } from "@bitwarden/common/abstractions/auth.service";
import { CipherService as CipherServiceAbstraction } from "@bitwarden/common/abstractions/cipher.service";
import { CollectionService as CollectionServiceAbstraction } from "@bitwarden/common/abstractions/collection.service";
import { CryptoService as CryptoServiceAbstraction } from "@bitwarden/common/abstractions/crypto.service";
import { CryptoFunctionService as CryptoFunctionServiceAbstraction } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import { EventCollectionService as EventCollectionServiceAbstraction } from "@bitwarden/common/abstractions/event/event-collection.service";
import { EventUploadService as EventUploadServiceAbstraction } from "@bitwarden/common/abstractions/event/event-upload.service";
import { ExportService as ExportServiceAbstraction } from "@bitwarden/common/abstractions/export.service";
import { FileUploadService as FileUploadServiceAbstraction } from "@bitwarden/common/abstractions/fileUpload.service";
import { FolderApiServiceAbstraction } from "@bitwarden/common/abstractions/folder/folder-api.service.abstraction";
import { InternalFolderService as InternalFolderServiceAbstraction } from "@bitwarden/common/abstractions/folder/folder.service.abstraction";
import { I18nService as I18nServiceAbstraction } from "@bitwarden/common/abstractions/i18n.service";
import { KeyConnectorService as KeyConnectorServiceAbstraction } from "@bitwarden/common/abstractions/keyConnector.service";
import { LogService as LogServiceAbstraction } from "@bitwarden/common/abstractions/log.service";
import { MessagingService as MessagingServiceAbstraction } from "@bitwarden/common/abstractions/messaging.service";
import { NotificationsService as NotificationsServiceAbstraction } from "@bitwarden/common/abstractions/notifications.service";
import { InternalOrganizationService as InternalOrganizationServiceAbstraction } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";
import { PasswordGenerationService as PasswordGenerationServiceAbstraction } from "@bitwarden/common/abstractions/passwordGeneration.service";
import { PlatformUtilsService as PlatformUtilsServiceAbstraction } from "@bitwarden/common/abstractions/platformUtils.service";
import { PolicyApiServiceAbstraction } from "@bitwarden/common/abstractions/policy/policy-api.service.abstraction";
import { InternalPolicyService as InternalPolicyServiceAbstraction } from "@bitwarden/common/abstractions/policy/policy.service.abstraction";
import { ProviderService as ProviderServiceAbstraction } from "@bitwarden/common/abstractions/provider.service";
import { SearchService as SearchServiceAbstraction } from "@bitwarden/common/abstractions/search.service";
import { SendService as SendServiceAbstraction } from "@bitwarden/common/abstractions/send.service";
import { SettingsService as SettingsServiceAbstraction } from "@bitwarden/common/abstractions/settings.service";
import { AbstractStorageService } from "@bitwarden/common/abstractions/storage.service";
import { SyncService as SyncServiceAbstraction } from "@bitwarden/common/abstractions/sync/sync.service.abstraction";
import { SyncNotifierService as SyncNotifierServiceAbstraction } from "@bitwarden/common/abstractions/sync/syncNotifier.service.abstraction";
import { SystemService as SystemServiceAbstraction } from "@bitwarden/common/abstractions/system.service";
import { TokenService as TokenServiceAbstraction } from "@bitwarden/common/abstractions/token.service";
import { TotpService as TotpServiceAbstraction } from "@bitwarden/common/abstractions/totp.service";
import { TwoFactorService as TwoFactorServiceAbstraction } from "@bitwarden/common/abstractions/twoFactor.service";
import { UserVerificationApiServiceAbstraction } from "@bitwarden/common/abstractions/userVerification/userVerification-api.service.abstraction";
import { UserVerificationService as UserVerificationServiceAbstraction } from "@bitwarden/common/abstractions/userVerification/userVerification.service.abstraction";
import { UsernameGenerationService as UsernameGenerationServiceAbstraction } from "@bitwarden/common/abstractions/usernameGeneration.service";
import { VaultTimeoutService as VaultTimeoutServiceAbstraction } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeout.service";
import { VaultTimeoutSettingsService as VaultTimeoutSettingsServiceAbstraction } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeoutSettings.service";
import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { CipherView } from "@bitwarden/common/models/view/cipher.view";
import { AvatarUpdateService } from "@bitwarden/common/services/account/avatar-update.service";
import { ApiService } from "@bitwarden/common/services/api.service";
import { AppIdService } from "@bitwarden/common/services/appId.service";
import { AuditService } from "@bitwarden/common/services/audit.service";
import { AuthService } from "@bitwarden/common/services/auth.service";
import { CipherService } from "@bitwarden/common/services/cipher.service";
import { CollectionService } from "@bitwarden/common/services/collection.service";
import { ConsoleLogService } from "@bitwarden/common/services/consoleLog.service";
import { ContainerService } from "@bitwarden/common/services/container.service";
import { EncryptServiceImplementation } from "@bitwarden/common/services/cryptography/encrypt.service.implementation";
import { MultithreadEncryptServiceImplementation } from "@bitwarden/common/services/cryptography/multithread-encrypt.service.implementation";
import { EventCollectionService } from "@bitwarden/common/services/event/event-collection.service";
import { EventUploadService } from "@bitwarden/common/services/event/event-upload.service";
import { ExportService } from "@bitwarden/common/services/export.service";
import { FileUploadService } from "@bitwarden/common/services/fileUpload.service";
import { FolderApiService } from "@bitwarden/common/services/folder/folder-api.service";
import { KeyConnectorService } from "@bitwarden/common/services/keyConnector.service";
import { MemoryStorageService } from "@bitwarden/common/services/memoryStorage.service";
import { NotificationsService } from "@bitwarden/common/services/notifications.service";
import { PasswordGenerationService } from "@bitwarden/common/services/passwordGeneration.service";
import { PolicyApiService } from "@bitwarden/common/services/policy/policy-api.service";
import { ProviderService } from "@bitwarden/common/services/provider.service";
import { SearchService } from "@bitwarden/common/services/search.service";
import { SendService } from "@bitwarden/common/services/send.service";
import { StateMigrationService } from "@bitwarden/common/services/stateMigration.service";
import { SyncService } from "@bitwarden/common/services/sync/sync.service";
import { SyncNotifierService } from "@bitwarden/common/services/sync/syncNotifier.service";
import { SystemService } from "@bitwarden/common/services/system.service";
import { TokenService } from "@bitwarden/common/services/token.service";
import { TotpService } from "@bitwarden/common/services/totp.service";
import { TwoFactorService } from "@bitwarden/common/services/twoFactor.service";
import { UserVerificationApiService } from "@bitwarden/common/services/userVerification/userVerification-api.service";
import { UserVerificationService } from "@bitwarden/common/services/userVerification/userVerification.service";
import { UsernameGenerationService } from "@bitwarden/common/services/usernameGeneration.service";
import { VaultTimeoutSettingsService } from "@bitwarden/common/services/vaultTimeout/vaultTimeoutSettings.service";
import { WebCryptoFunctionService } from "@bitwarden/common/services/webCryptoFunction.service";

import { BrowserApi } from "../browser/browserApi";
import { CipherContextMenuHandler } from "../browser/cipher-context-menu-handler";
import { ContextMenuClickedHandler } from "../browser/context-menu-clicked-handler";
import { MainContextMenuHandler } from "../browser/main-context-menu-handler";
import { SafariApp } from "../browser/safariApp";
import { AutofillTabCommand } from "../commands/autofill-tab-command";
import { flagEnabled } from "../flags";
import { UpdateBadge } from "../listeners/update-badge";
import { Account } from "../models/account";
import { PopupUtilsService } from "../popup/services/popup-utils.service";
import { AutofillService as AutofillServiceAbstraction } from "../services/abstractions/autofill.service";
import { BrowserStateService as StateServiceAbstraction } from "../services/abstractions/browser-state.service";
import AutofillService from "../services/autofill.service";
import { BrowserEnvironmentService } from "../services/browser-environment.service";
import { BrowserFolderService } from "../services/browser-folder.service";
import { BrowserOrganizationService } from "../services/browser-organization.service";
import { BrowserPolicyService } from "../services/browser-policy.service";
import { BrowserSettingsService } from "../services/browser-settings.service";
import { BrowserStateService } from "../services/browser-state.service";
import { BrowserCryptoService } from "../services/browserCrypto.service";
import BrowserLocalStorageService from "../services/browserLocalStorage.service";
import BrowserMessagingService from "../services/browserMessaging.service";
import BrowserMessagingPrivateModeBackgroundService from "../services/browserMessagingPrivateModeBackground.service";
import BrowserPlatformUtilsService from "../services/browserPlatformUtils.service";
import I18nService from "../services/i18n.service";
import { KeyGenerationService } from "../services/keyGeneration.service";
import { LocalBackedSessionStorageService } from "../services/localBackedSessionStorage.service";
import { VaultFilterService } from "../services/vaultFilter.service";
import VaultTimeoutService from "../services/vaultTimeout/vaultTimeout.service";

import CommandsBackground from "./commands.background";
import ContextMenusBackground from "./contextMenus.background";
import IdleBackground from "./idle.background";
import { NativeMessagingBackground } from "./nativeMessaging.background";
import NotificationBackground from "./notification.background";
import RuntimeBackground from "./runtime.background";
import TabsBackground from "./tabs.background";
import WebRequestBackground from "./webRequest.background";

export default class MainBackground {
  messagingService: MessagingServiceAbstraction;
  storageService: AbstractStorageService;
  secureStorageService: AbstractStorageService;
  memoryStorageService: AbstractStorageService;
  i18nService: I18nServiceAbstraction;
  platformUtilsService: PlatformUtilsServiceAbstraction;
  logService: LogServiceAbstraction;
  cryptoService: CryptoServiceAbstraction;
  cryptoFunctionService: CryptoFunctionServiceAbstraction;
  tokenService: TokenServiceAbstraction;
  appIdService: AppIdServiceAbstraction;
  apiService: ApiServiceAbstraction;
  environmentService: BrowserEnvironmentService;
  settingsService: SettingsServiceAbstraction;
  cipherService: CipherServiceAbstraction;
  folderService: InternalFolderServiceAbstraction;
  collectionService: CollectionServiceAbstraction;
  vaultTimeoutService: VaultTimeoutServiceAbstraction;
  vaultTimeoutSettingsService: VaultTimeoutSettingsServiceAbstraction;
  syncService: SyncServiceAbstraction;
  passwordGenerationService: PasswordGenerationServiceAbstraction;
  totpService: TotpServiceAbstraction;
  autofillService: AutofillServiceAbstraction;
  containerService: ContainerService;
  auditService: AuditServiceAbstraction;
  authService: AuthServiceAbstraction;
  exportService: ExportServiceAbstraction;
  searchService: SearchServiceAbstraction;
  notificationsService: NotificationsServiceAbstraction;
  stateService: StateServiceAbstraction;
  stateMigrationService: StateMigrationService;
  systemService: SystemServiceAbstraction;
  eventCollectionService: EventCollectionServiceAbstraction;
  eventUploadService: EventUploadServiceAbstraction;
  policyService: InternalPolicyServiceAbstraction;
  popupUtilsService: PopupUtilsService;
  sendService: SendServiceAbstraction;
  fileUploadService: FileUploadServiceAbstraction;
  organizationService: InternalOrganizationServiceAbstraction;
  providerService: ProviderServiceAbstraction;
  keyConnectorService: KeyConnectorServiceAbstraction;
  userVerificationService: UserVerificationServiceAbstraction;
  twoFactorService: TwoFactorServiceAbstraction;
  vaultFilterService: VaultFilterService;
  usernameGenerationService: UsernameGenerationServiceAbstraction;
  encryptService: EncryptService;
  folderApiService: FolderApiServiceAbstraction;
  policyApiService: PolicyApiServiceAbstraction;
  userVerificationApiService: UserVerificationApiServiceAbstraction;
  syncNotifierService: SyncNotifierServiceAbstraction;
  avatarUpdateService: AvatarUpdateServiceAbstraction;
  mainContextMenuHandler: MainContextMenuHandler;
  cipherContextMenuHandler: CipherContextMenuHandler;

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
            new EncryptServiceImplementation(this.cryptoFunctionService, this.logService, false),
            new KeyGenerationService(this.cryptoFunctionService)
          )
        : new MemoryStorageService();
    this.stateMigrationService = new StateMigrationService(
      this.storageService,
      this.secureStorageService,
      new StateFactory(GlobalState, Account)
    );
    this.stateService = new BrowserStateService(
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
    this.i18nService = new I18nService(BrowserApi.getUILanguage(window));
    this.encryptService = flagEnabled("multithreadDecryption")
      ? new MultithreadEncryptServiceImplementation(
          this.cryptoFunctionService,
          this.logService,
          true
        )
      : new EncryptServiceImplementation(this.cryptoFunctionService, this.logService, true);
    this.cryptoService = new BrowserCryptoService(
      this.cryptoFunctionService,
      this.encryptService,
      this.platformUtilsService,
      this.logService,
      this.stateService
    );
    this.tokenService = new TokenService(this.stateService);
    this.appIdService = new AppIdService(this.storageService);
    this.environmentService = new BrowserEnvironmentService(this.stateService, this.logService);
    this.apiService = new ApiService(
      this.tokenService,
      this.platformUtilsService,
      this.environmentService,
      this.appIdService,
      (expired: boolean) => this.logout(expired)
    );
    this.settingsService = new BrowserSettingsService(this.stateService);
    this.fileUploadService = new FileUploadService(this.logService, this.apiService);
    this.cipherService = new CipherService(
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
    this.folderApiService = new FolderApiService(this.folderService, this.apiService);
    this.collectionService = new CollectionService(
      this.cryptoService,
      this.i18nService,
      this.stateService
    );
    this.searchService = new SearchService(this.cipherService, this.logService, this.i18nService);
    this.sendService = new SendService(
      this.cryptoService,
      this.apiService,
      this.fileUploadService,
      this.i18nService,
      this.cryptoFunctionService,
      this.stateService
    );
    this.syncNotifierService = new SyncNotifierService();
    this.organizationService = new BrowserOrganizationService(this.stateService);
    this.policyService = new BrowserPolicyService(this.stateService, this.organizationService);
    this.policyApiService = new PolicyApiService(
      this.policyService,
      this.apiService,
      this.stateService,
      this.organizationService
    );
    this.keyConnectorService = new KeyConnectorService(
      this.stateService,
      this.cryptoService,
      this.apiService,
      this.tokenService,
      this.logService,
      this.organizationService,
      this.cryptoFunctionService,
      logoutCallback
    );
    this.vaultFilterService = new VaultFilterService(
      this.stateService,
      this.organizationService,
      this.folderService,
      this.cipherService,
      this.collectionService,
      this.policyService
    );

    this.twoFactorService = new TwoFactorService(this.i18nService, this.platformUtilsService);

    // eslint-disable-next-line
    const that = this;
    const backgroundMessagingService = new (class extends MessagingServiceAbstraction {
      // AuthService should send the messages to the background not popup.
      send = (subscriber: string, arg: any = {}) => {
        const message = Object.assign({}, { command: subscriber }, arg);
        that.runtimeBackground.processMessage(message, that, null);
      };
    })();
    this.authService = new AuthService(
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

    this.vaultTimeoutSettingsService = new VaultTimeoutSettingsService(
      this.cryptoService,
      this.tokenService,
      this.policyService,
      this.stateService
    );

    this.vaultTimeoutService = new VaultTimeoutService(
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

    this.providerService = new ProviderService(this.stateService);
    this.syncService = new SyncService(
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
      this.organizationService,
      logoutCallback
    );
    this.eventUploadService = new EventUploadService(
      this.apiService,
      this.stateService,
      this.logService
    );
    this.eventCollectionService = new EventCollectionService(
      this.cipherService,
      this.stateService,
      this.organizationService,
      this.eventUploadService
    );
    this.passwordGenerationService = new PasswordGenerationService(
      this.cryptoService,
      this.policyService,
      this.stateService
    );
    this.totpService = new TotpService(this.cryptoFunctionService, this.logService);
    this.autofillService = new AutofillService(
      this.cipherService,
      this.stateService,
      this.totpService,
      this.eventCollectionService,
      this.logService
    );
    this.containerService = new ContainerService(this.cryptoService, this.encryptService);
    this.auditService = new AuditService(this.cryptoFunctionService, this.apiService);
    this.exportService = new ExportService(
      this.folderService,
      this.cipherService,
      this.apiService,
      this.cryptoService,
      this.cryptoFunctionService
    );
    this.notificationsService = new NotificationsService(
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

    this.userVerificationApiService = new UserVerificationApiService(this.apiService);

    this.userVerificationService = new UserVerificationService(
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

    this.systemService = new SystemService(
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
    if (!this.popupOnlyContext) {
      const contextMenuClickedHandler = new ContextMenuClickedHandler(
        (options) => this.platformUtilsService.copyToClipboard(options.text, { window: self }),
        async (_tab) => {
          const options = (await this.passwordGenerationService.getOptions())?.[0] ?? {};
          const password = await this.passwordGenerationService.generatePassword(options);
          this.platformUtilsService.copyToClipboard(password, { window: window });
          this.passwordGenerationService.addHistory(password);
        },
        this.authService,
        this.cipherService,
        new AutofillTabCommand(this.autofillService),
        this.totpService,
        this.eventCollectionService
      );

      this.contextMenusBackground = new ContextMenusBackground(contextMenuClickedHandler);
    }

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

    this.usernameGenerationService = new UsernameGenerationService(
      this.cryptoService,
      this.stateService,
      this.apiService
    );

    this.avatarUpdateService = new AvatarUpdateService(this.apiService, this.stateService);

    if (!this.popupOnlyContext) {
      this.mainContextMenuHandler = new MainContextMenuHandler(this.stateService, this.i18nService);

      this.cipherContextMenuHandler = new CipherContextMenuHandler(
        this.mainContextMenuHandler,
        this.authService,
        this.cipherService
      );
    }
  }

  async bootstrap() {
    this.containerService.attachToGlobal(window);

    await this.stateService.init();

    await (this.vaultTimeoutService as VaultTimeoutService).init(true);
    await (this.i18nService as I18nService).init();
    await (this.eventUploadService as EventUploadService).init(true);
    await this.runtimeBackground.init();
    await this.notificationBackground.init();
    await this.commandsBackground.init();

    this.twoFactorService.init();

    await this.tabsBackground.init();
    if (!this.popupOnlyContext) {
      this.contextMenusBackground?.init();
    }
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
        if (!this.isPrivateMode) {
          await this.refreshBadge();
        }
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

    await MainContextMenuHandler.removeAll();

    if (forLocked) {
      await this.mainContextMenuHandler?.noAccess();
      this.onUpdatedRan = this.onReplacedRan = false;
      return;
    }

    await this.mainContextMenuHandler?.init();

    const tab = await BrowserApi.getTabFromCurrentWindow();
    if (tab) {
      await this.cipherContextMenuHandler?.update(tab.url);
      this.onUpdatedRan = this.onReplacedRan = false;
    }
  }

  async logout(expired: boolean, userId?: string) {
    await this.eventUploadService.uploadEvents(userId);

    await Promise.all([
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
    await this.mainContextMenuHandler.noAccess();
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
}
