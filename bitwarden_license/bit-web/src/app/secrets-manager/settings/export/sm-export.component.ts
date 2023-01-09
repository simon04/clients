import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject, switchMap, takeUntil } from "rxjs";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { OrganizationService } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { UserVerificationService } from "@bitwarden/common/abstractions/userVerification/userVerification.service.abstraction";
import { VerificationType } from "@bitwarden/common/enums/verificationType";

import { SMSettingsService } from "../sm-settings.service";

@Component({
  selector: "sm-export",
  templateUrl: "./sm-export.component.html",
})
export class SMExportComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  protected orgName: string;
  protected exportFormats: string[] = ["json"];

  protected formGroup = new FormGroup({
    format: new FormControl("json", [Validators.required]),
    masterPassword: new FormControl("", [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private i18nService: I18nService,
    private settingsService: SMSettingsService,
    private organizationService: OrganizationService,
    private userVerificationService: UserVerificationService,
    private platformUtilsService: PlatformUtilsService
  ) {}

  async ngOnInit() {
    this.route.params
      .pipe(
        switchMap(async (params) => await this.organizationService.get(params.organizationId)),
        takeUntil(this.destroy$)
      )
      .subscribe((organization) => {
        this.orgName = organization.name;
      });

    this.formGroup.get("format").disable();
  }

  async ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit = async () => {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    try {
      // Incorrect secret will throw an invalid password error.
      await this.userVerificationService.verifyUser({
        type: VerificationType.MasterPassword,
        secret: this.formGroup.get("masterPassword").value,
      });
    } catch (e) {
      this.platformUtilsService.showToast(
        "error",
        this.i18nService.t("error"),
        this.i18nService.t("invalidMasterPassword")
      );
      return;
    }

    // Do API call, user is verified
    alert("submitted");
  };
}
