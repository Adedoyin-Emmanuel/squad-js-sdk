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
