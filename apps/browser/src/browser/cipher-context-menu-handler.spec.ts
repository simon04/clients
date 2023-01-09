import { mock, MockProxy } from "jest-mock-extended";

import { AuthService } from "@bitwarden/common/abstractions/auth.service";
import { CipherService } from "@bitwarden/common/abstractions/cipher.service";
import { AuthenticationStatus } from "@bitwarden/common/enums/authenticationStatus";
import { CipherRepromptType } from "@bitwarden/common/enums/cipherRepromptType";
import { CipherType } from "@bitwarden/common/enums/cipherType";

import { CipherContextMenuHandler } from "./cipher-context-menu-handler";
import { MainContextMenuHandler } from "./main-context-menu-handler";

describe("CipherContextMenuHandler", () => {
  let mainContextMenuHandler: MockProxy<MainContextMenuHandler>;
  let authService: MockProxy<AuthService>;
  let cipherService: MockProxy<CipherService>;

  let sut: CipherContextMenuHandler;

  beforeEach(() => {
    mainContextMenuHandler = mock();
    authService = mock();
    cipherService = mock();

    jest.spyOn(MainContextMenuHandler, "removeAll").mockResolvedValue();

    sut = new CipherContextMenuHandler(mainContextMenuHandler, authService, cipherService);
  });

  afterEach(() => jest.resetAllMocks());

  describe("update", () => {
    it("locked, updates for no access", async () => {
      authService.getAuthStatus.mockResolvedValue(AuthenticationStatus.Locked);

      await sut.update("https://test.com");

      expect(mainContextMenuHandler.noAccess).toHaveBeenCalledTimes(1);
    });

    it("logged out, updates for no access", async () => {
      authService.getAuthStatus.mockResolvedValue(AuthenticationStatus.LoggedOut);

      await sut.update("https://test.com");

      expect(mainContextMenuHandler.noAccess).toHaveBeenCalledTimes(1);
    });

    it("has menu disabled, does not load anything", async () => {
      authService.getAuthStatus.mockResolvedValue(AuthenticationStatus.Unlocked);

      await sut.update("https://test.com");

      expect(mainContextMenuHandler.loadOptions).not.toHaveBeenCalled();

      expect(mainContextMenuHandler.noAccess).not.toHaveBeenCalled();

      expect(mainContextMenuHandler.noLogins).not.toHaveBeenCalled();
    });

    it("has no ciphers, add no ciphers item", async () => {
      authService.getAuthStatus.mockResolvedValue(AuthenticationStatus.Unlocked);

      mainContextMenuHandler.init.mockResolvedValue(true);

      cipherService.getAllDecryptedForUrl.mockResolvedValue([]);

      await sut.update("https://test.com");

      expect(mainContextMenuHandler.noLogins).toHaveBeenCalledTimes(1);
    });

    it("only adds valid ciphers", async () => {
      authService.getAuthStatus.mockResolvedValue(AuthenticationStatus.Unlocked);

      mainContextMenuHandler.init.mockResolvedValue(true);

      const realCipher = {
        id: "5",
        type: CipherType.Login,
        reprompt: CipherRepromptType.None,
        name: "Test Cipher",
        login: { username: "Test Username" },
      };

      cipherService.getAllDecryptedForUrl.mockResolvedValue([
        null,
        undefined,
        { type: CipherType.Card },
        { type: CipherType.Login, reprompt: CipherRepromptType.Password },
        realCipher,
      ] as any[]);

      await sut.update("https://test.com");

      expect(cipherService.getAllDecryptedForUrl).toHaveBeenCalledTimes(1);

      expect(cipherService.getAllDecryptedForUrl).toHaveBeenCalledWith("https://test.com");

      expect(mainContextMenuHandler.loadOptions).toHaveBeenCalledTimes(1);

      expect(mainContextMenuHandler.loadOptions).toHaveBeenCalledWith(
        "Test Cipher (Test Username)",
        "5",
        "https://test.com",
        realCipher
      );
    });
  });
});
