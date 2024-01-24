import SquadTransfer from "./transfer";

/**
 * @description
 * Squad JavaScript | TypeScript SDK
 * @author Adedoyin Emmanuel Adeniyi
 * @license MIT
 * @since 21st of January 2024
 * Built with ❣️ by Adedoyin Emmanuel Adeniyi @see https://github.com/adedoyin-emmanuel/
 */
export class CreateSquadClient extends SquadTransfer {
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
  }
}
