import { Injectable } from "@angular/core";

import { PasswordRepromptServiceImpl } from "@bitwarden/angular/services/password-reprompt.service.impl";

import { PasswordRepromptComponent } from "../components/password-reprompt.component";

@Injectable()
export class BrowserPasswordRepromptService extends PasswordRepromptServiceImpl {
  component = PasswordRepromptComponent;
}
