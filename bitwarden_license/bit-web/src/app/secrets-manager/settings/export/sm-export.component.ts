import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject, switchMap, takeUntil } from "rxjs";

import { I18nService } from "@bitwarden/common/abstractions/i18n.service";
import { OrganizationService } from "@bitwarden/common/abstractions/organization/organization.service.abstraction";

import { SMSettingsService } from "../sm-settings.service";

@Component({
  selector: "sm-export",
  templateUrl: "./sm-export.component.html",
})
export class SMExportComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  protected orgName: string;
  protected formGroup = new FormGroup({
    format: new FormControl("", [Validators.required]),
  });

  constructor(
    private route: ActivatedRoute,
    private i18nService: I18nService,
    private settingsService: SMSettingsService,
    private organizationService: OrganizationService
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
  }

  async ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async submit() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }

    alert("submitted");
  }
}
