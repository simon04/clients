import { EncryptServiceImpl } from "@bitwarden/common/services/cryptography/encrypt.service.impl";
import { MultithreadEncryptServiceImpl } from "@bitwarden/common/services/cryptography/multithread-encrypt.service.impl";

import { flagEnabled } from "../../flags";

import {
  cryptoFunctionServiceFactory,
  CryptoFunctionServiceInitOptions,
} from "./crypto-function-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { LogServiceInitOptions, logServiceFactory } from "./log-service.factory";

type EncryptServiceFactoryOptions = FactoryOptions & {
  encryptServiceOptions: {
    logMacFailures: boolean;
  };
};

export type EncryptServiceInitOptions = EncryptServiceFactoryOptions &
  CryptoFunctionServiceInitOptions &
  LogServiceInitOptions;

export function encryptServiceFactory(
  cache: { encryptService?: EncryptServiceImpl } & CachedServices,
  opts: EncryptServiceInitOptions
): Promise<EncryptServiceImpl> {
  return factory(cache, "encryptService", opts, async () =>
    flagEnabled("multithreadDecryption")
      ? new MultithreadEncryptServiceImpl(
          await cryptoFunctionServiceFactory(cache, opts),
          await logServiceFactory(cache, opts),
          opts.encryptServiceOptions.logMacFailures
        )
      : new EncryptServiceImpl(
          await cryptoFunctionServiceFactory(cache, opts),
          await logServiceFactory(cache, opts),
          opts.encryptServiceOptions.logMacFailures
        )
  );
}
