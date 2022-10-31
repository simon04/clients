import { CryptoFunctionService } from "@bitwarden/common/abstractions/cryptoFunction.service";
import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetric-crypto-key";

import { KeyGenerationService } from "./abstractions/key-generation.service";

export class KeyGenerationServiceImpl implements KeyGenerationService {
  constructor(private cryptoFunctionService: CryptoFunctionService) {}

  async makeEphemeralKey(numBytes = 16): Promise<SymmetricCryptoKey> {
    const keyMaterial = await this.cryptoFunctionService.randomBytes(numBytes);
    const key = await this.cryptoFunctionService.hkdf(
      keyMaterial,
      "bitwarden-ephemeral",
      "ephemeral",
      64,
      "sha256"
    );
    return new SymmetricCryptoKey(key);
  }
}
