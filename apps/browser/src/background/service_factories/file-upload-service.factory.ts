import { FileUploadService } from "@bitwarden/common/abstractions/fileUpload.service";
import { FileUploadServiceImpl } from "@bitwarden/common/services/file-upload.service.impl";

import { apiServiceFactory, ApiServiceInitOptions } from "./api-service.factory";
import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";

type FileUploadServiceFactoyOptions = FactoryOptions;

export type FileUploadServiceInitOptions = FileUploadServiceFactoyOptions &
  LogServiceInitOptions &
  ApiServiceInitOptions;

export function fileUploadServiceFactory(
  cache: { fileUploadService?: FileUploadService } & CachedServices,
  opts: FileUploadServiceInitOptions
): Promise<FileUploadService> {
  return factory(
    cache,
    "fileUploadService",
    opts,
    async () =>
      new FileUploadServiceImpl(
        await logServiceFactory(cache, opts),
        await apiServiceFactory(cache, opts)
      )
  );
}
