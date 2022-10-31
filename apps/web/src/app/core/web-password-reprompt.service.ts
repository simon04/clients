import { Injectable } from "@angular/core";

import { PasswordRepromptServiceImpl as BasePasswordRepromptService } from "@bitwarden/angular/services/password-reprompt.service.impl";

import { PasswordRepromptComponent } from "../components/password-reprompt.component";

@Injectable()
export class WebPasswordRepromptService extends BasePasswordRepromptService {
  component = PasswordRepromptComponent;
}
