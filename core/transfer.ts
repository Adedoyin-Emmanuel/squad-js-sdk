import SquadVirtualAccount from "./virtual-account";
import type { BaseResponseProps } from "./interfaces/base-response";
import type { AccountLookupResponseProps } from "./interfaces/transfer.interface";

export default abstract class SquadTransfer extends SquadVirtualAccount {
  /**
   * @summary This is the sub class for the Squad Transfer Module
   * @param {string} publicKey - Squad public key
   * @param {string} privateKey - Squad private key
   * @param {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */

  private baseTransferUrl: string;

  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.baseTransferUrl = "/payout";
  }

  /**
   * @summary This method allows you lookup/confirm the account name of the
   * recipient you intend to credit. This should be done before initiating the transfer.
   * @param bankCode - The unique NIP code that identifies a bank
   * @param accountNumber  - The account number you want to transfer to
   */
  public async accountLookup(
    bankCode: string,
    accountNumber: string
  ): Promise<AccountLookupResponseProps> {
    if (
      !bankCode ||
      typeof bankCode !== "string" ||
      !accountNumber ||
      typeof accountNumber !== "string"
    )
      throw new Error(
        "Validation Error! BankCode or AccountNumber must be a string"
      );

    const dataToSend = {
      bank_code: bankCode,
      account_number: accountNumber,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.baseTransferUrl}/account/lookup`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }
}
