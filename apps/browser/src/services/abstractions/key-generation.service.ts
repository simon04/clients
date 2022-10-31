import { SymmetricCryptoKey } from "@bitwarden/common/models/domain/symmetric-crypto-key";

export interface KeyGenerationService {
  makeEphemeralKey(numBytes?: number): Promise<SymmetricCryptoKey>;
}
