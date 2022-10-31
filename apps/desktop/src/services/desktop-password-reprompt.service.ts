import { Injectable } from "@angular/core";

import { PasswordRepromptServiceImpl } from "@bitwarden/angular/services/password-reprompt.service.impl";

import { PasswordRepromptComponent } from "../app/components/password-reprompt.component";

@Injectable()
export class DesktopPasswordRepromptService extends PasswordRepromptServiceImpl {
  component = PasswordRepromptComponent;
}
