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

export interface BaseResponseProps {
  status: number;
  success: boolean;
  message: string;
  data?: {};
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
