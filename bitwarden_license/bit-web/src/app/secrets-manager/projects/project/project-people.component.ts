import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subject, takeUntil } from "rxjs";

import { ApiService } from "@bitwarden/common/abstractions/api.service";
import { OrganizationUserService } from "@bitwarden/common/abstractions/organization-user/organization-user.service";
import { SelectItemView } from "@bitwarden/components/src/multi-select/models/select-item-view";

@Component({
  selector: "sm-project-people",
  templateUrl: "./project-people.component.html",
})
export class ProjectPeopleComponent implements OnInit, OnDestroy {
  formGroup = new FormGroup({
    multiSelect: new FormControl([], [Validators.required]),
  });
  loading = true;
  organizationId: string;
  projectId: string;
  baseItems: SelectItemView[];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private organizationUserService: OrganizationUserService,
    private apiService: ApiService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params: any) => {
      this.organizationId = params.organizationId;
      this.projectId = params.projectId;
    });
    await this.setMultiSelect(this.organizationId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit = async () => {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.invalid) {
      return;
    }
    // TODO call command to create access policies selected in the multi select form.
  };

  private async setMultiSelect(organizationId: string): Promise<void> {
    const orgUsers = await this.getUserDetails(organizationId);
    const orgGroups = await this.getGroupDetails(organizationId);
    this.baseItems = [...orgUsers, ...orgGroups];
    this.loading = false;
  }

  private async getUserDetails(organizationId: string): Promise<SelectItemView[]> {
    const users = await this.organizationUserService.getAllUsers(organizationId);
    return users.data.map((user) => {
      const selectItemView: SelectItemView = {
        icon: "bwi-user",
        id: user.id,
        labelName: user.name,
        listName: user.name + ` (${user.email})`,
      };
      return selectItemView;
    });
  }

  private async getGroupDetails(organizationId: string): Promise<SelectItemView[]> {
    const groups = await this.apiService.getGroups(organizationId);
    return groups.data.map((group) => {
      const selectItemView: SelectItemView = {
        icon: "bwi-family",
        id: group.id,
        labelName: group.name,
        listName: group.name,
      };
      return selectItemView;
    });
  }
}
