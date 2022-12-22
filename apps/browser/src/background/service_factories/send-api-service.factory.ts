import { SendApiService as SendApiServiceAbstraction } from "@bitwarden/common/abstractions/send/send-api.service.abstraction";
import { SendApiService } from "@bitwarden/common/services/send/send-api.service";

import { apiServiceFactory, ApiServiceInitOptions } from "./api-service.factory";
import { CachedServices, factory, FactoryOptions } from "./factory-options";

type SendApiServiceFactoryOptions = FactoryOptions;

export type SearchServiceInitOptions = SendApiServiceFactoryOptions & ApiServiceInitOptions;

export function sendApiServiceFactory(
  cache: { searchService?: SendApiServiceAbstraction } & CachedServices,
  opts: SearchServiceInitOptions
): Promise<SendApiServiceAbstraction> {
  return factory(
    cache,
    "sendApiService",
    opts,
    async () => new SendApiService(await apiServiceFactory(cache, opts))
  );
}
