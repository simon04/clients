import { StateService } from "@bitwarden/common/abstractions/state.service";
import { GlobalState } from "@bitwarden/common/models/domain/global-state";
import { StateServiceImpl } from "@bitwarden/common/services/state.service.impl";

import { Account } from "../models/account";

export class DesktopStateService
  extends StateServiceImpl<GlobalState, Account>
  implements StateService
{
  async addAccount(account: Account) {
    // Apply desktop overides to default account values
    account = new Account(account);
    await super.addAccount(account);
  }
}
