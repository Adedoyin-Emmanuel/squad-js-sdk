import axios, { Axios } from "axios";

/**
 * @summary
 * Squad JavaScript SDK
 * Built with ❣️ by Adedoyin Emmanuel Adeniyi https://github.com/adedoyin-emmanuel/
 */
class SquadClient {
  private pubilcKey: string;
  private privateKey: string;
  private Axios: Axios;
  private baseUrl: string;

  /**
   * @summary
   * The environment to use for the client. If not specified, defaults to "development".
   */
  private environment: string = "development";

  /**
   * @summary This creates a new instance of Squad JS SDK
   * @param {string} publicKey - Squad public key
   * @param {string} privateKey - Squad private key
   * @param {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */
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
    this.baseUrl =
      this.environment == "development"
        ? "https://sandbox-api-d.squadco.com"
        : "https://api-d.squadco.com";

    this.Axios = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.privateKey}`,
      },
    });
  }
}
