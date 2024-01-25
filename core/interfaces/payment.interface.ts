import type { BaseResponseProps } from "./base-response";

export interface InitiatePaymentProps {
  amount: number;
  email: string;
  initiateType: string;
  currency: string | "NGN" | "USD";
  transactionRef?: string;
  customerName?: string;
  callbackUrl?: string;
  paymentChannels?: string[];
  metadata?: object;
  passCharge?: boolean;
  subMerchantId?: string;
}

export interface InitiatePaymentResponseProps extends BaseResponseProps {
  data?: {
    merchantInfo?: {
      merchant_logo: string;
      merchant_id: string;
    };

    currency: string;
    recurring: {
      type: number;
    };

    is_recurring: boolean;
    callback_url: string;
    transaction_ref: string;
    authorized_channels: string[];
    checkout_url: string;
  };
}

export interface ChargeCardProps {
  amount: number;
  tokenId: string;
  transactionRef?: string;
}

export interface ChargeCardResponseProps extends BaseResponseProps {
  data: {
    transaction_amount: number;
    transaction_ref: string | null;
    email: string | null;
    transaction_status: string | null;
    transaction_currency_id: string | null;
    created_at: Date;
    transaction_type: string | null;
    merchant_name: string | null;
    merchant_business_name: string | null;
    gateway_transaction_ref: string | null;
    recurring: any;
    merchant_email: string | null;
    plan_code: any;
  };
}

export interface VerifyTransactionProps {
  transactionRef: string;
}

export interface VerifyTransactionResponseProps extends BaseResponseProps {
  data: {
    transaction_amount: number;
    transaction_ref: string;
    email: string;
    transaction_status: string;
    transaction_currency_id: string | "NGN" | "USD";
    created_at: Date;
    transaction_type: string;
    merchant_name: string;
    merchant_business_name: string | null;
    gateway_transaction_ref: string;
    recurring: null;
    merchant_email: string;
    plan_code: null;
  };
}

export interface PaymentLinkProps {
  name: string;
  hash: string;
  linkStatus: 0 | 1;
  expireBy: Date;
  amount: number;
  currencyId: string | "NGN" | "USD";
  description: string;
  redirectLink?: string;
  returnMsg?: string;
}

export interface PaymentLinkResponseProps extends BaseResponseProps {
  data: {
    name: string;
    link_type: string;
    hash: string;
    description: string;
    currencies: any | null;
    redirect_link: string;
    return_msg: string;
    support_email: any | null;
    support_phone: any | null;
    terms_condition: any | null;
    return_policy: any | null;
    pickup_location: any | null;
    expire_by: Date;
    merchant_id: string;
    link_status: 1 | 0;
    extra: any | null;
    createdAt: Date;
    updatedAt: Date;
    archivedAt: any | null;
    image_id: any;
    image: any;
    amounts: [
      {
        amount: number;
        currency_id: string | "NGN" | "USD";
      }
    ];
  };
}
