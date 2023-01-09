import { BrowserApi } from "../browser/browserApi";
import { ContextMenuClickedHandler } from "../browser/context-menu-clicked-handler";

import LockedVaultPendingNotificationsItem from "./models/lockedVaultPendingNotificationsItem";

export default class ContextMenusBackground {
  private contextMenus: typeof chrome.contextMenus;

  constructor(private contextMenuClickedHandler: ContextMenuClickedHandler) {
    this.contextMenus = chrome.contextMenus;
  }

  init() {
    if (!this.contextMenus) {
      return;
    }

    this.contextMenus.onClicked.addListener((info, tab) =>
      this.contextMenuClickedHandler.run(info, tab)
    );

    BrowserApi.messageListener(
      "contextmenus.background",
      async (
        msg: { command: string; data: LockedVaultPendingNotificationsItem },
        sender: chrome.runtime.MessageSender,
        sendResponse: any
      ) => {
        if (msg.command === "unlockCompleted" && msg.data.target === "contextmenus.background") {
          await this.contextMenuClickedHandler.cipherAction(
            msg.data.commandToRetry.msg.data,
            msg.data.commandToRetry.sender.tab
          );
        }
      }
    );
  }
}
