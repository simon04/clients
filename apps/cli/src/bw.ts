import * as fs from "fs";
import * as path from "path";

import * as program from "commander";
import * as jsdom from "jsdom";

import { InternalFolderService } from "@bitwarden/common/abstractions/folder/folder.service.abstraction";
import { OrganizationApiServiceAbstraction } from "@bitwarden/common/abstractions/organization/organization-api.service.abstraction";
import { ClientType } from "@bitwarden/common/enums/clientType";
import { KeySuffixOptions } from "@bitwarden/common/enums/keySuffixOptions";
import { LogLevelType } from "@bitwarden/common/enums/logLevelType";
import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { Account } from "@bitwarden/common/models/domain/account";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { AppIdServiceImpl } from "@bitwarden/common/services/app-id.service.impl";
import { AuditServiceImpl } from "@bitwarden/common/services/audit.service.impl";
import { AuthServiceImpl } from "@bitwarden/common/services/auth.service.impl";
import { BroadcasterServiceImpl } from "@bitwarden/common/services/broadcaster.service.impl";
import { CipherServiceImpl } from "@bitwarden/common/services/cipher.service.impl";
import { CollectionServiceImpl } from "@bitwarden/common/services/collection.service.impl";
import { ContainerService } from "@bitwarden/common/services/container.service";
import { CryptoServiceImpl } from "@bitwarden/common/services/crypto.service.impl";
import { EncryptServiceImpl } from "@bitwarden/common/services/cryptography/encrypt.service.impl";
import { EnvironmentServiceImpl } from "@bitwarden/common/services/environment.service.impl";
import { ExportServiceImpl } from "@bitwarden/common/services/export.service.impl";
import { FileUploadServiceImpl } from "@bitwarden/common/services/file-upload.service.impl";
import { FolderApiServiceImpl } from "@bitwarden/common/services/folder/folder-api.service.impl";
import { FolderServiceImpl } from "@bitwarden/common/services/folder/folder.service.impl";
import { ImportServiceImpl } from "@bitwarden/common/services/import.service.impl";
import { KeyConnectorServiceImpl } from "@bitwarden/common/services/key-connector.service.impl";
import { MemoryStorageService } from "@bitwarden/common/services/memory-storage.service";
import { NoopMessagingService } from "@bitwarden/common/services/noop-messaging.service";
import { OrganizationApiServiceImpl } from "@bitwarden/common/services/organization/organization-api.service.impl";
import { OrganizationServiceImpl } from "@bitwarden/common/services/organization/organization.service.impl";
import { PasswordGenerationServiceImpl } from "@bitwarden/common/services/password-generation.service.impl";
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
import { VaultTimeoutSettingsServiceImpl } from "@bitwarden/common/services/vault-timeout/vault-timeout-settings.service.impl";
import { VaultTimeoutServiceImpl } from "@bitwarden/common/services/vault-timeout/vault-timeout.service.impl";
import { CliPlatformUtilsService } from "@bitwarden/node/cli/services/cli-platform-utils.service";
import { NodeConsoleLogService } from "@bitwarden/node/cli/services/node-console-log.service";
import { NodeApiService } from "@bitwarden/node/services/node-api.service";
import { NodeCryptoFunctionService } from "@bitwarden/node/services/node-crypto-function.service";

import { Program } from "./program";
import { SendProgram } from "./send.program";
import { CliI18nService } from "./services/cli-i18n.service";
import { CliLowdbStorageService } from "./services/cli-lowdb-storage.service";
import { NodeEnvSecureStorageService } from "./services/node-env-secure-storage.service";
import { VaultProgram } from "./vault.program";

// Polyfills
global.DOMParser = new jsdom.JSDOM().window.DOMParser;

// eslint-disable-next-line
const packageJson = require("../package.json");

export class Main {
  messagingService: NoopMessagingService;
  storageService: CliLowdbStorageService;
  secureStorageService: NodeEnvSecureStorageService;
  memoryStorageService: MemoryStorageService;
  i18nService: CliI18nService;
  platformUtilsService: CliPlatformUtilsService;
  cryptoService: CryptoServiceImpl;
  tokenService: TokenServiceImpl;
  appIdService: AppIdServiceImpl;
  apiService: NodeApiService;
  environmentService: EnvironmentServiceImpl;
  settingsService: SettingsServiceImpl;
  cipherService: CipherServiceImpl;
  folderService: InternalFolderService;
  collectionService: CollectionServiceImpl;
  vaultTimeoutService: VaultTimeoutServiceImpl;
  vaultTimeoutSettingsService: VaultTimeoutSettingsServiceImpl;
  syncService: SyncServiceImpl;
  passwordGenerationService: PasswordGenerationServiceImpl;
  totpService: TotpServiceImpl;
  containerService: ContainerService;
  auditService: AuditServiceImpl;
  importService: ImportServiceImpl;
  exportService: ExportServiceImpl;
  searchService: SearchServiceImpl;
  cryptoFunctionService: NodeCryptoFunctionService;
  encryptService: EncryptServiceImpl;
  authService: AuthServiceImpl;
  policyService: PolicyServiceImpl;
  program: Program;
  vaultProgram: VaultProgram;
  sendProgram: SendProgram;
  logService: NodeConsoleLogService;
  sendService: SendServiceImpl;
  fileUploadService: FileUploadServiceImpl;
  keyConnectorService: KeyConnectorServiceImpl;
  userVerificationService: UserVerificationServiceImpl;
  stateService: StateServiceImpl;
  stateMigrationService: StateMigrationServiceImpl;
  organizationService: OrganizationServiceImpl;
  providerService: ProviderServiceImpl;
  twoFactorService: TwoFactorServiceImpl;
  broadcasterService: BroadcasterServiceImpl;
  folderApiService: FolderApiServiceImpl;
  userVerificationApiService: UserVerificationApiServiceImpl;
  organizationApiService: OrganizationApiServiceAbstraction;
  syncNotifierService: SyncNotifierServiceImpl;

  constructor() {
    let p = null;
    const relativeDataDir = path.join(path.dirname(process.execPath), "bw-data");
    if (fs.existsSync(relativeDataDir)) {
      p = relativeDataDir;
    } else if (process.env.BITWARDENCLI_APPDATA_DIR) {
      p = path.resolve(process.env.BITWARDENCLI_APPDATA_DIR);
    } else if (process.platform === "darwin") {
      p = path.join(process.env.HOME, "Library/Application Support/Bitwarden CLI");
    } else if (process.platform === "win32") {
      p = path.join(process.env.APPDATA, "Bitwarden CLI");
    } else if (process.env.XDG_CONFIG_HOME) {
      p = path.join(process.env.XDG_CONFIG_HOME, "Bitwarden CLI");
    } else {
      p = path.join(process.env.HOME, ".config/Bitwarden CLI");
    }

    this.i18nService = new CliI18nService("en", "./locales");
    this.platformUtilsService = new CliPlatformUtilsService(ClientType.Cli, packageJson);
    this.logService = new NodeConsoleLogService(
      this.platformUtilsService.isDev(),
      (level) => process.env.BITWARDENCLI_DEBUG !== "true" && level <= LogLevelType.Info
    );
    this.cryptoFunctionService = new NodeCryptoFunctionService();
    this.encryptService = new EncryptServiceImpl(this.cryptoFunctionService, this.logService, true);
    this.storageService = new CliLowdbStorageService(this.logService, null, p, false, true);
    this.secureStorageService = new NodeEnvSecureStorageService(
      this.storageService,
      this.logService,
      () => this.cryptoService
    );

    this.memoryStorageService = new MemoryStorageService();

    this.stateMigrationService = new StateMigrationServiceImpl(
      this.storageService,
      this.secureStorageService,
      new StateFactory(GlobalState, Account)
    );

    this.stateService = new StateServiceImpl(
      this.storageService,
      this.secureStorageService,
      this.memoryStorageService,
      this.logService,
      this.stateMigrationService,
      new StateFactory(GlobalState, Account)
    );

    this.cryptoService = new CryptoServiceImpl(
      this.cryptoFunctionService,
      this.encryptService,
      this.platformUtilsService,
      this.logService,
      this.stateService
    );

    this.appIdService = new AppIdServiceImpl(this.storageService);
    this.tokenService = new TokenServiceImpl(this.stateService);
    this.messagingService = new NoopMessagingService();
    this.environmentService = new EnvironmentServiceImpl(this.stateService);

    const customUserAgent =
      "Bitwarden_CLI/" +
      this.platformUtilsService.getApplicationVersionSync() +
      " (" +
      this.platformUtilsService.getDeviceString().toUpperCase() +
      ")";
    this.apiService = new NodeApiService(
      this.tokenService,
      this.platformUtilsService,
      this.environmentService,
      this.appIdService,
      async (expired: boolean) => await this.logout(),
      customUserAgent
    );

    this.syncNotifierService = new SyncNotifierServiceImpl();

    this.organizationApiService = new OrganizationApiServiceImpl(this.apiService, this.syncService);

    this.containerService = new ContainerService(this.cryptoService, this.encryptService);

    this.settingsService = new SettingsServiceImpl(this.stateService);

    this.fileUploadService = new FileUploadServiceImpl(this.logService, this.apiService);

    this.cipherService = new CipherServiceImpl(
      this.cryptoService,
      this.settingsService,
      this.apiService,
      this.fileUploadService,
      this.i18nService,
      null,
      this.logService,
      this.stateService,
      this.encryptService
    );

    this.broadcasterService = new BroadcasterServiceImpl();

    this.folderService = new FolderServiceImpl(
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

    this.providerService = new ProviderServiceImpl(this.stateService);

    this.organizationService = new OrganizationServiceImpl(
      this.stateService,
      this.syncNotifierService
    );

    this.policyService = new PolicyServiceImpl(this.stateService, this.organizationService);

    this.sendService = new SendServiceImpl(
      this.cryptoService,
      this.apiService,
      this.fileUploadService,
      this.i18nService,
      this.cryptoFunctionService,
      this.stateService
    );

    this.keyConnectorService = new KeyConnectorServiceImpl(
      this.stateService,
      this.cryptoService,
      this.apiService,
      this.tokenService,
      this.logService,
      this.organizationService,
      this.cryptoFunctionService,
      async (expired: boolean) => await this.logout()
    );

    this.twoFactorService = new TwoFactorServiceImpl(this.i18nService, this.platformUtilsService);

    this.authService = new AuthServiceImpl(
      this.cryptoService,
      this.apiService,
      this.tokenService,
      this.appIdService,
      this.platformUtilsService,
      this.messagingService,
      this.logService,
      this.keyConnectorService,
      this.environmentService,
      this.stateService,
      this.twoFactorService,
      this.i18nService
    );

    const lockedCallback = async () =>
      await this.cryptoService.clearStoredKey(KeySuffixOptions.Auto);

    this.vaultTimeoutSettingsService = new VaultTimeoutSettingsServiceImpl(
      this.cryptoService,
      this.tokenService,
      this.policyService,
      this.stateService
    );

    this.vaultTimeoutService = new VaultTimeoutServiceImpl(
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
      null
    );

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
      async (expired: boolean) => await this.logout()
    );

    this.passwordGenerationService = new PasswordGenerationServiceImpl(
      this.cryptoService,
      this.policyService,
      this.stateService
    );

    this.totpService = new TotpServiceImpl(this.cryptoFunctionService, this.logService);

    this.importService = new ImportServiceImpl(
      this.cipherService,
      this.folderService,
      this.apiService,
      this.i18nService,
      this.collectionService,
      this.cryptoService
    );
    this.exportService = new ExportServiceImpl(
      this.folderService,
      this.cipherService,
      this.apiService,
      this.cryptoService,
      this.cryptoFunctionService
    );

    this.auditService = new AuditServiceImpl(this.cryptoFunctionService, this.apiService);
    this.program = new Program(this);
    this.vaultProgram = new VaultProgram(this);
    this.sendProgram = new SendProgram(this);

    this.userVerificationApiService = new UserVerificationApiServiceImpl(this.apiService);

    this.userVerificationService = new UserVerificationServiceImpl(
      this.cryptoService,
      this.i18nService,
      this.userVerificationApiService
    );
  }

  async run() {
    await this.init();

    await this.program.register();
    await this.vaultProgram.register();
    await this.sendProgram.register();

    program.parse(process.argv);

    if (process.argv.slice(2).length === 0) {
      program.outputHelp();
    }
  }

  async logout() {
    this.authService.logOut(() => {
      /* Do nothing */
    });
    const userId = await this.stateService.getUserId();
    await Promise.all([
      this.syncService.setLastSync(new Date(0)),
      this.cryptoService.clearKeys(),
      this.settingsService.clear(userId),
      this.cipherService.clear(userId),
      this.folderService.clear(userId),
      this.collectionService.clear(userId),
      this.policyService.clear(userId),
      this.passwordGenerationService.clear(),
    ]);
    await this.stateService.clean();
    process.env.BW_SESSION = null;
  }

  private async init() {
    await this.storageService.init();
    await this.stateService.init();
    this.containerService.attachToGlobal(global);
    await this.environmentService.setUrlsFromStorage();
    const locale = await this.stateService.getLocale();
    await this.i18nService.init(locale);
    this.twoFactorService.init();

    const installedVersion = await this.stateService.getInstalledVersion();
    const currentVersion = await this.platformUtilsService.getApplicationVersion();
    if (installedVersion == null || installedVersion !== currentVersion) {
      await this.stateService.setInstalledVersion(currentVersion);
    }
  }
}

const main = new Main();
main.run();
