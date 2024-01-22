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
    transaction_ref: null;
    email: null;
    transaction_status: null;
    transaction_currency_id: null;
    created_at: Date;
    transaction_type: null;
    merchant_name: null;
    merchant_business_name: null;
    gateway_transaction_ref: null;
    recurring: null;
    merchant_email: null;
    plan_code: null;
  };
}
