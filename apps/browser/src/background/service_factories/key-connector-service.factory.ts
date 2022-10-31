import { KeyConnectorService } from "@bitwarden/common/abstractions/keyConnector.service";
import { KeyConnectorServiceImpl } from "@bitwarden/common/services/key-connector.service.impl";

import { apiServiceFactory, ApiServiceInitOptions } from "./api-service.factory";
import {
  cryptoFunctionServiceFactory,
  CryptoFunctionServiceInitOptions,
} from "./crypto-function-service.factory";
import { CryptoServiceInitOptions, cryptoServiceFactory } from "./crypto-service.factory";
import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";
import {
  OrganizationServiceInitOptions,
  organizationServiceFactory,
} from "./organization-service.factory";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";
import { tokenServiceFactory, TokenServiceInitOptions } from "./token-service.factory";

type KeyConnectorServiceFactoryOptions = FactoryOptions & {
  keyConnectorServiceOptions: {
    logoutCallback: (expired: boolean, userId?: string) => Promise<void>;
  };
};

export type KeyConnectorServiceInitOptions = KeyConnectorServiceFactoryOptions &
  StateServiceInitOptions &
  CryptoServiceInitOptions &
  ApiServiceInitOptions &
  TokenServiceInitOptions &
  LogServiceInitOptions &
  OrganizationServiceInitOptions &
  CryptoFunctionServiceInitOptions;

export function keyConnectorServiceFactory(
  cache: { keyConnectorService?: KeyConnectorService } & CachedServices,
  opts: KeyConnectorServiceInitOptions
): Promise<KeyConnectorService> {
  return factory(
    cache,
    "keyConnectorService",
    opts,
    async () =>
      new KeyConnectorServiceImpl(
        await stateServiceFactory(cache, opts),
        await cryptoServiceFactory(cache, opts),
        await apiServiceFactory(cache, opts),
        await tokenServiceFactory(cache, opts),
        await logServiceFactory(cache, opts),
        await organizationServiceFactory(cache, opts),
        await cryptoFunctionServiceFactory(cache, opts),
        opts.keyConnectorServiceOptions.logoutCallback
      )
  );
}
