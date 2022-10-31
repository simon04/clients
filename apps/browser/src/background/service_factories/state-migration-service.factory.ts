import { StateFactory } from "@bitwarden/common/factories/stateFactory";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { StateMigrationServiceImpl } from "@bitwarden/common/services/state-migration.service.impl";

import { Account } from "../../models/account";

import { CachedServices, factory, FactoryOptions } from "./factory-options";
import {
  diskStorageServiceFactory,
  DiskStorageServiceInitOptions,
  secureStorageServiceFactory,
  SecureStorageServiceInitOptions,
} from "./storage-service.factory";

type StateMigrationServiceFactoryOptions = FactoryOptions & {
  stateMigrationServiceOptions: {
    stateFactory: StateFactory<GlobalState, Account>;
  };
};

export type StateMigrationServiceInitOptions = StateMigrationServiceFactoryOptions &
  DiskStorageServiceInitOptions &
  SecureStorageServiceInitOptions;

export function stateMigrationServiceFactory(
  cache: { stateMigrationService?: StateMigrationServiceImpl } & CachedServices,
  opts: StateMigrationServiceInitOptions
): Promise<StateMigrationServiceImpl> {
  return factory(
    cache,
    "stateMigrationService",
    opts,
    async () =>
      new StateMigrationServiceImpl(
        await diskStorageServiceFactory(cache, opts),
        await secureStorageServiceFactory(cache, opts),
        opts.stateMigrationServiceOptions.stateFactory
      )
  );
}
