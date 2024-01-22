export interface InitiatePaymentProps {
  amount: number;
  email: string;
  initiateType: string;
  currency: "NGN" | "USD";
  transactionRef?: string;
  customerName?: string;
  callbackUrl?: string;
  paymentChannels?: string[];
  metadata?: object;
  passCharge?: boolean;
  subMerchantId?: string;
}
