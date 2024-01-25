import type { BaseResponseProps } from "./base-response";

export interface WalletBalanceResponseProps extends BaseResponseProps {
  data : {
    balance: string;
    currency_id: "NGN";
    merchant_id: string;
  } ;
}
