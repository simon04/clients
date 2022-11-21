import { BehaviorSubject, Observable } from "rxjs";

import { ApiService } from "../../abstractions/api.service";
import { StateService } from "../../abstractions/state.service";
import { UpdateAvatarRequest } from "../../models/request/update-avatar.request";
import { ProfileResponse } from "../../models/response/profile.response";

export class AvatarUpdateService {
  private _avatarUpdate$ = new BehaviorSubject<string | null>(null);
  avatarUpdate$: Observable<string | null> = this._avatarUpdate$.asObservable();

  constructor(private apiService: ApiService, private stateService: StateService) {
    this.loadColorFromState().then((color) => {
      this._avatarUpdate$.next(color);
    });
  }

  loadColorFromState(): Promise<string | null> {
    return this.stateService.getAvatarColor();
  }

  pushUpdate(color: string | null): Promise<ProfileResponse | void> {
    return this.apiService.putAvatar(new UpdateAvatarRequest(color)).then((response) => {
      this.stateService.setAvatarColor(response.avatarColor);
      this._avatarUpdate$.next(response.avatarColor);
    });
  }
}
