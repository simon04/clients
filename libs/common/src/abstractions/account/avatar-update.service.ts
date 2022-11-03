import { EventEmitter } from "@angular/core";

import { ProfileResponse } from "../../models/response/profile.response";
export abstract class AvatarUpdateService {
  avatarUpdated$ = new EventEmitter<string | null>();
  abstract pushUpdate(color: string): Promise<ProfileResponse | void>;
  abstract loadColorFromState(): Promise<string | null>;
}
