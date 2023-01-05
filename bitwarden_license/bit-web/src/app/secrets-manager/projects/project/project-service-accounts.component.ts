import { Component } from "@angular/core";

import { AccessPolicy } from "../../shared/access-policies/access-policies.component";

@Component({
  selector: "sm-project-service-accounts",
  templateUrl: "./project-service-accounts.component.html",
})
export class ProjectServiceAccountsComponent {
  example: AccessPolicy[] = [];
}
