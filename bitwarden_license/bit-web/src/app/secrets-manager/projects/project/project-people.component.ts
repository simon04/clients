import { Component } from "@angular/core";

import { AccessPolicy } from "../../shared/access-policies/access-policies.component";

@Component({
  selector: "sm-project-people",
  templateUrl: "./project-people.component.html",
})
export class ProjectPeopleComponent {
  example: AccessPolicy[] = [];
}
