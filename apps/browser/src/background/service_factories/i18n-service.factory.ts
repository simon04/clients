import { I18nService as AbstractI18nService } from "@bitwarden/common/abstractions/i18n.service";
import { I18nServiceImpl } from "@bitwarden/common/services/i18n.service.impl";

import BrowserI18nService from "../../services/browser-i18n.service";

import { FactoryOptions, CachedServices, factory } from "./factory-options";

type I18nServiceFactoryOptions = FactoryOptions & {
  i18nServiceOptions: {
    systemLanguage: string;
  };
};

export type I18nServiceInitOptions = I18nServiceFactoryOptions;

export async function i18nServiceFactory(
  cache: { i18nService?: AbstractI18nService } & CachedServices,
  opts: I18nServiceInitOptions
): Promise<AbstractI18nService> {
  const service = await factory(
    cache,
    "i18nService",
    opts,
    () => new BrowserI18nService(opts.i18nServiceOptions.systemLanguage)
  );
  if (!(service as I18nServiceImpl as any).inited) {
    await (service as I18nServiceImpl).init();
  }
  return service;
}
