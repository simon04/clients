import { SettingsService } from "@bitwarden/common/abstractions/settings.service";
import { SettingsServiceImpl } from "@bitwarden/common/services/settings.service.impl";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";

type SettingsServiceFactoryOptions = FactoryOptions;

export type SettingsServiceInitOptions = SettingsServiceFactoryOptions & StateServiceInitOptions;

export function settingsServiceFactory(
  cache: { settingsService?: SettingsService } & CachedServices,
  opts: SettingsServiceInitOptions
): Promise<SettingsService> {
  return factory(
    cache,
    "settingsService",
    opts,
    async () => new SettingsServiceImpl(await stateServiceFactory(cache, opts))
  );
}
