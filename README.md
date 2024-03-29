![](/assets/squad-logo-2.png)

**Squad JavaScript SDK**. Built with ❣️ by Adedoyin Emmanuel Adeniyi.

<div style="display: flex; justify-content: center;">
<a href="https://wakatime.com/badge/user/1cf7c976-595a-4fc7-a7c4-324b43a74aca/project/018d2d43-9140-4391-b832-53a6dd41bfaa"><img src="https://wakatime.com/badge/user/1cf7c976-595a-4fc7-a7c4-324b43a74aca/project/018d2d43-9140-4391-b832-53a6dd41bfaa.svg" alt="wakatime"></a>
  <a href="https://github.com/adedoyin-emmanuel/squad-js-sdk/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/adedoyin-emmanuel/squad-js-sdk.svg?style=social"></a>
  <a href="https://github.com/adedoyin-emmanuel/squad-js-sdk/network/members"><img alt="GitHub forks" src="https://img.shields.io/github/forks/adedoyin-emmanuel/squad-js-sdk.svg?style=social"></a>
  <a href="https://github.com/adedoyin-emmanuel/squad-js-sdk/releases"><img alt="GitHub downloads" src="https://img.shields.io/github/downloads/adedoyin-emmanuel/squad-js-sdk/total.svg"></a>
</div>

# Table Of Content

- [Table Of Content](#table-of-content)
  - [Introduction 🚀](#introduction-)
    - [Why Did I Build This? 🤔](#why-did-i-build-this-)
    - [Squad Js SDK Features 🚀](#squad-js-sdk-features-)
  - [Installation 💽](#installation-)
  - [Usage 🚦](#usage-)
    - [SDK Typed Response](#sdk-typed-response)
    - [Initiate Payment Method](#initiate-payment-method)
      - [Parameters](#parameters)
      - [Example](#example)
    - [Charge Card Method](#charge-card-method)
      - [Parameters](#parameters-1)
      - [Example](#example-1)
    - [Verify Transaction Method](#verify-transaction-method)
      - [Parameters](#parameters-2)
      - [Example](#example-2)
    - [Create Payment Link Method](#create-payment-link-method)
      - [Parameters](#parameters-3)
      - [Example](#example-3)
    - [Refund Method](#refund-method)
      - [Parameters](#parameters-4)
      - [Example](#example-4)
    - [Create Sub Merchant Method](#create-sub-merchant-method)
      - [Parameters](#parameters-5)
      - [Example](#example-5)
    - [Create Virtual Account Method](#create-virtual-account-method)
      - [Parameters](#parameters-6)
      - [Example](#example-6)
    - [Create Business Virtual Account Method](#create-business-virtual-account-method)
      - [Parameters](#parameters-7)
      - [Example](#example-7)
    - [Get Webhook Error Log Method](#get-webhook-error-log-method)
      - [Parameter](#parameter)
      - [Example](#example-8)
    - [Delete Webhook Error Log](#delete-webhook-error-log)
      - [Parameters](#parameters-8)
      - [Example](#example-9)
    - [Find Customer Transaction By Id](#find-customer-transaction-by-id)
      - [Parameters](#parameters-9)
      - [Example](#example-10)
    - [Find All Merchant Transactions](#find-all-merchant-transactions)
      - [Parameters](#parameters-10)
      - [Example](#example-11)
    - [Find All Merchant Transactions By Filter](#find-all-merchant-transactions-by-filter)
      - [Parameters](#parameters-11)
      - [Example](#example-12)
    - [Get Customer Virtual Account Details Method](#get-customer-virtual-account-details-method)
      - [Parameters](#parameters-12)
      - [Example](#example-13)
    - [Update Customer BVN Method](#update-customer-bvn-method)
      - [Parameters](#parameters-13)
      - [Example](#example-14)
    - [Find All Merchant Virtual Account Method](#find-all-merchant-virtual-account-method)
      - [Parameters](#parameters-14)
      - [Example](#example-15)
    - [Update Beneficiary Account Method](#update-beneficiary-account-method)
      - [Parameters](#parameters-15)
      - [Example](#example-16)
    - [Simulate Virtual Account Payment Method](#simulate-virtual-account-payment-method)
      - [Parameters](#parameters-16)
      - [Example](#example-17)
    - [Create Dynamic Virtual Account Method](#create-dynamic-virtual-account-method)
      - [Parameters](#parameters-17)
      - [Example](#example-18)
    - [Get Pool Count Method](#get-pool-count-method)
      - [Parameters](#parameters-18)
      - [Example](#example-19)
    - [Initiate Dynamic Virtual Account Transaction Method](#initiate-dynamic-virtual-account-transaction-method)
      - [Parameters](#parameters-19)
      - [Example](#example-20)
    - [Re-query Dynamic Virtual Account Transaction Method](#re-query-dynamic-virtual-account-transaction-method)
      - [Parameters](#parameters-20)
      - [Returns](#returns)
      - [Example](#example-21)
    - [Update Dynamic Virtual Account Transaction Amount Method](#update-dynamic-virtual-account-transaction-amount-method)
      - [Parameters](#parameters-21)
      - [Returns](#returns-1)
      - [Example](#example-22)
    - [Account Lookup Method](#account-lookup-method)
      - [Parameters](#parameters-22)
      - [Returns](#returns-2)
      - [Example](#example-23)
    - [Transfer Funds Method](#transfer-funds-method)
      - [Parameters](#parameters-23)
      - [Returns](#returns-3)
      - [Example](#example-24)
    - [Re-query Funds Transfer Method](#re-query-funds-transfer-method)
      - [Parameters](#parameters-24)
      - [Returns](#returns-4)
      - [Example](#example-25)
    - [Get All Transfers Method](#get-all-transfers-method)
      - [Parameters](#parameters-25)
      - [Returns](#returns-5)
      - [Example](#example-26)
    - [Get Wallet Balance Method](#get-wallet-balance-method)
      - [Parameters](#parameters-26)
      - [Returns](#returns-6)
      - [Example](#example-27)
    - [Get All Disputes Method](#get-all-disputes-method)
      - [Parameters](#parameters-27)
      - [Returns](#returns-7)
      - [Example](#example-28)
    - [Get Dispute File Upload Url Method](#get-dispute-file-upload-url-method)
      - [Parameters](#parameters-28)
      - [Example](#example-29)
    - [Resolve Dispute Method](#resolve-dispute-method)
      - [Parameters](#parameters-29)
      - [Example](#example-30)
    - [Get All POS Transactions](#get-all-pos-transactions)
      - [Parameters](#parameters-30)
      - [Returns](#returns-8)
      - [Example](#example-31)

## Introduction 🚀

Simplify the integration process with Squad's comprehensive payment solutions using the Squad JavaScript SDK. This SDK provides an easy-to-use, chainable interface for developers to seamlessly incorporate Squad's features into their JavaScript applications. Built with ❣️ by Adedoyin Emmanuel Adeniyi.

### Why Did I Build This? 🤔

Okay, good question. While this **SDK** is a game changer for anyone working with **Squad Payment Gateway** in their application. The features of this **SDK** can be found here. [SDK Features](https://github.com/adedoyin-emmanuel/squad-js-sdk/). I also built this **SDK** as a point of contact to the **SquadCo Team**. I haven't seen a company that I'm soo intrested in working that than **Squad**. I really love what they're building and I would love to be part of the team. After the hackathon, I fell in love with their product and I've been preaching the gosple of their product in every possible way.

### Squad Js SDK Features 🚀

Why should you use the **Squad JS SDK** 🤔 ?

- **Effortless Integration:** The Squad Js SDK streamlines the integration process, allowing users to interact with SquadCo Payment APIs seamlessly.

- **Accelerated Development:** With simplified methods and enhanced autocompletion, developers can ship their products faster, reducing time-to-market.

- **Minimal API Interaction:** Users can achieve robust payment functionalities without directly interacting with the Squad Payment APIs, making development more straightforward.

- **Typed Responses:** The Squad Js SDK provides automatic type definitions for API responses, ensuring robust and error-free code. Now, responses are effortlessly typed, offering developers a more structured development experience.

- **TypeScript / JavaScript Autocompletion:** Leverage TypeScript / JavaScript autocompletion for a smoother development process. The SDK seamlessly integrates with TypeScript, enhancing developer productivity by providing accurate suggestions and reducing errors. This also works with JavaScript.

- **Comprehensive JSDoc Support:** Enjoy thorough JSDoc support that enhances code documentation. Developers can benefit from descriptive and comprehensive information right at their fingertips, making it easier to understand and utilize the SDK's capabilities.

- **Efficient Error Handling:** The SDK facilitates efficient error handling, providing detailed information for better debugging. Developers can easily identify and resolve issues, ensuring a more reliable integration.

- **Intuitive Webhook Management:** Manage webhook transactions effortlessly. The SDK introduces clear methods for retrieving and deleting webhook error logs, ensuring a smooth and error-free webhook integration.

These enhancements aim to provide developers with a more powerful, flexible, and enjoyable experience when integrating [SquadCo Payment APIs](https://squadco.com) into their applications.

## Installation 💽

To install the **SDK** in your application, you can install using `npm, yarn, pnpm or bun`

**Npm**

```bash

npm install @squadco/js

```

**Yarn**

```bash
yarn add @squadco/js

```

**Bun**

```bash
bun add @squadco/js

```

## Usage 🚦

Though **Squad Js SDK** provides easy methods that can be used even without reading documentation, I will still do my best to explain each **SDK** method. To use the **Squad JS SDK**. You've to import the **CreateSquadClient** from the **@squadco/js** package. That class provides the interface to work with the **SDK**.

```typescript
import CreateSquadClient from "@squadco/js";
```

Then we create a new instance of the **CreateSquadClient** which allows us to interact with the the methods in the **CreateSquadClient**. It takes 3 arguments.

1. The Squad Public Key
2. The Squad Private Key
3. The Environment.

The Public and Private Key can be gotten from the **Squad** website. <https://sandbox.squadco.com/sign-up> or <https://dashboard.squadco.com/sign-up>

```typescript
const squad = new CreateSquadClient(
  process.env.SQUAD_PUBLIC_KEY as string,
  process.env.SQUAD_PRIVATE_KEY as string,
  process.env.NODE_ENV as string
);
```

### SDK Typed Response

The **SDK** provides **typed responses** for every method call. There is always a base response object for every method call. With this, you can determine the status of each method call, the response type (success or fail)
and the response message, just like a traditional **API** call. This is useful so that you can catch errors easily and also know the status of each method call so you can tailor your application to respond accordingly.

```typescript
export interface BaseResponseProps {
  status: number;
  success: boolean;
  message: string;
  data?: {};
}
```

So from every method call, I can determine the method status, if it successful, the message and the data returned from the method.

Assuming that we want to initiate a payment, once we call the `initiatePayment` method, we can get the `typed response` directly from the variable the method call was assigned to. We can then redirect the user to the payment page is the method returns a success response.

```typescript

const response = await squad.initiatePayment({
  amount: 20000,
  email: "adedoyine535@gmail.com",
  initiateType: "inline",
  currency: "NGN",
  customerName: "Adedoyin Emmanuel Adeniyi",
  callbackUrl: "https://github.com/adedoyin-emmanuel",
}, tokenizeCard: false);

// check if the response was successful, if not, return a response to the client.

if(!response.success)
  return res.status(response.status).json({message:response.message});

// Response was successful, I can now get the checkout_url

const checkoutUrl = response.data.checkout_url;

// redirect the client to the checkout_url

res.redirect(checkoutUrl); // assuming you are using express JS
```

### Initiate Payment Method

This method allows you to initiate a transaction by making calls from your server which returns a URL that when visited will call up SQUAD payment modal. This method takes 2 parameters. An object called the transactionData and a boolean parameter called tokenizeCard. The transactionData is of type `InitiatePaymentProps`. It takes the following properties.

#### Parameters

- `transactionData` (Object): Data for the transaction.
  - `amount` (String): The amount to debit from the customer (expressed in the lowest currency value - kobo & cent). 10000 = 100NGN for Naira Transactions.
  - `email` (String): Email address of the client making payment.
  - `initiateType` (String): Method by which the transaction is initiated. Currently, only "inline" is supported. [More details](https://squadinc.gitbook.io/squad-api-documentation/payments/initiate-payment)
  - `currency` (String): Currency for charging the amount. Allowed values: NGN or USD.
  - `transactionRef` (String, optional): An alphanumeric string uniquely identifying a transaction.
  - `customerName` (String, optional): Name of the customer carrying out the transaction.
  - `callbackUrl` (String, optional): URL to redirect the user to after the transaction is completed.
  - `paymentChannels` (Array, optional): Array of payment channels to make available for the user to make a payment. Available options: ['card', 'bank', 'ussd', 'transfer']
  - `metadata` (Object, optional): Additional information to record with the transaction. Custom fields will be returned via webhook and the payment verification endpoint.
  - `passCharge` (Boolean, optional): Takes values True or False. Set to False by default. When True, charges on the transaction are passed on to the customer (payer). When False, the charge is passed to the merchant and deducted from the settlement amount.
  - `subMerchantId` (String, optional): ID of a merchant created by an aggregator to initiate a transaction on behalf of the submerchant.
  - `tokenizeCard` (Boolean, optional): Tokenizes a card. When included in the initiate payload, it automatically tokenizes the card, and the unique token code will be added to the webhook notification received after payment. [More details](https://squadinc.gitbook.io/squad-api-documentation/payments/initiate-payment)

#### Example

```typescript
const response = await squad.initiatePayment({
  amount: 20000,
  email: "adedoyine535@gmail.com",
  initiateType: "inline",
  currency: "NGN",
  customerName: "Adedoyin Emmanuel Adeniyi",
  callbackUrl: "https://github.com/adedoyin-emmanuel",
}, tokenizeCard: false);
```

As you know, the SDK comes with `Typed Responses` which means automatic type definitions for API responses. You can easily redirect the user to the checkout url

```typescript
const checkoutUrl = response.data.checkout_url;

//redirect the client to the checkout url. Assuming you're using express
res.redirect(checkoutUrl);
```

### Charge Card Method

Charges a card using the token generated during the initiate transaction, which is sent via webhook. Remember that you must pass the tokenize argument with the `initiatePayment` method when the card is first charged.

#### Parameters

- `transactionData` (Object): Data for the charge.
  - `amount` (Number): The amount to charge.
  - `tokenId` (String): The unique tokenization code for each card transaction, returned via the webhook for the first charge on the card.
  - `transactionRef` (String, optional): Optional transaction reference string.

#### Example

```typescript
const response = await squad.chargeCard({
  amount: "10000",
  tokenId: "token12356",
  transactionRef: "TRANS_002ZQ391",
});
```

### Verify Transaction Method

This is method allows you to query the status of a particular transaction using the unique transaction reference attached to the transaction.

#### Parameters

- `transactionRef` (String): The transaction reference string.

#### Example

```typescript
const response = await squad.verifyTransaction("TRANS_12345");
console.log(response.data.transaction_status);
```

### Create Payment Link Method

This is method allows you to create a simple payment link.

#### Parameters

- `transactionData` (Object).
  - `name` (String): The title or name of the payment link.
  - `hash` (String): The unique string that identifies the payment link (cannot exceed 255 characters)
  - `linkStatus` (Number): This can either be 0 or 1. 0 for inactive, 1 for active.
  - `expireBy` (Date): This is the date the payment link expires. Sample: 2021-04-26T11:22:08.587Z
  - `amount` (String): The amount to be paid via the payment link.
  - `currencyId` (String): The currency to be used for the payment link. Allowed values are NGN and USD
  - `description` (String): What the payment link does.
  - `redirectLink` (String): The URL to redirect the user to after the payment is completed. If not provided, the URL on the dashboard will be used.
  - `returnMsg` (String): The message to display to the user when the payment is completed.

#### Example

```typescript
const response = await squad.createPaymentLink({
  name: "NITHUB Devs Party",
  hash: `emmysoft ${Math.floor(Math.random() * 100000)}`, // Use something more randomized here.
  linkStatus: 1,
  expireBy: new Date("2024-09-14").toISOString(),
  amount: 200000,
  currencyId: "NGN",
  description: "Contributions for confectionaries ",
});
```

### Refund Method

This method is used to initiate refund process on a successful transaction.

#### Parameters

- `transactionData` (Object).
  - `gatewayTransactionRef` (String): The unique reference that uniquely identifies the medium of payment and can be obtained from the webhook notification sent to you.
  - `transactionRef` (String): The unique reference that identifies a transaction.
  - `refundType` (String): This can either be Full or Partial.
  - `reasonForRefund` (String): The reason for initiating the refund.
  - `refundAmount` (String): The amount to be refunded. This should be speficified only if the refund type is Partial

#### Example

```typescript
const response = await squad.refund({
  gatewayTransactionRef: "12345",
  transactionRef: "TRANS_12345",
  reasonForRefund: "Customer is not satusfied with product purchase",
  refundType: "Full",
});
```

### Create Sub Merchant Method

This method allows you to be profiled as an aggregator and also create sub-merchants dynamically under your account.

#### Parameters

- `transactionData` (Object).
  - `displayName` (String): The name of the sub-merchant
  - `accountName` (String): The sub-merchant's settlement bank account name
  - `accountNumber` (String): The sub-merchant's account number
  - `bankCode` (String): The sub-merchant's settlement bank code
  - `bankName` (String): The sub-merchant's settlement bank name eg GTBank

#### Example

```typescript
const response = await squad.createSubMerchant({
  displayName: "Adedoyin Emmanuel Adeniyi",
  accountName: "Emmysoft's Account",
  accountNumber: "000000000",
  bankCode: "054",
  bankName: "GtBank",
});
```

### Create Virtual Account Method

This method is used to create virtual account for individuals/customer on your platform. Please note that there is a strict validation of the BVN against the names, Date of Birth and Phone Number. (B2C).

#### Parameters

- `transactionData` (Object).
  - `firstName` (String): The first name of the customer
  - `lastName` (String): The last name of the customer
  - `middleName` (String): The middle name of the customer
  - `mobileNumber` (String): The mobile number of the customer
  - `dob` (String): The date of birth of the customer
  - `email` (String): The email address of the customer
  - `bvn` (String): The bvn number of the customer
  - `gender` (String): The gender of the customer. 1 = Male 2 = Female
  - `address` (String): The address of the customer
  - `customerIdentifier` (String): The unique identifier of the customer given by merchant
  - `beneficiaryAccount` (String): The 10 digit Bank Account Number (GtBank) provided by the merchant where money sent to this virtual account is paid into. **NB** If this is not provided, money paid into this virtual account goes into your wallet and will be paid out/settled in T+1 settlement time.

#### Example

```typescript
const response = await squad.createVirtualAccount({
  firstName: "Adedoyin",
  lastName: "Emmanuel",
  middleName: "Adeniyi",
  mobileNumber: "09083927493",
  dob: "08/28/2002",
  email: "adedoyine535@gmail.com",
  bvn: "101020304858",
  gender: "1",
  address: "28, Typhoon Trophy street",
  customerIdentifier: "Emmysoft",
});
```

### Create Business Virtual Account Method

This method allows you to create virtual accounts for your customers who are businesses and not individuals. That is, these customers are actually businesses (B2B) or other merchants. Please note that due to CBN's Guidelines on validation before account creation as well as other related Fraud concerns, you are required to request for profiling before you can have access to create accounts for businesses. Once profiled, you can go ahead and keep creating accounts for your businesses.

#### Parameters

- `transactionData` (Object).
  - `bvn` (String): The business bvn
  - `businessName` (String): The name of the business
  - `customerIdentifier` (String): The unique identifier given to the customer
  - `mobileNumber` (String): The mobile number of the business
  - `beneficiaryAccount` (String): This is the 10 Digit Bank Account Number (GTBank) where money sent to this Virtual account is paid into. Please note that when beneficiary account is not provided, money paid into this virtual account go into your wallet and will be paid out/settled in T+1 settlement time.

#### Example

```typescript
const response = await squad.createBusinessVirtualAccount({
  bvn: "102034959686",
  businessName: "EMT",
  mobileNumber: "09029595867",
  customerIdentifier: "EmmysoftTech_28",
  beneficiaryAccount: "0000000000",
});
```

### Get Webhook Error Log Method

This method allows you retrieve all your missed webhook transactions and use it to update your record without manual input.The top 100 missed webhook will always be returned by default and it This flow involves integration of two(2) APIs Once you have updated the record of a particular transaction, you are expected to use the second API to delete the record from the error log. If this is not done, the transaction will continuously be returned to you in the first 100 transactions until you delete it. This will only work for those who respond correctly to our webhook calls. Also, ensure you have a transaction duplicate checker to ensure you don't update a record twice or update a record you have updated using the webhook or the transaction API.

#### Parameter

- `page` (Number): The page you are on.
- `perPage` (Number): The number of records you want to appear on a page.

#### Example

```typescript
const response = await squad.getWebhookErrorLog(1, 0);
```

### Delete Webhook Error Log

This method enables you delete a processed transaction from the webhook error log. When you delete the transaction from the log, it won't be returned to you again. Failure to delete a transaction will result in the transaction being returned to you in the top 100 transactions returned each time you retry.

#### Parameters

- `transactionRef` (String) - The unique reference that identifies a transaction.

#### Example

```typescript
const response = await squad.deleteWebhookErrorLog("SQEMMY6384147273871800005");
```

### Find Customer Transaction By Id

This is a method to query the transaction a customer has made. This is done using the customer's identifier which was passed when creating the virtual account.

#### Parameters

- `customerIdentifier` (String) - The unique identifier given to the customer.

#### Example

```typescript
const response = await squad.findCustomerTransactionById(
  "SQEMMY6384147273871800005"
);
```

### Find All Merchant Transactions

This is a method to query all the merchant transactions over a period of time.

#### Parameters

None

#### Example

```typescript
const response = await squad.findAllMerchantTransactions();
```

### Find All Merchant Transactions By Filter

This method allows you to query all transactions and filter using multiple parameters like virtual account number, start and end dates, customer Identifier, etc.

#### Parameters

- `filters` (Object).
  - `page` (Number): The page number to display
  - `perPage` (Number): The number of records to display
  - `virtualAccount` (String): The virtual account, a 10-digit virtual account number
  - `customerIdentifier` (String): The unique customer identifier used to identify a customer account
  - `startDate` (String): The start date
  - `endDate` (String): The end date
  - `transactionReference`: The transaction reference
  - `sessionId` (String): The session identifier of the transaction
  - `dir` (String): Takes 2 possible values ASC (Ascending) or DESC (Descending order)

#### Example

```typescript
const response = await squad.findAllMerchantTransactionsByFilter({
  page: 1,
  perPage: 50,
  startDate: "01/01/2024",
  endDate: "01/20/2024",
});
```

### Get Customer Virtual Account Details Method

This method retrives the details of a customer using the Virtual Account Number.

#### Parameters

- `virtualAccountNumber` (String) -The virtual account, a 10-digit virtual account number.

#### Example

```typescript
const response = await squad.getCustomerVirtualAccountDetails("Emmysoft123");
```

### Update Customer BVN Method

This method is used to update customer's BVN and Unfreeze transaction

#### Parameters

- `customerBvn` (String) - The bank verfication number of the customer
- `customerIdentifier` (String) - The unique number given to customer by merchant
- `phoneNumber` (String) - The phone number of the customer

#### Example

```typescript
const response = await squad.updateCustomerBvn(
  "1234567890",
  "Emmysoft123",
  "09037583927"
);
```

### Find All Merchant Virtual Account Method

This is a method for merchants to query and retrieve all their virtual account.

#### Parameters

- `page` (Number): The page number to display
- `perPage` (Number): The number of records to display
- `startDate` (String): The start date in format YY-MM-DD
- `endDate` (String): The end date in format YY-MM-DD

#### Example

```typescript
const response = await squad.findAllMerchantVirtualAccounts(1, 1);
```

### Update Beneficiary Account Method

This method is used to update beneficiary account

#### Parameters

- `beneficiaryAccount` (String): The 10 digit valid NUBAN account number
- `virtualAccountNumber` (String): The virtual account number whose beneficiary account to be updated

#### Example

```typescript
const response = await squad.updateBeneficiaryAccount(
  "0000000000",
  "0001010203"
);
```

### Simulate Virtual Account Payment Method

This method allows you to simulate payment. ⚠️ This should be done on test environment only !!

#### Parameters

- `virtualAccountNumber` (String): The virtual account of customer that wants to make payment
- `amount` (String): The simulated amount
- `dva` (Boolean): True

#### Example

```typescript
const response = await squad.simulateVirtualAccountPayment(
  "0000000000",
  "20000"
);
```

### Create Dynamic Virtual Account Method

This method allows you create and assign dynamic virtual accounts to your pool. Only one account is generated per request.

#### Parameters

None

#### Example

```typescript
const response = await squad.createDynamicVirtualAccount();
```

### Get Pool Count Method

This method gives you the total count of the virtual accounts you have in your pool.

#### Parameters

None

#### Example

```typescript
const response = await squad.getPoolCount();
```

### Initiate Dynamic Virtual Account Transaction Method

This method allows you generate a Dynamic Virtual Account to be assigned to a customer. This is used to initiate a transaction.

#### Parameters

- `amount` (String): The amount is in Kobo
- `duration` (Number): The time allowed before an account/transaction is expired. Duration is in seconds (ie) 60 = 1 minute
- `email`: (String): The valid email address to notify customers
- `transactionRef`: (String): A unique transaction reference that identifies the transaction on your system.

#### Example

```typescript
const response = await squad.initiateDynamicVirtualAccountTransaction(
  "50000",
  60,
  "adedoyine535@gmail.com",
  `TRANS_${Math.random() * 200 + 1}`
);
```

### Re-query Dynamic Virtual Account Transaction Method

This method allows you to re-query a transaction to see its status. It returns an array of all transaction attempts made, including mismatches, expired attempts, and the successful transaction. Ultimately, all expired and mismatched transactions will eventually be refunded.

#### Parameters

- `transactionRef` (String): Merchant's transaction reference passed when initiating/generating the dynamic virtual account.

#### Returns

- `Promise<ReQueryDynamicVirtualAccountResponseProps>`: An array of all transaction attempts made, including mismatches, expired attempts, and the successful transaction.

#### Example

```typescript
const response = await squad.reQueryDynamicVirtualAccountTransaction(
  "TRANSACTION_REFERENCE_HERE"
);
```

### Update Dynamic Virtual Account Transaction Amount Method

This method allows you to update the amount and duration of a dynamic virtual account transaction.

#### Parameters

- `amount` (String): Amount in Kobo.
- `transactionReference` (String): Transaction reference of the already initiated transaction.
- `duration` (Number): Amount of time before the transaction expires. Duration is in seconds (e.g., 60 = 1 minute).

#### Returns

- `Promise<BaseResponseProps>`: A response indicating the success or failure of the update operation.

#### Example

```typescript
const response = await squad.updateDynamicVirtualAccountTransactionAmount(
  "NEW_AMOUNT_HERE",
  "TRANSACTION_REFERENCE_HERE",
  "DURATION_HERE"
);
```

### Account Lookup Method

This method allows you to lookup/confirm the account name of the recipient you intend to credit before initiating the transfer.

#### Parameters

- `bankCode` (String): The unique NIP code that identifies a bank.
- `accountNumber` (String): The account number you want to transfer to.

#### Returns

- `Promise<AccountLookupResponseProps>`: Details of the account looked up.

#### Example

```typescript
const response = await squad.accountLookup(
  "BANK_CODE_HERE",
  "ACCOUNT_NUMBER_HERE"
);
```

### Transfer Funds Method

This method allows you to transfer funds from your Squad Wallet to the account you have looked up. Please be informed that we will not be held liable for mistake in transferring to a wrong account or an account that wasn't looked up.

#### Parameters

- `transactionData` (FundsTransferRequestProps): Object containing transfer details including:
  - `transactionReference` (String): Unique transaction reference used to initiate a transfer.
  - `amount` (String): Amount to be transferred in Kobo.
  - `bankCode` (String): Unique NIP code that identifies a bank.
  - `accountNumber` (String): 10-digit NUBAN account number to be transferred to.
  - `accountName` (String): The account name tied to the account number you are transferring to.
  - `currencyId` (String): Takes only the value "NGN".
  - `remark` (String): A unique remark that will be sent with the transfer.

#### Returns

- `Promise<FundsTransferReponseProps>`: Details of the transfer made.

#### Example

```typescript
const response = await squad.transferFunds({
  transactionReference: "TRANSACTION_REF_HERE",
  amount: "AMOUNT_HERE",
  bankCode: "BANK_CODE_HERE",
  accountNumber: "ACCOUNT_NUMBER_HERE",
  accountName: "ACCOUNT_NAME_HERE",
  currencyId: "NGN",
  remark: "REMARK_HERE",
});
```

### Re-query Funds Transfer Method

This method allows you to re-query the status of a transfer made to know if it was successful, failed, reversed, or pending.

#### Parameters

- `transactionReference` (String): Unique transaction reference used to initiate a transfer.

#### Returns

- `Promise<FundsTransferReponseProps>`: Details of the transfer status.

#### Example

```typescript
const response = await squad.reQueryFundsTransfer("TRANSACTION_REFERENCE_HERE");
```

### Get All Transfers Method

This method allows you to retrieve the details of all transfers you have done from your Squad Wallet using this transfer solution.

#### Parameters

None

#### Returns

- `Promise<AllTransferResponseProps>`: Details of all transfers made.

#### Example

```typescript
const response = await squad.getAllTransfers();
```

### Get Wallet Balance Method

This method allows you get your Squad Wallet Balance. Please be informed that the wallet balance is in KOBO. (Please note that you can't get wallet balance for Dollar transactions).

#### Parameters

- `currencyId`: (String) - The currency identifier.This can only of value `NGN` for now.

#### Returns

- `Promise<WalletBalanceResponseProps>` - The details of the wallet balance.

#### Example

```typescript
const response = await squad.getWalletBalance("NGN");
```

### Get All Disputes Method

This method is used to get all disputes on your transactions raised by your customers.

#### Parameters

None

#### Returns

- `Promise<DisputeResponseProps>`: Details of all disputes made.

#### Example

```typescript
const response = await squad.getAllDisputes();

// this is an array of `Promise<DisputeResponseProps>
```

### Get Dispute File Upload Url Method

This method is used to get a unique URL to upload an evidence(file) which is a proof or reason to reject a dispute. This is only necessary when we want to reject a dispute.

#### Parameters

- `ticketId`: (String) The unique ID that identifies the dispute you want to reject or accept.
- `fileName`: (String) The name of the file.

#### Example

```typescript
const response = await squad.resolveDisputes(
  "Ticket123",
  "accepted",
  "filename1234"
);
```

### Resolve Dispute Method

This method is called to resolve a dispute. Resolving a dispute means to either accept or reject the dispute.

#### Parameters

- `ticketId`: (String) The unique ID that identifies the dispute you want to reject or accept.
- `fileName`: (String) The name of the file.
- `action`: (String) The action taken for the dispute. Either "accepted" or "rejected"

#### Example

```typescript
const response = await squad.resolveDisputes(
  "Ticket123",
  "accepted",
  "filename1234"
);
```

### Get All POS Transactions

This method retrieves all transactions made on the POS.

#### Parameters

- `page` (Number): The page number.
- `perPage` (Number): The number of transactions per page.
- `dateFrom` (String, optional): Format YYYY-MM-DD start date.
- `dateTo` (String, optional): Format YYYY-MM-DD end date.
- `sort_by_dir` (String, optional): This arranges transactions in ascending or descending order. Possible values are "ASC" or "DESC".

#### Returns

- `Promise<PosInterfaceResponseProps>`: Details of all POS transactions.

#### Example

```typescript
const response = await squad.getAllPosTransactions(
  1,
  10,
  "START_DATE_HERE",
  "END_DATE_HERE",
  "ASC_OR_DESC_HERE"
);
```
