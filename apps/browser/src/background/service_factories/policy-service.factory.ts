import { PolicyService } from "@bitwarden/common/abstractions/policy/policy.service.abstraction";
import { PolicyServiceImpl } from "@bitwarden/common/services/policy/policy.service.impl";

import { CachedServices, factory, FactoryOptions } from "./factory-options";
import {
  organizationServiceFactory,
  OrganizationServiceInitOptions,
} from "./organization-service.factory";
import {
  stateServiceFactory as stateServiceFactory,
  StateServiceInitOptions,
} from "./state-service.factory";

type PolicyServiceFactoryOptions = FactoryOptions;

export type PolicyServiceInitOptions = PolicyServiceFactoryOptions &
  StateServiceInitOptions &
  OrganizationServiceInitOptions;

export function policyServiceFactory(
  cache: { policyService?: PolicyService } & CachedServices,
  opts: PolicyServiceInitOptions
): Promise<PolicyService> {
  return factory(
    cache,
    "policyService",
    opts,
    async () =>
      new PolicyServiceImpl(
        await stateServiceFactory(cache, opts),
        await organizationServiceFactory(cache, opts)
      )
  );
}
