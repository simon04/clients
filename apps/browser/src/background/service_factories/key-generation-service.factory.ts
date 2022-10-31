import { KeyGenerationServiceImpl } from "../../services/key-generation.service.impl";

import {
  cryptoFunctionServiceFactory,
  CryptoFunctionServiceInitOptions,
} from "./crypto-function-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";

type KeyGenerationServiceFactoryOptions = FactoryOptions;

export type KeyGenerationServiceInitOptions = KeyGenerationServiceFactoryOptions &
  CryptoFunctionServiceInitOptions;

export function keyGenerationServiceFactory(
  cache: { keyGenerationService?: KeyGenerationServiceImpl } & CachedServices,
  opts: KeyGenerationServiceInitOptions
): Promise<KeyGenerationServiceImpl> {
  return factory(
    cache,
    "keyGenerationService",
    opts,
    async () => new KeyGenerationServiceImpl(await cryptoFunctionServiceFactory(cache, opts))
  );
}
