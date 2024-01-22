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

export interface InitiatePaymentResponseProps {
  status: number;
  success: boolean;
  message: string;
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
  tokenId: number;
  transactionRef?: string;
}

export interface ChargeCardResponseProps extends InitiatePaymentResponseProps {}
