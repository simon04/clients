import { VaultTimeoutSettingsService } from "@bitwarden/common/abstractions/vaultTimeout/vaultTimeoutSettings.service";
import { VaultTimeoutSettingsServiceImpl } from "@bitwarden/common/services/vault-timeout/vault-timeout-settings.service.impl";

import { cryptoServiceFactory, CryptoServiceInitOptions } from "./crypto-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { policyServiceFactory, PolicyServiceInitOptions } from "./policy-service.factory";
import {
  stateServiceFactory as stateServiceFactory,
  StateServiceInitOptions,
} from "./state-service.factory";
import { tokenServiceFactory, TokenServiceInitOptions } from "./token-service.factory";

type VaultTimeoutSettingsServiceFactoryOptions = FactoryOptions;

export type VaultTimeoutSettingsServiceInitOptions = VaultTimeoutSettingsServiceFactoryOptions &
  CryptoServiceInitOptions &
  TokenServiceInitOptions &
  PolicyServiceInitOptions &
  StateServiceInitOptions;

export function vaultTimeoutSettingsServiceFactory(
  cache: { vaultTimeoutSettingsService?: VaultTimeoutSettingsService } & CachedServices,
  opts: VaultTimeoutSettingsServiceInitOptions
): Promise<VaultTimeoutSettingsService> {
  return factory(
    cache,
    "vaultTimeoutSettingsService",
    opts,
    async () =>
      new VaultTimeoutSettingsServiceImpl(
        await cryptoServiceFactory(cache, opts),
        await tokenServiceFactory(cache, opts),
        await policyServiceFactory(cache, opts),
        await stateServiceFactory(cache, opts)
      )
  );
}
