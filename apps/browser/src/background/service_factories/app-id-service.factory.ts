import { DiskStorageOptions } from "@koa/multer";

import { AppIdService as AbstractAppIdService } from "@bitwarden/common/abstractions/appId.service";
import { AppIdServiceImpl } from "@bitwarden/common/services/app-id.service.impl";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { diskStorageServiceFactory } from "./storage-service.factory";

type AppIdServiceFactoryOptions = FactoryOptions;

export type AppIdServiceInitOptions = AppIdServiceFactoryOptions & DiskStorageOptions;

export function appIdServiceFactory(
  cache: { appIdService?: AbstractAppIdService } & CachedServices,
  opts: AppIdServiceInitOptions
): Promise<AbstractAppIdService> {
  return factory(
    cache,
    "appIdService",
    opts,
    async () => new AppIdServiceImpl(await diskStorageServiceFactory(cache, opts))
  );
}
