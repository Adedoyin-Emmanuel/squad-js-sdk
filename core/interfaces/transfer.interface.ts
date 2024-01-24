import type { BaseResponseProps } from "./base-response";

export interface AccountLookupResponseProps extends BaseResponseProps {
  data: {
    account_name: string;
    account_number: string;
  };
}
