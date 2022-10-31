import { SyncNotifierService } from "@bitwarden/common/abstractions/sync/syncNotifier.service.abstraction";
import { SyncNotifierServiceImpl } from "@bitwarden/common/services/sync/sync-notifier.service.impl";

import { FactoryOptions, CachedServices, factory } from "./factory-options";

type SyncNotifierServiceFactoryOptions = FactoryOptions;

export type SyncNotifierServiceInitOptions = SyncNotifierServiceFactoryOptions;

export function syncNotifierServiceFactory(
  cache: { syncNotifierService?: SyncNotifierService } & CachedServices,
  opts: SyncNotifierServiceInitOptions
): Promise<SyncNotifierService> {
  return factory(cache, "syncNotifierService", opts, () =>
    Promise.resolve(new SyncNotifierServiceImpl())
  );
}
