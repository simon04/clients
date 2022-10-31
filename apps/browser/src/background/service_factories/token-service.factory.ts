import { TokenService } from "@bitwarden/common/abstractions/token.service";
import { TokenServiceImpl } from "@bitwarden/common/services/token.service.impl";

import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";

type TokenServiceFactoryOptions = FactoryOptions;

export type TokenServiceInitOptions = TokenServiceFactoryOptions & StateServiceInitOptions;

export function tokenServiceFactory(
  cache: { tokenService?: TokenService } & CachedServices,
  opts: TokenServiceInitOptions
): Promise<TokenService> {
  return factory(
    cache,
    "tokenService",
    opts,
    async () => new TokenServiceImpl(await stateServiceFactory(cache, opts))
  );
}
