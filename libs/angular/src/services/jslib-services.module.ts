import { Injector, LOCALE_ID, NgModule } from "@angular/core";

import { AccountApiService } from "@bitwarden/common/abstractions/account/account-api.service";
import {
  InternalAccountService,
  AccountService,
} from "@bitwarden/common/abstractions/account/account.service";
import { AnonymousHubService } from "@bitwarden/common/abstractions/anonymousHub.service";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { AppIdService } from "@bitwarden/common/abstractions/appId.service";
import { AuditService } from "@bitwarden/common/abstractions/audit.service";
import { AuthService } from "@bitwarden/common/abstractions/auth.service";
import { BroadcasterService as BroadcasterServiceAbstraction } from "@bitwarden/common/abstractions/broadcaster.service";
import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { CollectionService } from "@bitwarden/common/abstractions/collection.service";
import { ConfigApiServiceAbstraction } from "@bitwarden/common/abstractions/config/config-api.service.abstraction";
import { ConfigServiceAbstraction } from "@bitwarden/common/abstractions/config/config.service.abstraction";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import { EnvironmentService } from "@bitwarden/common/abstractions/environment.service";
import { EventService } from "@bitwarden/common/abstractions/event.service";
import { ExportService } from "@bitwarden/common/abstractions/export.service";
import { FileUploadService } from "@bitwarden/common/abstractions/fileUpload.service";
import { FolderApiServiceAbstraction } from "@bitwarden/common/abstractions/folder/folder-api.service.abstraction";
import {
  FolderService,
  InternalFolderService,
} from "@bitwarden/common/abstractions/folder/folder.service.abstraction";
import { FormValidationErrorsService } from "@bitwarden/common/abstractions/formValidationErrors.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { KeyConnectorService } from "@bitwarden/common/abstractions/keyConnector.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { LoginService } from "@bitwarden/common/abstractions/login.service";
import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { NotificationsService } from "@bitwarden/common/abstractions/notifications.service";
import { OrganizationApiServiceAbstraction } from "@bitwarden/common/abstractions/organization/organization-api.service.abstraction";
import { OrganizationService } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";
import { PasswordGenerationService } from "@bitwarden/common/abstractions/passwordGeneration.service";
import { PasswordRepromptService } from "@bitwarden/common/abstractions/passwordReprompt.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { PolicyApiServiceAbstraction } from "@bitwarden/common/abstractions/policy/policy-api.service.abstraction";
import {
  PolicyService,
  InternalPolicyService,
} from "@bitwarden/common/abstractions/policy/policy.service.abstraction";
import { ProviderService } from "@bitwarden/common/abstractions/provider.service";
import { SearchService } from "@bitwarden/common/abstractions/search.service";
import { SendService } from "@bitwarden/common/abstractions/send.service";
import { SettingsService } from "@bitwarden/common/abstractions/settings.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { StateMigrationService } from "@bitwarden/common/abstractions/stateMigration.service";
import { AbstractStorageService } from "@bitwarden/common/abstractions/storage.service";
import { SyncService } from "@bitwarden/common/abstractions/sync/sync.service.abstraction";
import { SyncNotifierService } from "@bitwarden/common/abstractions/sync/syncNotifier.service.abstraction";
import { TokenService } from "@bitwarden/common/abstractions/token.service";
import { TotpService } from "@bitwarden/common/abstractions/totp.service";
import { TwoFactorService } from "@bitwarden/common/abstractions/twoFactor.service";
import { UserVerificationApiServiceAbstraction } from "@bitwarden/common/abstractions/userVerification/userVerification-api.service.abstraction";
import { UserVerificationService } from "@bitwarden/common/abstractions/userVerification/userVerification.service.abstraction";
import { UsernameGenerationService } from "@bitwarden/common/abstractions/usernameGeneration.service";
import { ValidationService } from "@bitwarden/common/abstractions/validation.service";
import { VaultTimeoutService } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeout.service";
import { VaultTimeoutSettingsService } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeoutSettings.service";
import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { flagEnabled } from "@bitwarden/common/misc/flags";
import { Account } from "@bitwarden/common/models/domain/account";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { AccountApiServiceImpl } from "@bitwarden/common/services/account/account-api.service.impl";
import { AccountServiceImpl } from "@bitwarden/common/services/account/account.service.impl";
import { AnonymousHubServiceImpl } from "@bitwarden/common/services/anonymous-hub.service.impl";
import { ApiServiceImpl } from "@bitwarden/common/services/api.service.impl";
import { AppIdServiceImpl } from "@bitwarden/common/services/app-id.service.impl";
import { AuditServiceImpl } from "@bitwarden/common/services/audit.service.impl";
import { AuthServiceImpl } from "@bitwarden/common/services/auth.service.impl";
import { CipherServiceImpl } from "@bitwarden/common/services/cipher.service.impl";
import { CollectionServiceImpl } from "@bitwarden/common/services/collection.service.impl";
import { ConfigApiServiceImpl } from "@bitwarden/common/services/config/config-api.service.impl";
import { ConfigServiceImpl } from "@bitwarden/common/services/config/config.service.impl";
import { ConsoleLogService } from "@bitwarden/common/services/console-log.service";
import { CryptoServiceImpl } from "@bitwarden/common/services/crypto.service.impl";
import { EncryptServiceImpl } from "@bitwarden/common/services/cryptography/encrypt.service.impl";
import { MultithreadEncryptServiceImpl } from "@bitwarden/common/services/cryptography/multithread-encrypt.service.impl";
import { EnvironmentServiceImpl } from "@bitwarden/common/services/environment.service.impl";
import { EventServiceImpl } from "@bitwarden/common/services/event.service.impl";
import { ExportServiceImpl } from "@bitwarden/common/services/export.service.impl";
import { FileUploadServiceImpl } from "@bitwarden/common/services/file-upload.service.impl";
import { FolderApiServiceImpl } from "@bitwarden/common/services/folder/folder-api.service.impl";
import { FolderServiceImpl } from "@bitwarden/common/services/folder/folder.service.impl";
import { FormValidationErrorsServiceImpl } from "@bitwarden/common/services/form-validation-errors.service.impl";
import { KeyConnectorServiceImpl } from "@bitwarden/common/services/key-connector.service.impl";
import { LoginServiceImpl } from "@bitwarden/common/services/login.service.impl";
import { NotificationsServiceImpl } from "@bitwarden/common/services/notifications.service.impl";
import { OrganizationApiServiceImpl } from "@bitwarden/common/services/organization/organization-api.service.impl";
import { OrganizationServiceImpl } from "@bitwarden/common/services/organization/organization.service.impl";
import { PasswordGenerationServiceImpl } from "@bitwarden/common/services/password-generation.service.impl";
import { PolicyApiServiceImpl } from "@bitwarden/common/services/policy/policy-api.service.impl";
import { PolicyServiceImpl } from "@bitwarden/common/services/policy/policy.service.impl";
import { ProviderServiceImpl } from "@bitwarden/common/services/provider.service.impl";
import { SearchServiceImpl } from "@bitwarden/common/services/search.service.impl";
import { SendServiceImpl } from "@bitwarden/common/services/send.service.impl";
import { SettingsServiceImpl } from "@bitwarden/common/services/settings.service.impl";
import { StateMigrationServiceImpl } from "@bitwarden/common/services/state-migration.service.impl";
import { StateServiceImpl } from "@bitwarden/common/services/state.service.impl";
import { SyncNotifierServiceImpl } from "@bitwarden/common/services/sync/sync-notifier.service.impl";
import { SyncServiceImpl } from "@bitwarden/common/services/sync/sync.service.impl";
import { TokenServiceImpl } from "@bitwarden/common/services/token.service.impl";
import { TotpServiceImpl } from "@bitwarden/common/services/totp.service.impl";
import { TwoFactorServiceImpl } from "@bitwarden/common/services/two-factor.service.impl";
import { UserVerificationApiServiceImpl } from "@bitwarden/common/services/user-verification/user-verification-api.service.impl";
import { UserVerificationServiceImpl } from "@bitwarden/common/services/user-verification/user-verification.service.impl";
import { UsernameGenerationServiceImpl } from "@bitwarden/common/services/username-generation.service.impl";
import { ValidationServiceImpl } from "@bitwarden/common/services/validation.service.impl";
import { VaultTimeoutSettingsServiceImpl } from "@bitwarden/common/services/vault-timeout/vault-timeout-settings.service.impl";
import { VaultTimeoutServiceImpl } from "@bitwarden/common/services/vault-timeout/vault-timeout.service.impl";
import { WebCryptoFunctionService } from "@bitwarden/common/services/web-crypto-function.service";

import { AuthGuard } from "../guards/auth.guard";
import { LockGuard } from "../guards/lock.guard";
import { UnauthGuard } from "../guards/unauth.guard";

import { BroadcasterService } from "./broadcaster.service";
import {
  WINDOW,
  MEMORY_STORAGE,
  SECURE_STORAGE,
  STATE_FACTORY,
  STATE_SERVICE_USE_CACHE,
  LOGOUT_CALLBACK,
  LOCKED_CALLBACK,
  LOCALES_DIRECTORY,
  SYSTEM_LANGUAGE,
  LOG_MAC_FAILURES,
} from "./injection-tokens";
import { ModalService } from "./modal.service";
import { PasswordRepromptServiceImpl } from "./password-reprompt.service.impl";
import { AbstractThemingService } from "./theming/theming.service.abstraction";
import { ThemingServiceImpl } from "./theming/theming.service.impl";

@NgModule({
  declarations: [],
  providers: [
    AuthGuard,
    UnauthGuard,
    LockGuard,
    ModalService,
    { provide: WINDOW, useValue: window },
    {
      provide: LOCALE_ID,
      useFactory: (i18nService: I18nService) => i18nService.translationLocale,
      deps: [I18nService],
    },
    {
      provide: LOCALES_DIRECTORY,
      useValue: "./locales",
    },
    {
      provide: SYSTEM_LANGUAGE,
      useFactory: (window: Window) => window.navigator.language,
      deps: [WINDOW],
    },
    {
      provide: STATE_FACTORY,
      useValue: new StateFactory(GlobalState, Account),
    },
    {
      provide: STATE_SERVICE_USE_CACHE,
      useValue: true,
    },
    {
      provide: LOGOUT_CALLBACK,
      useFactory: (messagingService: MessagingService) => (expired: boolean, userId?: string) =>
        messagingService.send("logout", { expired: expired, userId: userId }),
      deps: [MessagingService],
    },
    {
      provide: LOCKED_CALLBACK,
      useValue: null,
    },
    {
      provide: LOG_MAC_FAILURES,
      useValue: true,
    },
    {
      provide: AppIdService,
      useClass: AppIdServiceImpl,
      deps: [AbstractStorageService],
    },
    {
      provide: AuditService,
      useClass: AuditServiceImpl,
      deps: [CryptoFunctionService, ApiService],
    },
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
      deps: [
        CryptoService,
        ApiService,
        TokenService,
        AppIdService,
        PlatformUtilsService,
        MessagingService,
        LogService,
        KeyConnectorService,
        EnvironmentService,
        StateService,
        TwoFactorService,
        I18nService,
      ],
    },
    {
      provide: CipherService,
      useFactory: (
        cryptoService: CryptoService,
        settingsService: SettingsService,
        apiService: ApiService,
        fileUploadService: FileUploadService,
        i18nService: I18nService,
        injector: Injector,
        logService: LogService,
        stateService: StateService,
        encryptService: EncryptService
      ) =>
        new CipherServiceImpl(
          cryptoService,
          settingsService,
          apiService,
          fileUploadService,
          i18nService,
          () => injector.get(SearchService),
          logService,
          stateService,
          encryptService
        ),
      deps: [
        CryptoService,
        SettingsService,
        ApiService,
        FileUploadService,
        I18nService,
        Injector, // TODO: Get rid of this circular dependency!
        LogService,
        StateService,
        EncryptService,
      ],
    },
    {
      provide: FolderService,
      useClass: FolderServiceImpl,
      deps: [CryptoService, I18nService, CipherService, StateService],
    },
    {
      provide: InternalFolderService,
      useExisting: FolderService,
    },
    {
      provide: FolderApiServiceAbstraction,
      useClass: FolderApiServiceImpl,
      deps: [FolderService, ApiService],
    },
    {
      provide: AccountApiService,
      useClass: AccountApiServiceImpl,
      deps: [ApiService, UserVerificationService, LogService, InternalAccountService],
    },
    {
      provide: AccountService,
      useClass: AccountServiceImpl,
      deps: [MessagingService, LogService],
    },
    {
      provide: InternalAccountService,
      useExisting: AccountService,
    },
    { provide: LogService, useFactory: () => new ConsoleLogService(false) },
    {
      provide: CollectionService,
      useClass: CollectionServiceImpl,
      deps: [CryptoService, I18nService, StateService],
    },
    {
      provide: EnvironmentService,
      useClass: EnvironmentServiceImpl,
      deps: [StateService],
    },
    {
      provide: TotpService,
      useClass: TotpServiceImpl,
      deps: [CryptoFunctionService, LogService, StateService],
    },
    { provide: TokenService, useClass: TokenServiceImpl, deps: [StateService] },
    {
      provide: CryptoService,
      useClass: CryptoServiceImpl,
      deps: [CryptoFunctionService, EncryptService, PlatformUtilsService, LogService, StateService],
    },
    {
      provide: PasswordGenerationService,
      useClass: PasswordGenerationServiceImpl,
      deps: [CryptoService, PolicyService, StateService],
    },
    {
      provide: UsernameGenerationService,
      useClass: UsernameGenerationServiceImpl,
      deps: [CryptoService, StateService, ApiService],
    },
    {
      provide: ApiService,
      useClass: ApiServiceImpl,
      deps: [TokenService, PlatformUtilsService, EnvironmentService, AppIdService, LOGOUT_CALLBACK],
    },
    {
      provide: FileUploadService,
      useClass: FileUploadServiceImpl,
      deps: [LogService, ApiService],
    },
    {
      provide: SyncService,
      useClass: SyncServiceImpl,
      deps: [
        ApiService,
        SettingsService,
        FolderService,
        CipherService,
        CryptoService,
        CollectionService,
        MessagingService,
        PolicyService,
        SendService,
        LogService,
        KeyConnectorService,
        StateService,
        ProviderService,
        FolderApiServiceAbstraction,
        SyncNotifierService,
        LOGOUT_CALLBACK,
      ],
    },
    { provide: BroadcasterServiceAbstraction, useClass: BroadcasterService },
    {
      provide: SettingsService,
      useClass: SettingsServiceImpl,
      deps: [StateService],
    },
    {
      provide: VaultTimeoutSettingsService,
      useClass: VaultTimeoutSettingsServiceImpl,
      deps: [CryptoService, TokenService, PolicyService, StateService],
    },
    {
      provide: VaultTimeoutService,
      useClass: VaultTimeoutServiceImpl,
      deps: [
        CipherService,
        FolderService,
        CollectionService,
        CryptoService,
        PlatformUtilsService,
        MessagingService,
        SearchService,
        KeyConnectorService,
        StateService,
        AuthService,
        VaultTimeoutSettingsService,
        LOCKED_CALLBACK,
        LOGOUT_CALLBACK,
      ],
    },
    {
      provide: StateService,
      useClass: StateServiceImpl,
      deps: [
        AbstractStorageService,
        SECURE_STORAGE,
        MEMORY_STORAGE,
        LogService,
        StateMigrationService,
        STATE_FACTORY,
        STATE_SERVICE_USE_CACHE,
      ],
    },
    {
      provide: StateMigrationService,
      useClass: StateMigrationServiceImpl,
      deps: [AbstractStorageService, SECURE_STORAGE, STATE_FACTORY],
    },
    {
      provide: ExportService,
      useClass: ExportServiceImpl,
      deps: [FolderService, CipherService, ApiService, CryptoService, CryptoFunctionService],
    },
    {
      provide: SearchService,
      useClass: SearchServiceImpl,
      deps: [CipherService, LogService, I18nService],
    },
    {
      provide: NotificationsService,
      useClass: NotificationsServiceImpl,
      deps: [
        SyncService,
        AppIdService,
        ApiService,
        EnvironmentService,
        LOGOUT_CALLBACK,
        LogService,
        StateService,
        AuthService,
      ],
    },
    {
      provide: CryptoFunctionService,
      useClass: WebCryptoFunctionService,
      deps: [WINDOW],
    },
    {
      provide: EncryptService,
      useFactory: encryptServiceFactory,
      deps: [CryptoFunctionService, LogService, LOG_MAC_FAILURES],
    },
    {
      provide: EventService,
      useClass: EventServiceImpl,
      deps: [ApiService, CipherService, StateService, LogService, OrganizationService],
    },
    {
      provide: PolicyService,
      useClass: PolicyServiceImpl,
      deps: [StateService, OrganizationService],
    },
    {
      provide: InternalPolicyService,
      useExisting: PolicyService,
    },
    {
      provide: PolicyApiServiceAbstraction,
      useClass: PolicyApiServiceImpl,
      deps: [PolicyService, ApiService, StateService, OrganizationService],
    },
    {
      provide: SendService,
      useClass: SendServiceImpl,
      deps: [
        CryptoService,
        ApiService,
        FileUploadService,
        I18nService,
        CryptoFunctionService,
        StateService,
      ],
    },
    {
      provide: KeyConnectorService,
      useClass: KeyConnectorServiceImpl,
      deps: [
        StateService,
        CryptoService,
        ApiService,
        TokenService,
        LogService,
        OrganizationService,
        CryptoFunctionService,
        LOGOUT_CALLBACK,
      ],
    },
    {
      provide: UserVerificationService,
      useClass: UserVerificationServiceImpl,
      deps: [CryptoService, I18nService, UserVerificationApiServiceAbstraction],
    },
    { provide: PasswordRepromptService, useClass: PasswordRepromptServiceImpl },
    {
      provide: OrganizationService,
      useClass: OrganizationServiceImpl,
      deps: [StateService, SyncNotifierService],
    },
    {
      provide: ProviderService,
      useClass: ProviderServiceImpl,
      deps: [StateService],
    },
    {
      provide: TwoFactorService,
      useClass: TwoFactorServiceImpl,
      deps: [I18nService, PlatformUtilsService],
    },
    {
      provide: AbstractThemingService,
      useClass: ThemingServiceImpl,
    },
    {
      provide: FormValidationErrorsService,
      useClass: FormValidationErrorsServiceImpl,
    },
    {
      provide: UserVerificationApiServiceAbstraction,
      useClass: UserVerificationApiServiceImpl,
      deps: [ApiService],
    },
    {
      provide: OrganizationApiServiceAbstraction,
      useClass: OrganizationApiServiceImpl,
      // This is a slightly odd dependency tree for a specialized api service
      // it depends on SyncService so that new data can be retrieved through the sync
      // rather than updating the OrganizationService directly. Instead OrganizationService
      // subscribes to sync notifications and will update itself based on that.
      deps: [ApiService, SyncService],
    },
    {
      provide: SyncNotifierService,
      useClass: SyncNotifierServiceImpl,
    },
    {
      provide: ConfigServiceAbstraction,
      useClass: ConfigServiceImpl,
      deps: [StateService, ConfigApiServiceAbstraction],
    },
    {
      provide: ConfigApiServiceAbstraction,
      useClass: ConfigApiServiceImpl,
      deps: [ApiService],
    },
    {
      provide: AnonymousHubService,
      useClass: AnonymousHubServiceImpl,
      deps: [EnvironmentService, AuthService, LogService],
    },
    {
      provide: ValidationService,
      useClass: ValidationServiceImpl,
      deps: [I18nService, PlatformUtilsService],
    },
    {
      provide: LoginService,
      useClass: LoginServiceImpl,
    },
  ],
})
export class JslibServicesModule {}

function encryptServiceFactory(
  cryptoFunctionservice: CryptoFunctionService,
  logService: LogService,
  logMacFailures: boolean
): EncryptService {
  return flagEnabled("multithreadDecryption")
    ? new MultithreadEncryptServiceImpl(cryptoFunctionservice, logService, logMacFailures)
    : new EncryptServiceImpl(cryptoFunctionservice, logService, logMacFailures);
}
