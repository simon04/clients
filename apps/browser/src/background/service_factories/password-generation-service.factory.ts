import { PasswordGenerationService } from "@bitwarden/common/abstractions/passwordGeneration.service";
import { PasswordGenerationServiceImpl } from "@bitwarden/common/services/password-generation.service.impl";

import { cryptoServiceFactory, CryptoServiceInitOptions } from "./crypto-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { policyServiceFactory, PolicyServiceInitOptions } from "./policy-service.factory";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";

type PasswordGenerationServiceFactoryOptions = FactoryOptions;

export type PasswordGenerationServiceInitOptions = PasswordGenerationServiceFactoryOptions &
  CryptoServiceInitOptions &
  PolicyServiceInitOptions &
  StateServiceInitOptions;

export function passwordGenerationServiceFactory(
  cache: { passwordGenerationService?: PasswordGenerationService } & CachedServices,
  opts: PasswordGenerationServiceInitOptions
): Promise<PasswordGenerationService> {
  return factory(
    cache,
    "passwordGenerationService",
    opts,
    async () =>
      new PasswordGenerationServiceImpl(
        await cryptoServiceFactory(cache, opts),
        await policyServiceFactory(cache, opts),
        await stateServiceFactory(cache, opts)
      )
  );
}
