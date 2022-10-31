import { SearchService } from "@bitwarden/common/abstractions/search.service";
import { SearchServiceImpl } from "@bitwarden/common/services/search.service.impl";

import { cipherServiceFactory, CipherServiceInitOptions } from "./cipher-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";
import { i18nServiceFactory, I18nServiceInitOptions } from "./i18n-service.factory";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";

type SearchServiceFactoryOptions = FactoryOptions;

export type SearchServiceInitOptions = SearchServiceFactoryOptions &
  CipherServiceInitOptions &
  LogServiceInitOptions &
  I18nServiceInitOptions;

export function searchServiceFactory(
  cache: { searchService?: SearchService } & CachedServices,
  opts: SearchServiceInitOptions
): Promise<SearchService> {
  return factory(
    cache,
    "searchService",
    opts,
    async () =>
      new SearchServiceImpl(
        await cipherServiceFactory(cache, opts),
        await logServiceFactory(cache, opts),
        await i18nServiceFactory(cache, opts)
      )
  );
}
