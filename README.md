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
  - [Installation 💽](#installation-)
  - [Usage 🚦](#usage-)
    - [Initiate Payment Method](#initiate-payment-method)

## Introduction 🚀

Simplify the integration process with Squad's comprehensive payment solutions using the Squad JavaScript SDK. This SDK provides an easy-to-use, chainable interface for developers to seamlessly incorporate Squad's features into their JavaScript applications. Built with ❣️ by Adedoyin Emmanuel Adeniyi.

### Why Did I Build This? 🤔

Okay, good question. While this **SDK** is a game changer for anyone working with **Squad Payment Gateway** in their application. I also built this **SDK** as a point of contact to the **SquadCo Team** I haven't seen a company that I'm soo intrested in working that than **Squad**. I really love what they're building and I would love to be part of the team. After the hackathon, I suddenly fell in love with their product and I've been preaching the gosple of their product in every possible way.

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

### Initiate Payment Method

This method allows you to initiate a transaction by making calls from your server which returns a URL that when visited will call up SQUAD payment modal. This method takes 2 parameters. An object called the transactionData and a boolean parameter called tokenizeCard. The transactionData is of type `InitiatePaymentProps`. It takes the following properties.

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

```typescript
const response = squad.initiatePayment({
  amount: 20000,
  email: "adedoyine535@gmail.com",
  initiateType: "inline",
  currency: "NGN",
  customerName: "Adedoyin Emmanuel Adeniyi",
  callbackUrl: "https://github.com/adedoyin-emmanuel",
});
```
