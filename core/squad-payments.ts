import SquadBaseClient from "./squad";
import type {
  InitiatePaymentProps,
  InitiatePaymentResponseProps,
  ChargeCardProps,
  ChargeCardResponseProps,
  VerifyTransactionProps,
  VerifyTransactionResponseProps,
  PaymentLinkResponseProps,
  PaymentLinkProps,
  RefundResponseProps,
  RefundProps,
} from "./interfaces/payment.interface";

/**
 * @desc Payment Base Class
 * @extends SquadBaseClient
 */
export default abstract class SquadPayment extends SquadBaseClient {
  /**
   * @desc This is the sub class for the Squad Payment Module
   * @arg {string} publicKey - Squad public key
   * @arg {string} privateKey - Squad private key
   * @arg {string} environment - The environment to use for the client. If not specified, defaults to "development".
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
   * @desc This method allows you to initiate a transaction
   * by making calls from your server which returns a URL that
   * when visited will call up SQUAD payment modal.
   *
   * @function
   * @arg {object} transactionData - The data for the transaction.
   * @arg {string} transactionData.amount - The amount you are debiting customer (expressed in the lowest currency value - kobo& cent).  10000 = 100NGN for Naira Transactions.
   * @arg {string} transactionData.email - The email address of the client making payment
   * @arg {string} transactionData.initiateType - This states the method by which the transaction is initiated. At the moment, this can only take the value "inline". @see https://squadinc.gitbook.io/squad-api-documentation/payments/initiate-payment
   * @arg {String} transactionData.currency - The currency you want the amount to be charged in. Allowed value is either NGN or USD.
   * @arg {string} [transactionData.transactionRef] - An alphanumeric string that uniquely identifies a transaction
   * @arg {string} [transactionData.customerName] - The name of the customer carrying out the transaction
   * @arg {string} [transactionData.callbackUrl] - The URL to redirect the user to after transaction is completed
   * @arg {array} [transactionData.paymentChannels] An array of payment channels to control what channels you want to make available for the user to make a payment with. Available channels include; [ 'card' , 'bank' , 'ussd' , 'transfer' ]]
   * @arg {object} [transactionData.metadata] Object that contains any additional information that you want to record with the transaction. The custom fields in the object will be returned via webhook and the payment verification endpoint.
   * @arg {boolean} [transactionData.passCharge] This takes two possible values: True or False. It is set to False by default. When set to True, the charges on the transaction is computed and passed on to the customer(payer). But when set to False, the charge is passed to the merchant and will be deducted from the amount to be settled to the merchant.
   * @arg {string} [transactionData.subMerchantId] This is the ID of a merchant that was created by an aggregator which allows the aggregator initiate a transaction on behalf of the submerchant. This argeter is an optional field that is passed only by a registered aggregator.
   * @arg {boolean} [tokenizeCard] This is to tokenize a card. Adding this to the initiate payload when calling the initiatePayment method,  will automatically be tokenize the card. The unique token code will automatically be added to the webhook notification that will be received after payment. @see https://squadinc.gitbook.io/squad-api-documentation/payments/initiate-payment
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
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }

  /**
   * @desc This allows you charge a card using the token generated during the initiate transaction which was sent via webhook
   * @function
   * @arg transactionData
   * @arg {number} transactionData.amount - The amount to charge
   * @arg {string} transactionData.tokenId - The unique tokenization code for each card transaction and it is returned via the webhook for first charge on the card.
   * @arg {string} [transaction.transactionRef] - Optional The transaction reference string. . If you do not pass this argeter, Squad will generate a unique reference for you.
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
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }

  /**
   * @desc This is method allows you to query the status of a particular
   * transaction using the unique transaction reference attached to the transaction.
   * @function
   * @arg {string} transactionRef - The unique transaction reference attached to the transaction.
   */
  public async verifyTransaction(
    transactionRef: VerifyTransactionProps | string
  ): Promise<VerifyTransactionResponseProps> {
    if (!transactionRef) throw new Error("Transaction reference is required!");

    try {
      const squadResponse = await this.Axios.get(
        `${this.basePaymentUrl}/verify/${transactionRef}`
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }

  /**
   * @desc This method is used to create a simple payment link.
   * All calls to this end point is to be made using your secret
   * key gotten from your dashboard.
   *
   * @arg transactionData
   * @arg {string} transactionData.name - The title/name of the payment link
   * @arg {string} transactionData.hash - The unique string that identifies each payment link (cannot exceed 255 characters)
   * @arg {number} transactionData.linkStatus - This is the status of the payment link. It can either be active or inactive. 0 for inactive and 1 for active.
   * @arg {Date} transactionData.expireBy - This is the date the payment link expires. Sample: 2021-04-26T11:22:08.587Z
   * @arg {number} transactionData.amount - The amount to be paid via the payment link
   * @arg {string} transactionData.currencyId - The currency to be used for the payment link. Allowed values are NGN and USD
   * @arg {string} transactionData.description - This describes what the payment link does
   * @arg {string} transactionData.redirectLink - This is the URL to be redirected to after the payment is completed. If not provided
   * The URL on the dashboard will be used.
   * @arg {string} transactionData.returnMsg - The message to be displayed to the customer after the payment via the link.
   */
  public async createPaymentLink(
    transactionData: PaymentLinkProps
  ): Promise<PaymentLinkResponseProps> {
    if (typeof transactionData !== "object")
      throw new Error("Validation Error! Invalid transaction data.");

    const dataToSend = {
      name: transactionData.name,
      hash: transactionData.hash,
      link_status: transactionData.linkStatus,
      expire_by: transactionData.expireBy,
      amounts: [
        {
          amount: transactionData.amount,
          currency_id: transactionData.currencyId,
        },
      ],
      description: transactionData.description,
      redirect_link: transactionData.redirectLink,
      return_msg: transactionData.returnMsg,
    };

    try {
      /**
       * @summary You might've noticed I didn't use the this.basePaymentUrl
       * Well, this method isn't part of the payment module. Actually this endpoint isn't grouped together with their payment endpoint.
       * But it makes more sense to add it to the SDK. Since the class is SquadPayment class, then anything related to payment should be there.
       * You get the vibe 😀
       */

      const squadResponse = await this.Axios.post(
        `/payment_link/otp`,
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }

  /**
   * This method is used to initiate refund process on a successful transaction.
   * @arg transactionData
   * @arg {string} transactionData.gatewayTransactionRef - The unique reference that uniquely identifies the medium
   * of payment and can be obtained from the webhook notification sent to you.
   * @arg {string} transactionData.transactionRef - The unique reference that identifies a transaction.
   * this can be obtained from the dashboard or the webhook notification sent to you.
   *
   * @arg {string} transactionData.refundType - This can either be Full or Partial
   * @arg {string} transactionData.reasonForRefund- The reason for initiating the refund
   * @arg {number} transactionData.refundAmount - The amount to be refunded. This should be speficified only if the refund type is Partial
   *
   * Also this method isn't part of the payment module. Actually this endpoint isn't grouped together with their payment endpoint.
   * But it makes sense to add anything related to payment in the same module
   */
  public async refund(
    transactionData: RefundProps
  ): Promise<RefundResponseProps> {
    if (typeof transactionData !== "object")
      throw new Error("Validation Error! Invalid transaction data");

    interface DataToSend {
      gateway_transaction_ref: string;
      transaction_ref: string;
      refund_type: "Full" | "Partial";
      reason_for_refund: string;
      refund_amount?: number;
    }

    const dataToSend: DataToSend = {
      gateway_transaction_ref: transactionData.gatewayTransactionRef,
      transaction_ref: transactionData.transactionRef,
      refund_type: transactionData.refundType,
      reason_for_refund: transactionData.reasonForRefund,
    };

    if (transactionData.refundType === "Partial") {
      dataToSend.refund_amount = transactionData.refundAmount;
    }

    try {
      const squadResponse = await this.Axios.post(
        "/transaction/refund",
        dataToSend
      );

      return squadResponse.data;
    } catch (error: any) {
      console.warn(error?.response?.data?.message);
      return error?.response?.data;
    }
  }
}
