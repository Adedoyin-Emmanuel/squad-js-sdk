import { CreateSquadClient } from "./core";

const squad = new CreateSquadClient(
  process.env.SQUAD_PUBLIC_KEY as string,
  process.env.SQUAD_PRIVATE_KEY as string,
  process.env.NODE_ENV as "development" | "production"
);

// squad
//   .createPaymentLink({
//     name: "Adedoyin Emmanuel",
//     hash: "emmysoft",
//     linkStatus: 1,
//     expireBy: new Date("2024-09-14").toISOString(),
//     amount: 200000,
//     currencyId: "NGN",
//     description: "Funds for my gee",
//   })
//   .then((data) => {
//     console.log(data);
//   });

squad
  .refund({
    gatewayTransactionRef: "12244",
    transactionRef: "12244",
    refundType: "Partial",
    reasonForRefund: "I need my funds back",
    refundAmount: 50000,
  })
  .then((data) => {
    console.log(data);
  });
