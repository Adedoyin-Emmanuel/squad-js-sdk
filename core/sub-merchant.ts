import SquadPayment from "./squad-payments";
import type {
  SubMerchantProps,
  SubMerchantResponseProps,
} from "./interfaces/sub-merchant.interface";

export default abstract class SquadSubMerchant extends SquadPayment {
  /**
   * @summary This is the sub class for the Squad Sub-Merchant Module
   * @param {string} publicKey - Squad public key
   * @param {string} privateKey - Squad private key
   * @param {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */

  private baseSubMerchantUrl: string;
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.baseSubMerchantUrl = "/merchant";
  }

  /**
   * @summary This method allows you to be profiled as an aggregator and also create sub-merchants dynamically under your account.
   * @param [transactionData] - The data for the transaction.
   * @param {string} [transactionData.displayName] - The name of the sub-merchant
   * @param {string} [transactionData.accountName] - The sub-merchant's settlement bank account name
   * @param {string} [transactionData.accountNumber] - The sub-merchant's account number
   * @param {string} [transactionData.bankCode] - The sub-merchant's settlement bank code
   * @param {string} [transactionData.bankName] - The sub-merchant's settlement bank name eg GTBank
   */

  public async createSubMerchant(
    transactionData: SubMerchantProps
  ): Promise<SubMerchantResponseProps> {
    if (!transactionData || typeof transactionData !== "object")
      throw new Error("Invalid transaction data!");

    const dataToSend = {
      display_name: transactionData.displayName,
      account_name: transactionData.accountName,
      account_number: transactionData.accountNumber,
      bank_code: transactionData.bankCode,
      bank: transactionData.bankName,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.baseSubMerchantUrl}/create-sub-users`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }
}
