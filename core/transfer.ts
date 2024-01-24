import SquadVirtualAccount from "./virtual-account";
import type { BaseResponseProps } from "./interfaces/base-response";
import type {
  AccountLookupResponseProps,
  FundsTransferRequestProps,
  FundsTransferReponseProps,
  AllTransferResponseProps,
} from "./interfaces/transfer.interface";

export default abstract class SquadTransfer extends SquadVirtualAccount {
  /**
   * @desc This is the sub class for the Squad Transfer Module
   * @arg {string} publicKey - Squad public key
   * @arg {string} privateKey - Squad private key
   * @arg {string} environment - The environment to use for the client. If not specified, defaults to "development".
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
   * @desc This method allows you lookup/confirm the account name of the
   * recipient you intend to credit. This should be done before initiating the transfer.
   * @arg {string} bankCode - The unique NIP code that identifies a bank
   * @arg {string} accountNumber  - The account number you want to transfer to
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

  /**
   * @desc This method allows you to transfer funds from your Squad Wallet
   * to the account you have looked up. Please be informed that we will not be 
   * held liable for mistake in transferring to a wrong account or an account
   * that wasn't looked up.
    Transaction Reference: Transaction Reference used to initiate a transfer 
    must be unique per transfer. Kindly ensure that you append your merchant ID
     to the transaction Reference you are creating. This is compulsory as it will throw 
     an error if you don't append it.
    For instance: If my Squad Merchant ID is SBABCKDY and i want to create a transaction ref for my transfer, then I will have something like: 
    "transactionReference":"SBABCKDY_12345".

    @arg {string} transactionData.transactionReference - Unique Transaction Reference used to initiate a transfer.
     Please ensure your merchantId to the transaction reference you're creating. This
     is compulsory as it will throw an error if you don't append it.

    @arg {string} transactionData.amount - Amount to be transferred. Amount is in Kobo
    @arg {string} transactionData.transactionDataebankCode - Unique NIP code that identifies a Bank.
    @arg {string}  transactionData.accountNumber - 10-digit NUBAN account number to be transferred to. Must be an account that has been looked up and vetted
    to be transferred to.

    @arg {string} transactionData.accountName - The account name tied to the account number you are transferring to which you've looked up with the accountLookup method.
    @arg {string} transactionData.currencyId - Takes only the value NGN
    @arg {string} transactionData.remark - A unique remark that will be sent with the transfer
   */
  public async transferFunds(
    transactionData: FundsTransferRequestProps
  ): Promise<FundsTransferReponseProps> {
    if (!transactionData || typeof transactionData !== "object")
      throw new Error("Validation Error! Invalid transaction data");

    const dataToSend = {
      remark: transactionData.remark,
      bank_code: transactionData.bankCode,
      currency_id: transactionData.currencyId,
      amount: transactionData.amount,
      account_number: transactionData.accountNumber,
      transaction_reference: transactionData.transactionReference,
      account_name: transactionData.accountName,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.baseTransferUrl}/transfer`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @desc This method allows you re-query the status of a transfer made to know if it was successful, failed, reversed or pending.
   * @arg {string} transactionReference - Unique Transaction Reference used to initiate a transfer.
   * Please ensure that you append your merchant ID to the transaction Reference you
   * are creating. This is compulsory as it will throw an error if you don't append it
   */
  public async reQueryFundsTransfer(
    transactionReference: string
  ): Promise<FundsTransferReponseProps> {
    if (!transactionReference || typeof transactionReference !== "string")
      throw new Error(
        "Validation Error ! Transaction Reference must be a string"
      );

    const dataToSend = {
      transaction_reference: transactionReference,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.baseTransferUrl}/requery`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @desc This method allows you retrieve the details of all transfers you have done from your Squad Wallet using this transfer solution.
   * @arg None
   */
  public async getAllTransfers(): Promise<AllTransferResponseProps> {
    try {
      const squadResponse = await this.Axios.get(
        `${this.baseTransferUrl}/list`
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }
}
