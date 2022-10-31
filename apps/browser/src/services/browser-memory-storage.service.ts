import AbstractChromeStorageService from "./abstract-chrome-storage-api.service";

export default class BrowserMemoryStorageService extends AbstractChromeStorageService {
  protected chromeStorageApi = chrome.storage.session;
}
