import { NgModule } from "@angular/core";

import { LooseComponentsModule, SharedModule } from "../../shared";

import { AdjustSubscription } from "./adjust-subscription.component";
import { BillingSyncApiKeyComponent } from "./billing-sync-api-key.component";
import { ChangePlanComponent } from "./change-plan.component";
import { DownloadLicenseComponent } from "./download-license.component";
import { OrgBillingHistoryViewComponent } from "./organization-billing-history-view.component";
import { OrganizationBillingRoutingModule } from "./organization-billing-routing.module";
import { OrganizationBillingTabComponent } from "./organization-billing-tab.component";
import { OrganizationSubscriptionSelfhostComponent } from "./organization-subscription-selfhost.component";
import { OrganizationSubscriptionComponent } from "./organization-subscription.component";

@NgModule({
  imports: [SharedModule, LooseComponentsModule, OrganizationBillingRoutingModule],
  declarations: [
    AdjustSubscription,
    BillingSyncApiKeyComponent,
    ChangePlanComponent,
    DownloadLicenseComponent,
    OrganizationBillingTabComponent,
    OrganizationSubscriptionComponent,
    OrgBillingHistoryViewComponent,
    OrganizationSubscriptionSelfhostComponent,
  ],
})
export class OrganizationBillingModule {}
