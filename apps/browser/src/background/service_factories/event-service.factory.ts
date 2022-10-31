import { EventService } from "@bitwarden/common/abstractions/event.service";
import { EventServiceImpl } from "@bitwarden/common/services/event.service.impl";

import { apiServiceFactory, ApiServiceInitOptions } from "./api-service.factory";
import { cipherServiceFactory, CipherServiceInitOptions } from "./cipher-service.factory";
import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";
import {
  organizationServiceFactory,
  OrganizationServiceInitOptions,
} from "./organization-service.factory";
import { stateServiceFactory, StateServiceInitOptions } from "./state-service.factory";

type EventServiceOptions = FactoryOptions;

export type EventServiceInitOptions = EventServiceOptions &
  ApiServiceInitOptions &
  CipherServiceInitOptions &
  StateServiceInitOptions &
  LogServiceInitOptions &
  OrganizationServiceInitOptions;

export function eventServiceFactory(
  cache: { eventService?: EventService } & CachedServices,
  opts: EventServiceInitOptions
): Promise<EventService> {
  return factory(
    cache,
    "eventService",
    opts,
    async () =>
      new EventServiceImpl(
        await apiServiceFactory(cache, opts),
        await cipherServiceFactory(cache, opts),
        await stateServiceFactory(cache, opts),
        await logServiceFactory(cache, opts),
        await organizationServiceFactory(cache, opts)
      )
  );
}
