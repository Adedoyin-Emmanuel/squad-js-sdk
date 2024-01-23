import SquadSubMerchant from "./sub-merchant";
import type {
  VirtualAccountProps,
  VirtualAccountResponseProps,
  BusinessVirtualAccountProps,
  BusinessVirtualAccountResponseProps,
  WebhookPropsResponseProps,
  WebhookDeletionResponseProps,
} from "./interfaces/virtual-account.interface";

export default class SquadVirtualAccount extends SquadSubMerchant {
  /**
   * @summary This is the sub class for the Squad Virtual Account Module
   * @param {string} publicKey - Squad public key
   * @param {string} privateKey - Squad private key
   * @param {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */

  private baseVirtualAccountUrl: string;
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.baseVirtualAccountUrl = "/virtual-account";
  }

  /**
   * @summary This method is used to create virtual account for individuals/customer on your platform. Please note that there is a strict validation of the BVN against the names, Date of Birth and Phone Number. (B2C)

   * @param [transactionData] - The data for the transaction.
   * @param {string} [transactionData.firstName] - The first name of the customer
   * @param {string} [transactionData.lastName] - The last name of the customer
   * @param {string} [transactionData.middleName] - The middle name of the customer
   * @param {string} [transactionData.mobileNumber] - The mobile number of the customer
   * @param {Date} [transactionData.dob] - The date of birth of the customer  mm/dd/yyyy
   * @param {string} [transactionData.email] - The email address of the customer 
   * @param {string} [transactionData.bvn] - The BVN  of the customer 
   * @param {string} [transactionData.gender] - The gender of the customer
   * @param {string} [transactionData.address] - The address of the customer
   * @param {string} [transactionData.customerIdentifier] - The uniquie identifier given by merchant
   * @param {string} [transactionData.beneficiaryAccount] - Beneficiary Account is the 10 Digit Bank Account Number (GTBank) provided by the Merchant where money sent to this Virtual account is paid into. Please note that when beneficiary account is not provided, money paid into this virtual account go into your wallet and will be paid out/settled in T+1 settlement time.
   * 
   */

  public async createVirtualAccount(
    transactionData: VirtualAccountProps
  ): Promise<VirtualAccountResponseProps> {
    if (!transactionData || typeof transactionData !== "object")
      throw new Error("Invalid transaction data!");

    const dataToSend = {
      first_name: transactionData.firstName,
      last_name: transactionData.lastName,
      middle_name: transactionData.middleName,
      mobile_num: transactionData.mobileNumber,
      dob: transactionData.dob,
      email: transactionData.email,
      bvn: transactionData.bvn,
      gender: transactionData.gender,
      address: transactionData.address,
      customer_identifier: transactionData.customerIdentifier,
      beneficiary_account: transactionData.beneficiaryAccount,
    };

    try {
      const squadResponse = await this.Axios.post(
        this.baseVirtualAccountUrl,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.log(error);
      throw Error(error);
    }
  }

  /**
   * @summary This method allows you to create virtual accounts for your customers
   * who are businesses and not individuals. That is, these customers are actually
   * businesses (B2B) or other merchants. Please note that due to CBN's Guidelines
   * on validation before account creation as  well as other related Fraud concerns,
   * you are required to request for profiling before you can have access to create
   * accounts for businesses.Once profiled, you can go ahead and keep creating accounts
   * for your businesses.
   *
   *
   * @param transactionData
   * @param {string} transactionData.bvn - The business bvn
   * @param {string} transactionData.businessName - The name of the business
   * @param {string} transactionData.customerIdentifier - The unique identifier given to the customer
   * @param {string} transactionData.mobileNumber - The mobile number of the business
   * @param {string} transactionData.beneficiaryAccount -This is the 10 Digit Bank Account Number (GTBank) where money sent to this Virtual account is paid into. Please note that when beneficiary account is not provided, money paid into this virtual account go into your wallet and will be paid out/settled in T+1 settlement time.
   */
  public async createBusinessVirtualAccount(
    transactionData: BusinessVirtualAccountProps
  ): Promise<BusinessVirtualAccountResponseProps> {
    if (!transactionData || typeof transactionData !== "object")
      throw new Error("Invalid transaction data!");

    const dataToSend = {
      customer_identifier: transactionData.customerIdentifier,
      business_name: transactionData.businessName,
      mobile_num: transactionData.mobileNumber,
      bvn: transactionData.bvn,
      beneficiary_account: transactionData.beneficiaryAccount,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.baseVirtualAccountUrl}/business`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @summary This method allows you retrieve all your missed webhook transactions
   * and use it to update your record without manual input.The top 100 missed
   * webhook will always be returned by default and it This flow involves
   * integration of two(2) APIs Once you have updated the record of a particular
   * transaction, you are expected to use the second API to delete the record from
   * the error log. If this is not done, the transaction will continuously be returned
   * to you in the first 100 transactions until you delete it. This will only work for those
   * who respond correctly to our webhook calls. Also, ensure you have a transaction
   * duplicate checker to ensure you don't update a record twice or update a record
   * you have updated using the webhook or the transaction API.
   *
   *
   *
   * @param {number} page - The page you are on
   * @param {number} perPage - The number of records you want to appear on a page
   *
   */
  public async getWebhookErrorLog(
    page?: number,
    perPage?: number
  ): Promise<WebhookPropsResponseProps> {
    if (
      (page && typeof page !== "number") ||
      (perPage && typeof perPage !== "number")
    )
      throw new Error("Validation error! Page or PerPage must be a number");
    const dataToSend = {
      page,
      perPage,
    };
    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/webhook/logs`,
        dataToSend as any
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @summary This API enables you delete a processed transaction from the webhook error log
   * When you delete the transaction from the log, it won't be returned to you again.
   * Failure to delete a transaction will result in the transaction being returned to
   * you in the top 100 transactions returned each time you retry
   *
   * @param {string} transactionRef
   */
  public async deleteWebhookErrorLog(
    transactionRef: string
  ): Promise<WebhookDeletionResponseProps> {
    if (!transactionRef || typeof transactionRef !== "string")
      throw new Error("Validation error! TransactionRef must be a string");

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/webhook/logs/${transactionRef}`
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }
}
