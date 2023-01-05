import { Component, Input } from "@angular/core";

export interface AccessPolicy {
  icon: string;
  id: string;
  name: string;
  policyType: string;
}

@Component({
  selector: "sm-access-policies",
  templateUrl: "./access-policies.component.html",
})
export class AccessPoliciesComponent {
  @Input() columnTitle: string;
  @Input() emptyMessage: string;
  @Input() accessPolicies: AccessPolicy[];
}
