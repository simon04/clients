import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { concatMap, Subject, takeUntil } from "rxjs";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { OrganizationApiServiceAbstraction } from "@bitwarden/common/abstractions/organization/organization-api.service.abstraction";
import { OrganizationService } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { OrganizationApiKeyType } from "@bitwarden/common/enums/organizationApiKeyType";
import { Organization } from "@bitwarden/common/models/domain/organization";
import { OrganizationSubscriptionResponse } from "@bitwarden/common/models/response/organization-subscription.response";

import { SubscriptionHiddenIcon } from "./subscription-hidden.icon";

@Component({
  selector: "app-org-subscription",
  templateUrl: "organization-subscription.component.html",
})
export class OrganizationSubscriptionComponent implements OnInit, OnDestroy {
  loading = false;
  firstLoaded = false;
  organizationId: string;
  sub: OrganizationSubscriptionResponse;
  selfHosted = false;
  reinstatePromise: Promise<void>;
  hasBillingSyncToken: boolean;

  userOrg: Organization;

  subscriptionHiddenIcon = SubscriptionHiddenIcon;

  private destroy$ = new Subject<void>();

  constructor(
    private platformUtilsService: PlatformUtilsService,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private organizationApiService: OrganizationApiServiceAbstraction,
    private i18nService: I18nService,
    private logService: LogService
  ) {
    this.selfHosted = platformUtilsService.isSelfHost();
  }

  async ngOnInit() {
    this.route.params
      .pipe(
        concatMap(async (params) => {
          this.organizationId = params.organizationId;
          await this.load();
          this.firstLoaded = true;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async load() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.userOrg = this.organizationService.get(this.organizationId);
    if (this.userOrg.canManageBilling) {
      this.sub = await this.organizationApiService.getSubscription(this.organizationId);
    }
    const apiKeyResponse = await this.organizationApiService.getApiKeyInformation(
      this.organizationId
    );
    this.hasBillingSyncToken = apiKeyResponse.data.some(
      (i) => i.keyType === OrganizationApiKeyType.BillingSync
    );

    this.loading = false;
  }

  async reinstate() {
    if (this.loading) {
      return;
    }

    const confirmed = await this.platformUtilsService.showDialog(
      this.i18nService.t("reinstateConfirmation"),
      this.i18nService.t("reinstateSubscription"),
      this.i18nService.t("yes"),
      this.i18nService.t("cancel")
    );
    if (!confirmed) {
      return;
    }

    try {
      this.reinstatePromise = this.organizationApiService.reinstate(this.organizationId);
      await this.reinstatePromise;
      this.platformUtilsService.showToast("success", null, this.i18nService.t("reinstated"));
      this.load();
    } catch (e) {
      this.logService.error(e);
    }
  }

  get subscription() {
    return this.sub != null ? this.sub.subscription : null;
  }
}
