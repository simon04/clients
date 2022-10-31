import { APP_INITIALIZER, InjectionToken, NgModule } from "@angular/core";

import {
  SECURE_STORAGE,
  STATE_FACTORY,
  STATE_SERVICE_USE_CACHE,
  CLIENT_TYPE,
  LOCALES_DIRECTORY,
  SYSTEM_LANGUAGE,
  MEMORY_STORAGE,
} from "@bitwarden/angular/services/injection-tokens";
import { JslibServicesModule } from "@bitwarden/angular/services/jslib-services.module";
import { AbstractThemingService } from "@bitwarden/angular/services/theming/theming.service.abstraction";
import { AuthService } from "@bitwarden/common/abstractions/auth.service";
import { BroadcasterService } from "@bitwarden/common/abstractions/broadcaster.service";
import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { CryptoService } from "@bitwarden/common/abstractions/crypto.service";
import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import { FileDownloadService } from "@bitwarden/common/abstractions/fileDownload/fileDownload.service";
import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { LoginService } from "@bitwarden/common/abstractions/login.service";
import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { PasswordGenerationService } from "@bitwarden/common/abstractions/passwordGeneration.service";
import { PasswordRepromptService } from "@bitwarden/common/abstractions/passwordReprompt.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { PolicyService } from "@bitwarden/common/abstractions/policy/policy.service.abstraction";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { StateMigrationService } from "@bitwarden/common/abstractions/stateMigration.service";
import { AbstractStorageService } from "@bitwarden/common/abstractions/storage.service";
import { SystemService } from "@bitwarden/common/abstractions/system.service";
import { ClientType } from "@bitwarden/common/enums/clientType";
import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { LoginServiceImpl } from "@bitwarden/common/services/login.service.impl";
import { MemoryStorageService } from "@bitwarden/common/services/memory-storage.service";
import { SystemServiceImpl } from "@bitwarden/common/services/system.service.impl";
import { ElectronCryptoService } from "@bitwarden/electron/services/electron-crypto.service";
import { ElectronLogService } from "@bitwarden/electron/services/electron-log.service";
import { ElectronPlatformUtilsService } from "@bitwarden/electron/services/electron-platform-utils.service";
import { ElectronRendererMessagingService } from "@bitwarden/electron/services/electron-renderer-messaging.service";
import { ElectronRendererSecureStorageService } from "@bitwarden/electron/services/electron-renderer-secure-storage.service";
import { ElectronRendererStorageService } from "@bitwarden/electron/services/electron-renderer-storage.service";

import { Account } from "../../models/account";
import { DesktopI18nService } from "../../services/desktop-i18n.service";
import { DesktopPasswordRepromptService } from "../../services/desktop-password-reprompt.service";
import { DesktopStateService } from "../../services/desktop-state.service";
import { EncryptedMessageHandlerService } from "../../services/encrypted-message-handler.service";
import { NativeMessageHandlerService } from "../../services/native-message-handler.service";
import { NativeMessagingService } from "../../services/native-messaging.service";
import { LoginGuard } from "../guards/login.guard";
import { SearchBarService } from "../layout/search/search-bar.service";

import { DesktopFileDownloadService } from "./desktop-file-download.service";
import { DesktopThemingService } from "./desktop-theming.service";
import { InitService } from "./init.service";

const RELOAD_CALLBACK = new InjectionToken<() => any>("RELOAD_CALLBACK");

@NgModule({
  imports: [JslibServicesModule],
  declarations: [],
  providers: [
    InitService,
    NativeMessagingService,
    SearchBarService,
    LoginGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: InitService) => initService.init(),
      deps: [InitService],
      multi: true,
    },
    {
      provide: STATE_FACTORY,
      useValue: new StateFactory(GlobalState, Account),
    },
    {
      provide: CLIENT_TYPE,
      useValue: ClientType.Desktop,
    },
    {
      provide: RELOAD_CALLBACK,
      useValue: null,
    },
    { provide: LogService, useClass: ElectronLogService, deps: [] },
    {
      provide: PlatformUtilsService,
      useClass: ElectronPlatformUtilsService,
      deps: [I18nService, MessagingService, CLIENT_TYPE, StateService],
    },
    {
      provide: I18nService,
      useClass: DesktopI18nService,
      deps: [SYSTEM_LANGUAGE, LOCALES_DIRECTORY],
    },
    {
      provide: MessagingService,
      useClass: ElectronRendererMessagingService,
      deps: [BroadcasterService],
    },
    { provide: AbstractStorageService, useClass: ElectronRendererStorageService },
    { provide: SECURE_STORAGE, useClass: ElectronRendererSecureStorageService },
    { provide: MEMORY_STORAGE, useClass: MemoryStorageService },
    {
      provide: CryptoService,
      useClass: ElectronCryptoService,
      deps: [CryptoFunctionService, EncryptService, PlatformUtilsService, LogService, StateService],
    },
    {
      provide: SystemService,
      useClass: SystemServiceImpl,
      deps: [MessagingService, PlatformUtilsService, RELOAD_CALLBACK, StateService],
    },
    { provide: PasswordRepromptService, useClass: DesktopPasswordRepromptService },
    {
      provide: StateService,
      useClass: DesktopStateService,
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
      provide: FileDownloadService,
      useClass: DesktopFileDownloadService,
    },
    {
      provide: AbstractThemingService,
      useClass: DesktopThemingService,
    },
    {
      provide: EncryptedMessageHandlerService,
      deps: [
        StateService,
        AuthService,
        CipherService,
        PolicyService,
        MessagingService,
        PasswordGenerationService,
      ],
    },
    {
      provide: NativeMessageHandlerService,
      deps: [
        StateService,
        CryptoService,
        CryptoFunctionService,
        MessagingService,
        I18nService,
        EncryptedMessageHandlerService,
      ],
    },
    {
      provide: LoginService,
      useClass: LoginServiceImpl,
    },
  ],
})
export class ServicesModule {}
