import type { BaseResponseProps } from "./base-response";

export interface AccountLookupResponseProps extends BaseResponseProps {
  data: {
    account_name: string;
    account_number: string;
  };
}

export interface FundsTransferProps {
  remark: string;
  bankCode: string;
  currencyId: string | "NGN";
  amount: string;
  accountNumber: string;
  transactionReference: string;
  accountName: string;
}

export interface FundsTransferReponseProps extends BaseResponseProps {
  data: {
    account_number_credited: string;
    amount_debited: string;
    total_amount_debited: string;
    success: boolean;
    recipient: string;
    bank_code: number;
    transaction_reference: string;
    transaction_status: string;
    switch_transaction: null | any;
  };
}
