import { onAlarmListener } from "./alarms/on-alarm-listener";
import { registerAlarms } from "./alarms/register-alarms";
import MainBackground from "./background/main.background";
import { BrowserApi } from "./browser/browserApi";
import { CipherContextMenuHandler } from "./browser/cipher-context-menu-handler";
import { ContextMenuClickedHandler } from "./browser/context-menu-clicked-handler";
import { combine } from "./listeners/combine";
import { onCommandListener } from "./listeners/onCommandListener";
import { onInstallListener } from "./listeners/onInstallListener";
import { UpdateBadge } from "./listeners/update-badge";

if (BrowserApi.manifestVersion === 3) {
  chrome.commands.onCommand.addListener(onCommandListener);
  chrome.runtime.onInstalled.addListener(onInstallListener);
  chrome.alarms.onAlarm.addListener(onAlarmListener);
  registerAlarms();
  chrome.tabs.onActivated.addListener(
    combine([UpdateBadge.tabsOnActivatedListener, CipherContextMenuHandler.tabsOnActivatedListener])
  );
  chrome.tabs.onReplaced.addListener(
    combine([UpdateBadge.tabsOnReplacedListener, CipherContextMenuHandler.tabsOnReplacedListener])
  );
  chrome.tabs.onUpdated.addListener(
    combine([UpdateBadge.tabsOnUpdatedListener, CipherContextMenuHandler.tabsOnUpdatedListener])
  );
  chrome.contextMenus.onClicked.addListener(ContextMenuClickedHandler.onClickedListener);
  BrowserApi.messageListener(
    "runtime.background",
    combine([
      UpdateBadge.messageListener,
      CipherContextMenuHandler.messageListener,
      ContextMenuClickedHandler.messageListener,
    ])
  );
} else {
  const bitwardenMain = ((window as any).bitwardenMain = new MainBackground());
  bitwardenMain.bootstrap().then(() => {
    // Finished bootstrapping
  });
}
