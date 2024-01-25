import SquadPayment from "./squad-payments";
import type {
  SubMerchantProps,
  SubMerchantResponseProps,
} from "./interfaces/sub-merchant.interface";

export default abstract class SquadSubMerchant extends SquadPayment {
  /**
   * @desc This is the sub class for the Squad Sub-Merchant Module
   * @arg {string} publicKey - Squad public key
   * @arg {string} privateKey - Squad private key
   * @arg {string} environment - The environment to use for the client. If not specified, defaults to "development".
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
   * @desc This method allows you to be profiled as an aggregator and also create sub-merchants dynamically under your account.
   * @arg transactionData - The data for the transaction.
   * @arg {string} transactionData.displayName - The name of the sub-merchant
   * @arg {string} transactionData.accountName - The sub-merchant's settlement bank account name
   * @arg {string} transactionData.accountNumber - The sub-merchant's account number
   * @arg {string} transactionData.bankCode - The sub-merchant's settlement bank code
   * @arg {string} transactionData.bankName - The sub-merchant's settlement bank name eg GTBank
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
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }
}
