import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { ModalService } from "@bitwarden/angular/services/modal.service";
import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { MessagingService } from "@bitwarden/common/abstractions/messaging.service";
import { OrganizationConnectionType } from "@bitwarden/common/enums/organizationConnectionType";
import { BillingSyncConfigApi } from "@bitwarden/common/models/api/billing-sync-config.api";
import { Organization } from "@bitwarden/common/models/domain/organization";
import { OrganizationConnectionResponse } from "@bitwarden/common/models/response/organization-connection.response";
import { OrganizationSubscriptionResponse } from "@bitwarden/common/models/response/organization-subscription.response";

import { BillingSyncKeyComponent } from "../../settings/billing-sync-key.component";

@Component({
  selector: "app-org-subscription-selfhost",
  templateUrl: "organization-subscription-selfhost.component.html",
})
export class OrganizationSubscriptionSelfhostComponent implements OnInit {
  @Input() sub: OrganizationSubscriptionResponse;
  @Input() organizationId: string;
  @Input() userOrg: Organization;
  @Output() reload = new EventEmitter();

  loading = false;
  showUpdateLicense = false;
  showBillingSyncKey = false;
  existingBillingSyncConnection: OrganizationConnectionResponse<BillingSyncConfigApi>;

  constructor(
    private modalService: ModalService,
    private messagingService: MessagingService,
    private apiService: ApiService
  ) {}

  get isExpired() {
    return (
      this.sub != null && this.sub.expiration != null && new Date(this.sub.expiration) < new Date()
    );
  }

  async ngOnInit() {
    this.showBillingSyncKey = await this.apiService.getCloudCommunicationsEnabled();

    if (this.showBillingSyncKey) {
      this.existingBillingSyncConnection = await this.apiService.getOrganizationConnection(
        this.organizationId,
        OrganizationConnectionType.CloudBillingSync,
        BillingSyncConfigApi
      );
    }
  }

  updateLicense() {
    if (this.loading) {
      return;
    }
    this.showUpdateLicense = true;
  }

  closeUpdateLicense(updated: boolean) {
    this.showUpdateLicense = false;
    if (updated) {
      this.reload.emit();
      this.messagingService.send("updatedOrgLicense");
    }
  }

  async manageBillingSyncSelfHosted() {
    await this.modalService.open(BillingSyncKeyComponent, {
      data: {
        entityId: this.organizationId,
        existingConnectionId: this.existingBillingSyncConnection?.id,
        billingSyncKey: this.existingBillingSyncConnection?.config?.billingSyncKey,
        setParentConnection: (connection: OrganizationConnectionResponse<BillingSyncConfigApi>) => {
          this.existingBillingSyncConnection = connection;
        },
      },
    });
  }

  get billingSyncSetUp() {
    return this.existingBillingSyncConnection?.id != null;
  }
}
