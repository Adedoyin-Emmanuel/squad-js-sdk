import SquadTransfer from "./transfer";
import type { WalletBalanceResponseProps } from "./interfaces/wallet-balance.interface";

export default abstract class SquadWalletBalance extends SquadTransfer {
  /**
   * @desc This is the sub class for the Squad Virtual Account Module
   * @arg {string} publicKey - Squad public key
   * @arg {string} privateKey - Squad private key
   * @arg {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */

  private baseWalletBalanceUrl: string;

  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.baseWalletBalanceUrl = "/merchant";
  }

  /**
   * @desc This method allows you get your Squad Wallet Balance.
   * Please be informed that the wallet balance is in KOBO.
   * (Please note that you can't get wallet balance for Dollar transactions)
   * @param {String} currencyId  -  The currency Id. This supports only NGN -> Naria
   */
  public async getWalletBalance(
    currencyId: string = "NGN"
  ): Promise<WalletBalanceResponseProps> {
    if (typeof currencyId !== "string")
      throw new Error("Validation Error: currencyId must be a string");

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseWalletBalanceUrl}/balance?currency_id=${currencyId}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }
}
