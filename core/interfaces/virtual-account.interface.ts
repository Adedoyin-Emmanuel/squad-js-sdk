import type { BaseResponseProps } from "./base-response";

export interface VirtualAccountProps {
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumber: string;
  dob: string;
  email: string;
  bvn: string;
  gender: string | "1" | "2";
  address: string;
  customerIdentifier: string;
  beneficiaryAccount?: string;
}

export interface VirtualAccountResponseProps extends BaseResponseProps {
  success: true;
  message: string;
  data: {
    first_name: string;
    last_name: string;
    bank_code: string;
    virtual_account_number: string;
    beneficiary_account: string;
    customer_identifier: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface BusinessVirtualAccountProps {
  bvn: string;
  businessName: string;
  customerIdentifier: string;
  mobileNumber: string;
  beneficiaryAccount: string;
}

export interface BusinessVirtualAccountResponseProps extends BaseResponseProps {
  data: {
    first_name: string;
    last_name: string;
    bank_code: string;
    virtual_account_number: string;
    beneficiary_account: string | null;
    customer_identifier: string;
    created_at: Date;
    updated_at: Date;
  };
}

export interface WebhookProps {
  id: string;
  payload: {
    hash: string;
    meta: {
      freeze_transaction_ref: string | null;
      reason_for_frozen_transaction: string | null;
    };
    channel: string;
    remarks: string;
    currency: string | "NGN" | "USD";
    fee_charged: string;
    sender_name: string;
    encrypted_body: string;
    settled_amount: string;
    principal_amount: string;
    transaction_date: string;
    customer_identifier: string;
    transaction_indicator: string;
    transaction_reference: string;
    virtual_account_number: string;
  };
  transactionRef: string;
}

export interface WebhookPropsResponseProps {
  data: {
    count: number;
    rows: WebhookProps[];
  };
}

export interface WebhookDeletionResponseProps extends BaseResponseProps {
  data: string | {};
}

export interface CustomerTransactionProps {
  transaction_reference: string;
  virtual_account_number: string;
  principal_amount: string;
  settled_amount: string;
  fee_charged: string;
  transaction_date: Date;
  transaction_indicator: string | "C";
  remarks: string;
  currency: string | "NGN" | "USD";
  frozen_transaction: {
    freeze_transaction_ref: string;
    reason: string;
  } | null;
  customer: {
    customer_identifier: string;
  };
}
export interface CustomerTransactionResponseProps extends BaseResponseProps {
  data: CustomerTransactionProps[];
}

export interface MerchantTransactionProps {
  transaction_reference: string;
  virtual_account_number: string;
  principal_amount: string;
  settled_amount: string;
  fee_charged: string;
  transaction_date: Date;
  transaction_indicator: string | "C";
  remarks: string;
  currency: string | "NGN" | "USD";
  frozen_transaction: {
    freeze_transaction_ref: string;
    reason: string;
  } | null;
  customer: {
    customer_identifier: string;
  };
}

export interface MerchantTransactionResponseProps extends BaseResponseProps {
  data: MerchantTransactionProps[];
}

export interface MerchantTransactionFiltersProps {
  page?: number;
  perPage?: number;
  virtualAccount?: number;
  customerIdentifier?: string;
  startDate?: Date;
  endDate?: Date;
  transactionReference?: string;
  sessionId?: string;
  dir?: string | "ASC" | "DESC";
}

export interface MerchantTransactionFilterResponseProps
  extends BaseResponseProps {
  transaction_reference: string;
  virtual_account_number: string;
  principal_amount: string;
  settled_amount: string;
  fee_charged: string;
  transaction_date: Date;
  transaction_indicator: string | "C";
  remarks: string;
  currency: string | "NGN" | "USD";
  alerted_merchant: boolean;
  merchant_settlement_date: Date;
  frozen_transaction: {
    freeze_transaction_ref: string;
    reason: string;
  } | null;
  customer: {
    customer_identifier: string;
  };
}

export interface FindCustomerProps {
  first_name: string;
  last_name: string;
  mobile_num: string;
  email: string;
  customer_identifier: string;
  virtual_account_number: string;
}

export interface FindCustomerResponseProps extends BaseResponseProps {
  data: FindCustomerProps | {};
}

export interface CustomerDetailsProps {
  first_name: string;
  last_name: string;
  bank_code: string;
  virtual_account_number: string;
  customer_identifier: string;
  created_at: Date;
  updated_at: Date;
}

export interface CustomerDetailsResponseProps extends BaseResponseProps {
  data: CustomerDetailsResponseProps;
}

export interface MerchantVirtualAccountProps {
  bank_code: string;
  virtual_account_number: string;
  beneficiary_account: string;
  created_at: Date;
  updated_at: Date;
  customer: {
    first_name: string;
    last_name: string;
    customer_identifier: string;
  };
}

export interface MerchantVirtualAccountResponseProps extends BaseResponseProps {
  data: MerchantVirtualAccountProps[];
}

export interface BeneficiaryAccountResponseProps extends BaseResponseProps {
  data: {
    first_name: string;
    last_name: string;
    virtual_account_number: string;
    beneficiary_account: string;
    customer_identifier: string;
  };
}
