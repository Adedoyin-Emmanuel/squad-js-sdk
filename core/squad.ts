/**
 * @summary
 * Squad JavaScript SDK
 * Built with ❣️ by Adedoyin Emmanuel Adeniyi https://github.com/adedoyin-emmanuel/
 */

class SquadClient {
  private pubilcKey: string;
  private privateKey: string;

  /**
   * @summary
   * The environment to use for the client. If not specified, defaults to "development".
   */
  private environment: string = "development";

  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    if (!publicKey || !privateKey)
      throw new Error("Public or Private keys are required!");
    if (!this.environment)
      console.warn("No environment specified. Defaulting to development.");

    this.pubilcKey = publicKey;
    this.privateKey = privateKey;
    this.environment = environment;
  }
}
