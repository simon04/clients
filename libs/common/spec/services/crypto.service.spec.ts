import { mock, mockReset } from "jest-mock-extended";

import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { EncryptService } from "@bitwarden/common/abstractions/encrypt.service";
import { LogService } from "@bitwarden/common/abstractions/log.service";
import { PlatformUtilsService } from "@bitwarden/common/abstractions/platformUtils.service";
import { StateService } from "@bitwarden/common/abstractions/state.service";
import { CryptoServiceImpl } from "@bitwarden/common/services/crypto.service.impl";

describe("cryptoService", () => {
  let cryptoService: CryptoServiceImpl;

  const cryptoFunctionService = mock<CryptoFunctionService>();
  const encryptService = mock<EncryptService>();
  const platformUtilService = mock<PlatformUtilsService>();
  const logService = mock<LogService>();
  const stateService = mock<StateService>();

  beforeEach(() => {
    mockReset(cryptoFunctionService);
    mockReset(encryptService);
    mockReset(platformUtilService);
    mockReset(logService);
    mockReset(stateService);

    cryptoService = new CryptoServiceImpl(
      cryptoFunctionService,
      encryptService,
      platformUtilService,
      logService,
      stateService
    );
  });

  it("instantiates", () => {
    expect(cryptoService).not.toBeFalsy();
  });
});
