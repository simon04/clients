import { TotpService } from "@bitwarden/common/abstractions/totp.service";
import { TotpServiceImpl } from "@bitwarden/common/services/totp.service.impl";

import {
  cryptoFunctionServiceFactory,
  CryptoFunctionServiceInitOptions,
} from "./crypto-function-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";

type TotpServiceOptions = FactoryOptions;

export type TotpServiceInitOptions = TotpServiceOptions &
  CryptoFunctionServiceInitOptions &
  LogServiceInitOptions;

export function totpServiceFactory(
  cache: { totpService?: TotpService } & CachedServices,
  opts: TotpServiceInitOptions
): Promise<TotpService> {
  return factory(
    cache,
    "totpService",
    opts,
    async () =>
      new TotpServiceImpl(
        await cryptoFunctionServiceFactory(cache, opts),
        await logServiceFactory(cache, opts)
      )
  );
}
