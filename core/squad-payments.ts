import SquadBaseClient from "./squad";
import type {
  InitiatePaymentProps,
  InitiatePaymentResponseProps,
  ChargeCardProps,
  ChargeCardResponseProps,
  VerifyTransactionProps,
  VerifyTransactionResponseProps,
} from "./interfaces/payment.interface";

/**
 * @summary Payment Base Class
 * @extends SquadBaseClient
 */
export default class SquadPayment extends SquadBaseClient {
  /**
   * @summary This is the sub class for the Squad Payment Module
   * @param {string} publicKey - Squad public key
   * @param {string} privateKey - Squad private key
   * @param {string} environment - The environment to use for the client. If not specified, defaults to "development".
   */

  private basePaymentUrl: string;
  constructor(
    publicKey: string,
    privateKey: string,
    environment: "production" | "development"
  ) {
    super(publicKey, privateKey, environment);
    this.basePaymentUrl = "/transaction";
  }
  /**
   * @summary This method allows you to initiate a transaction
   * by making calls from your server which returns a URL that
   * when visited will call up SQUAD payment modal.
   *
   * @function
   * @param {object} transactionData - The data for the transaction.
   * @param {string} transactionData.amount - The amount you are debiting customer (expressed in the lowest currency value - kobo& cent).  10000 = 100NGN for Naira Transactions.
   * @param {string} transactionData.email - The email address of the client making payment
   * @param {string} transactionData.initiateType - This states the method by which the transaction is initiated. At the moment, this can only take the value "inline". @see https://squadinc.gitbook.io/squad-api-documentation/payments/initiate-payment
   * @param {String} transactionData.currency - The currency you want the amount to be charged in. Allowed value is either NGN or USD.
   * @param {string} [transactionData.transactionRef] - An alphanumeric string that uniquely identifies a transaction
   * @param {string} [transactionData.customerName] - The name of the customer carrying out the transaction
   * @param {string} [transactionData.callbackUrl] - The URL to redirect the user to after transaction is completed
   * @param {array} [transactionData.paymentChannels] An array of payment channels to control what channels you want to make available for the user to make a payment with. Available channels include; [ 'card' , 'bank' , 'ussd' , 'transfer' ]]
   * @param {object} [transactionData.metadata] Object that contains any additional information that you want to record with the transaction. The custom fields in the object will be returned via webhook and the payment verification endpoint.
   * @param {boolean} [transactionData.passCharge] This takes two possible values: True or False. It is set to False by default. When set to True, the charges on the transaction is computed and passed on to the customer(payer). But when set to False, the charge is passed to the merchant and will be deducted from the amount to be settled to the merchant.
   * @param {string} [transactionData.subMerchantId] This is the ID of a merchant that was created by an aggregator which allows the aggregator initiate a transaction on behalf of the submerchant. This parameter is an optional field that is passed only by a registered aggregator.
   * @param {boolean} [tokenizeCard] This is to tokenize a card. Adding this to the initiate payload when calling the initiatePayment method,  will automatically be tokenize the card. The unique token code will automatically be added to the webhook notification that will be received after payment. @see https://squadinc.gitbook.io/squad-api-documentation/payments/initiate-payment
   * @returns {object} The response from the Squad API
   * @throws {Error} Throws an error if validation fails.
   */

  public async initiatePayment(
    transactionData: InitiatePaymentProps,
    tokenizeCard: boolean = false
  ): Promise<InitiatePaymentResponseProps> {
    if (!transactionData || typeof transactionData !== "object")
      throw new Error("Invalid transaction data!");

    const dataToSend = {
      amount: transactionData.amount,
      email: transactionData.email,
      initiate_type: transactionData.initiateType,
      currency: transactionData.currency,
      transaction_ref: transactionData.transactionRef,
      customer_name: transactionData.customerName,
      callback_url: transactionData.callbackUrl,
      payment_channels: transactionData.paymentChannels,
      metadata: transactionData.metadata,
      pass_charge: transactionData.passCharge,
      sub_merchant_id: transactionData.subMerchantId,
      is_recurring: tokenizeCard,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.basePaymentUrl}/initiate`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @summary This allows you charge a card using the token generated during the initiate transaction which was sent via webhook
   * @function
   * @param transactionData
   * @param {number} transactionData.amount - The amount to charge
   * @param {string} transactionData.tokenId - The unique tokenization code for each card transaction and it is returned via the webhook for first charge on the card.
   * @param {string} [transaction.transactionRef] - Optional The transaction reference string. . If you do not pass this parameter, Squad will generate a unique reference for you.
   * @returns {object} The Reponse from Squad API
   */
  public async chargeCard(
    transactionData: ChargeCardProps
  ): Promise<ChargeCardResponseProps> {
    if (!transactionData || typeof transactionData !== "object")
      throw new Error("Invalid transaction data!");

    const dataToSend = {
      amount: transactionData.amount,
      token_id: transactionData.tokenId,
      transaction_ref: transactionData.transactionRef,
    };

    try {
      const squadResponse = await this.Axios.post(
        `${this.basePaymentUrl}/charge_card`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }

  /**
   * @summary This is method allows you to query the status of a particular
   * transaction using the unique transaction reference attached to the transaction.
   * @function
   * @param {string} transactionRef - The unique transaction reference attached to the transaction.
   */
  public async verifyTransaction(
    transactionRef: VerifyTransactionProps
  ): Promise<VerifyTransactionResponseProps> {
    if (!transactionRef) throw new Error("Transaction reference is required!");

    try {
      const squadResponse = await this.Axios.get(
        `${this.basePaymentUrl}/verify/${transactionRef}`
      );

      return squadResponse.data;
    } catch (error: any) {
      throw Error(error);
    }
  }
}
