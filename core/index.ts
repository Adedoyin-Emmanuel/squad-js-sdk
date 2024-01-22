import SquadSubMerchant from "./sub-merchant";

/**
 * @summary
 * Squad JavaScript SDK
 * Built with ❣️ by Adedoyin Emmanuel Adeniyi https://github.com/adedoyin-emmanuel/
 */
export class CreateSquadClient extends SquadSubMerchant {
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
  }
}
