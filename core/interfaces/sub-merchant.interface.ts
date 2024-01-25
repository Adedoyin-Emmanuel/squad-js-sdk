import type { BaseResponseProps } from "./base-response";

export interface SubMerchantProps {
  displayName: string;
  accountName: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
}

export interface SubMerchantResponseProps extends BaseResponseProps {
  status: number;
  success: true;
  message: string;
  data: {
    account_id: string;
  };
}
