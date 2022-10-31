import { TwoFactorService } from "@bitwarden/common/abstractions/twoFactor.service";
import { TwoFactorServiceImpl } from "@bitwarden/common/services/two-factor.service.impl";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { I18nServiceInitOptions, i18nServiceFactory } from "./i18n-service.factory";
import {
  platformUtilsServiceFactory,
  PlatformUtilsServiceInitOptions,
} from "./platform-utils-service.factory";

type TwoFactorServiceFactoryOptions = FactoryOptions;

export type TwoFactorServiceInitOptions = TwoFactorServiceFactoryOptions &
  I18nServiceInitOptions &
  PlatformUtilsServiceInitOptions;

export async function twoFactorServiceFactory(
  cache: { twoFactorService?: TwoFactorService } & CachedServices,
  opts: TwoFactorServiceInitOptions
): Promise<TwoFactorService> {
  const service = await factory(
    cache,
    "twoFactorService",
    opts,
    async () =>
      new TwoFactorServiceImpl(
        await i18nServiceFactory(cache, opts),
        await platformUtilsServiceFactory(cache, opts)
      )
  );
  service.init();
  return service;
}
