import { Injectable } from "@angular/core";

import { BroadcasterServiceImpl as BaseBroadcasterService } from "@bitwarden/common/services/broadcaster.service.impl";

@Injectable()
export class BroadcasterService extends BaseBroadcasterService {}
