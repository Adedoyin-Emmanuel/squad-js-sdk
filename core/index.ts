import SquadPayment from "./squad-payments";

/**
 * @summary
 * Squad JavaScript SDK
 * Built with ❣️ by Adedoyin Emmanuel Adeniyi https://github.com/adedoyin-emmanuel/
 */
export class CreateSquadClient extends SquadPayment {
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
  }
}
