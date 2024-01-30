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

The Public and Private Key can be gotten from the **Squad** website. <https://sandbox.squadco.com/sign-up> or s

```typescript
const squad = new CreateSquadClient(
  process.env.SQUAD_PUBLIC_KEY as string,
  process.env.SQUAD_PRIVATE_KEY as string,
  process.env.NODE_ENV as string
);
```
