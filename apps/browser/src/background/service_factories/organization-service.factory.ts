import { OrganizationService } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";
import { OrganizationServiceImpl } from "@bitwarden/common/services/organization/organization.service.impl";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";
import {
  syncNotifierServiceFactory,
  SyncNotifierServiceInitOptions,
} from "./sync-notifier-service.factory";

type OrganizationServiceFactoryOptions = FactoryOptions;

export type OrganizationServiceInitOptions = OrganizationServiceFactoryOptions &
  SyncNotifierServiceInitOptions &
  StateServiceInitOptions;

export function organizationServiceFactory(
  cache: { organizationService?: OrganizationService } & CachedServices,
  opts: OrganizationServiceInitOptions
): Promise<OrganizationService> {
  return factory(
    cache,
    "organizationService",
    opts,
    async () =>
      new OrganizationServiceImpl(
        await stateServiceFactory(cache, opts),
        await syncNotifierServiceFactory(cache, opts)
      )
  );
}
