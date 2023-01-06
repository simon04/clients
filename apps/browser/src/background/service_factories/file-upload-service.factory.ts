import { FileUploadService as AbstractFileUploadService } from "@bitwarden/common/abstractions/fileUpload.service";
import { SendFileUploadService } from "@bitwarden/common/services/send/send-file-upload.service";

import { FactoryOptions, CachedServices, factory } from "./factory-options";
import { logServiceFactory, LogServiceInitOptions } from "./log-service.factory";

type SendFileUploadServiceFactoyOptions = FactoryOptions;

export type SendFileUploadServiceInitOptions = SendFileUploadServiceFactoyOptions &
  LogServiceInitOptions;

export function fileUploadServiceFactory(
  cache: { fileUploadService?: AbstractFileUploadService } & CachedServices,
  opts: SendFileUploadServiceInitOptions
): Promise<AbstractFileUploadService> {
  return factory(
    cache,
    "fileUploadService",
    opts,
    async () => new SendFileUploadService(await logServiceFactory(cache, opts))
  );
}
