import SquadSubMerchant from "./sub-merchant";
import type {
  VirtualAccountProps,
  VirtualAccountResponseProps,
  BusinessVirtualAccountProps,
  BusinessVirtualAccountResponseProps,
  WebhookPropsResponseProps,
  WebhookDeletionResponseProps,
  CustomerTransactionResponseProps,
  MerchantTransactionResponseProps,
  MerchantTransactionFiltersProps,
  MerchantTransactionFilterResponseProps,
  FindCustomerResponseProps,
  CustomerDetailsResponseProps,
  MerchantVirtualAccountResponseProps,
  BeneficiaryAccountResponseProps,
  PoolCountResponseProps,
  DynamicAccountTransactionResponseProps,
  ReQueryDynamicVirtualAccountResponseProps,
} from "./interfaces/virtual-account.interface";
import type { BaseResponseProps } from "./interfaces/base-response";

export default abstract class SquadVirtualAccount extends SquadSubMerchant {
  /**
   * @desc This is the sub class for the Squad Virtual Account Module
   * @arg {string} publicKey - Squad public key
   * @arg {string} privateKey - Squad private key
   * @arg {string} environment - The environment to use for the client. If not specified, defaults to "development".
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
   * @desc This method is used to create virtual account for individuals/customer on your platform. Please note that there is a strict validation of the BVN against the names, Date of Birth and Phone Number. (B2C)
   * @arg {Object} transactionData - The data for the transaction.
   * @arg {string} transactionData.firstName - The first name of the customer
   * @arg {string} transactionData.lastName - The last name of the customer
   * @arg {string} transactionData.middleName - The middle name of the customer
   * @arg {string} transactionData.mobileNumber - The mobile number of the customer
   * @arg {string} transactionData.dob - The date of birth of the customer  mm/dd/yyyy
   * @arg {string} transactionData.email - The email address of the customer
   * @arg {string} transactionData.bvn - The BVN  of the customer
   * @arg {string} transactionData.gender - The gender of the customer 1 = Male 2 = Female
   * @arg {string} transactionData.address - The address of the customer
   * @arg {string} transactionData.customerIdentifier - The uniquie identifier given by merchant
   * @arg {string} transactionData.beneficiaryAccount - Beneficiary Account is the 10 Digit Bank Account Number (GTBank) provided by the Merchant where money sent to this Virtual account is paid into. Please note that when beneficiary account is not provided, money paid into this virtual account go into your wallet and will be paid out/settled in T+1 settlement time.
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
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method allows you to create virtual accounts for your customers
   * who are businesses and not individuals. That is, these customers are actually
   * businesses (B2B) or other merchants. Please note that due to CBN's Guidelines
   * on validation before account creation as  well as other related Fraud concerns,
   * you are required to request for profiling before you can have access to create
   * accounts for businesses.Once profiled, you can go ahead and keep creating accounts
   * for your businesses.
   *
   *
   * @arg transactionData
   * @arg {string} transactionData.bvn - The business bvn
   * @arg {string} transactionData.businessName - The name of the business
   * @arg {string} transactionData.customerIdentifier - The unique identifier given to the customer
   * @arg {string} transactionData.mobileNumber - The mobile number of the business
   * @arg {string} transactionData.beneficiaryAccount -This is the 10 Digit Bank Account Number (GTBank) where money sent to this Virtual account is paid into. Please note that when beneficiary account is not provided, money paid into this virtual account go into your wallet and will be paid out/settled in T+1 settlement time.
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
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method allows you retrieve all your missed webhook transactions
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
   * @arg {number} page - The page you are on
   * @arg {number} perPage - The number of records you want to appear on a page
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

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/webhook/logs?page=${page}&perPage=${perPage}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This API enables you delete a processed transaction from the webhook error log
   * When you delete the transaction from the log, it won't be returned to you again.
   * Failure to delete a transaction will result in the transaction being returned to
   * you in the top 100 transactions returned each time you retry
   *
   * @arg {string} transactionRef - The unique reference that identifies a transaction.
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
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This is a method to query the transactions a customer has made.
   * This is done using the customer's identifier which was passed when
   * creating the virtual account.
   *
   * @arg {string} customerIdentifier - The unique identifier given to the customer
   */
  public async findCustomerTransactionById(
    customerIdentifier: string
  ): Promise<CustomerTransactionResponseProps> {
    if (!customerIdentifier || typeof customerIdentifier !== "string")
      throw new Error(
        "Validation error! Customer Identifier must be a string!"
      );

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/customer/transactions/${customerIdentifier}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This is a method to query all the merchant transactions over a period of time.
   * @arg None
   *
   */
  public async findAllMerchantTransactions(): Promise<MerchantTransactionResponseProps> {
    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/merchant/transactions/`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method allows you to query all transactions and filter using multiple parameters
   * like virtual account number, start and end dates, customer Identifier, etc.
   *
   * @arg {Object} filters
   * @arg {number} [filters.page] - The page number to display
   * @arg {number} [filters.perPage] - The number of records per page
   * @arg {string} [filters.virtualAccount] - The virtual account, a 10-digit virtual account number
   * @arg {string} [filters.customerIdentifier] - The unique customer identifier used to identify a customer account
   * @arg {string} [filters.startDate] - The start date
   * @arg {string} [filters.endDate] - The end date
   * @arg {string} [filters.transactionReference] - The transaction reference
   * @arg {string} [filters.sessionId] - The session identifier of the transaction
   * @arg {string} [filters.dir] - Takes 2 possible values ASC (Ascending) or DESC (Descending order)
   */
  public async findAllMerchantTransactionsByFilter(
    filters: MerchantTransactionFiltersProps
  ): Promise<MerchantTransactionFilterResponseProps> {
    if (typeof filters !== "object")
      throw new Error("Validation error! Invalid filters");

    const validFilters: Record<string, any> = {};

    // Only include filters with values provided by the user
    for (const key in filters) {
      if (
        Object.prototype.hasOwnProperty.call(filters, key) &&
        filters[key] !== undefined &&
        filters[key] !== null
      ) {
        validFilters[key] = filters[key];
      }
    }

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/merchant/transactions/all`,
        {
          params: validFilters,
        }
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method retrives the details of a customer using the Virtual Account Number
   * @arg {string} virtualAccountNumber - The virtual account, a 10-digit virtual account number
   */
  public async findCustomerByVirtualAccountNumber(
    virtualAccountNumber: string
  ): Promise<FindCustomerResponseProps> {
    if (typeof virtualAccountNumber !== "string")
      throw new Error(
        "Validation error! Virtual Account Number must be a string"
      );

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/customer/${virtualAccountNumber}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This is method retrives the details of a customer'svirtual account using the Customer Identifier
   * @arg {string} customerIdentifier
   */
  public async getCustomerVirtualAccountDetails(
    customerIdentifier: string
  ): Promise<CustomerDetailsResponseProps> {
    if (!customerIdentifier || typeof customerIdentifier !== "string")
      throw new Error(
        "Validation error! Customer Identifier Number must be a string"
      );

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/${customerIdentifier}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method is used to update customer's BVN and Unfreeze transaction
   * @param {string} customerBvn - The bank verfication number of the customer
   * @arg {number} customerIdentifier - The unique number given to customer by merchant
   * @arg {number} phoneNumber - The phone number of the customer
   *
   *
   * @returns {}
   */

  public async updateCustomerBvn(
    customerBvn: string,
    customerIdentifier: string,
    phoneNumber: string
  ): Promise<BaseResponseProps> {
    if (
      typeof customerBvn !== "string" ||
      typeof customerIdentifier !== "string" ||
      typeof phoneNumber !== "string"
    )
      throw new Error(
        "Validation error! Customer BVN, Customer Identifier and Phone Number must be a string"
      );

    const dataToSend = {
      customer_bvn: customerBvn,
      customer_identifier: customerIdentifier,
      phone_number: phoneNumber,
    };

    try {
      const squadResponse = await this.Axios.patch(
        `${this.baseVirtualAccountUrl}/update/bvn`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @summary This is a method for merchants to query and retrieve all their virtual account.
   * @arg {number} page - The number of pages
   * @arg {number} perPage - The number of Accounts to be returned per page
   * @arg {string} startDate - The startDate in format YY-MM-DD
   * @arg {string} endDate - - The endDate in format YY-MM-DD
   */

  public async findAllMerchantVirtualAccounts(
    page: number,
    perPage: number,
    startDate?: string,
    endDate?: string
  ): Promise<MerchantVirtualAccountResponseProps> {
    if (typeof page !== "number" || typeof perPage !== "number")
      throw new Error(
        "Validation error! Page, PerPage, StartDate, or EndDate must be of a valid data type"
      );

    const queryParams: Record<string, any> = {
      page,
      perPage,
    };

    // Only include startDate and endDate if provided
    if (startDate !== undefined) {
      queryParams.startDate = startDate;
    }

    if (endDate !== undefined) {
      queryParams.endDate = endDate;
    }

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/merchant/accounts`,
        {
          params: queryParams,
        }
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method is used to update beneficiary account
   * @arg {string} beneficiaryAccount -The 10 digit valid NUBAN account number
   * @arg {string} virtualAccountNumber  - The virtual account number whose beneficiary account is to be updated
   */
  public async updateBeneficiaryAccount(
    beneficiaryAccount: string,
    virtualAccountNumber: string
  ): Promise<BeneficiaryAccountResponseProps> {
    if (
      typeof beneficiaryAccount !== "string" ||
      typeof virtualAccountNumber !== "string"
    )
      throw new Error(
        "Validation error! Beneficiary Account and Virtual Account Number muse be a string"
      );

    const dataToSend = {
      beneficiary_account: beneficiaryAccount,
      virtual_account_number: virtualAccountNumber,
    };

    try {
      const squadResponse = await this.Axios.patch(
        `${this.baseVirtualAccountUrl}/update/beneficiary/account`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method allows you to simulate payment. ⚠️ This should be done on test environment only !!
   *
   * @arg {string} virtualAccountNumber - The virtual account of customer that wants to make payment
   * @arg {number} amount - Simulated amount
   * @arg {boolean} dva - True
   */
  public async simulateVirtualAccountPayment(
    virtualAccountNumber: string,
    amount?: string,
    dva: boolean = false
  ): Promise<BaseResponseProps> {
    if (!virtualAccountNumber || typeof virtualAccountNumber !== "string")
      throw new Error(
        "Validation error! Virtual account number must be a string"
      );

    const dataToSend = {
      virtual_account_number: virtualAccountNumber,
      amount,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.baseVirtualAccountUrl}/simulate/payment`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method allows you create and assign dynamic virtual accounts
   * to your pool. Only one account is generated per request.
   *
   * @arg None
   */
  public async createDynamicVirtualAccount(): Promise<BaseResponseProps> {
    try {
      const squadResponse = await this.Axios.post(
        `${this.baseVirtualAccountUrl}/create-dynamic-virtual-account`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response.data;
    }
  }

  /**
   * @desc This method gives you the total count of the virtual accounts you have in your pool.
   *
   * @arg None
   */
  public async getPoolCount(): Promise<PoolCountResponseProps> {
    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/count-dynamic-virtual-accounts`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response?.data;
    }
  }

  /**
   * @desc This method allows you generate a Dynamic Virtual Account
   * to be assigned to a customer. This is used to initiate a transaction.
   *
   * @arg {number} amount  - The amount is in Kobo
   * @arg {number} duration - The time allowed before an account/transaction is expired. Duration is in seconds (ie) 60 = 1 minute
   * @arg {string} email - The valid email address to notify customers
   * @arg {string} transactionRef - A unique transaction reference that identifies the transaction on your system
   */
  public async initiateDynamicVirtualAccountTransaction(
    amount: string,
    duration: number,
    email: string,
    transactionRef: string
  ): Promise<DynamicAccountTransactionResponseProps> {
    if (!amount || !duration || !email || !transactionRef)
      throw new Error("Validation Error! Invalid transaction data");

    const dataToSend = {
      amount,
      duration,
      email,
      transaction_ref: transactionRef,
    };
    try {
      const squadResponse = await this.Axios.post(
        `${this.baseVirtualAccountUrl}/initiate-dynamic-virtual-account`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response?.data;
    }
  }

  /**
   * @desc This method allows you re-query a transaction to see its status.
   * It returns an array of all transaction attempts made including those that returned
   *  as a mismatch, those that expired and the successful transaction.
   * Ultimately all expired and mismatched transactions will eventually be refunded.
   * @param transactionRef - Merchant's transaction reference passed when initiating / generating the dynamic virtual account
   */
  public async reQueryDynamicVirtualAccountTransaction(
    transactionRef: string
  ): Promise<ReQueryDynamicVirtualAccountResponseProps> {
    if (!transactionRef)
      throw new Error("Validation Error! Transaction Ref must be a string");

    try {
      const squadResponse = await this.Axios.get(
        `${this.baseVirtualAccountUrl}/get-dynamic-account-transactions/${transactionRef}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response?.data;
    }
  }

  /**
   *
   * @param amount - Amount is in Kobo
   * @param transactionReference - The transaction reference of the already initiated transaction
   * @param duration - The amount of time before the transaction expires. Duration is in seconds (ie) 60  = 1 min
   */
  public async updateDynamicVirtualAccountTransactionAmount(
    amount: string,
    transactionReference: string,
    duration?: number
  ): Promise<BaseResponseProps> {
    if (!amount || !transactionReference || duration)
      throw new Error(
        "Validation Error! Invalid transaction data, please check your function arguments"
      );

    const dataToSend = {
      amount,
      transaction_reference: transactionReference,
      duration,
    };

    try {
      const squadResponse = await this.Axios.patch(
        `${this.baseVirtualAccountUrl}/update-dynamic-virtual-account-time-and-amount`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error.response?.data;
    }
  }
}
