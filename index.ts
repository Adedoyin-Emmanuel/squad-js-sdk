import { CreateSquadClient } from "./core";

const squad = new CreateSquadClient(
  process.env.SQUAD_PUBLIC_KEY as string,
  process.env.SQUAD_PRIVATE_KEY as string,
  process.env.NODE_ENV as "development" | "production"
);

const args = {
  amount: 30000,
  email: "adedoyine535@gmail.com",
  initiateType: "inline",
  currency: "NGN",
  customerName: "Adedoyin Emmanuel Adeniyi",
};

const response = squad.initiatePayment(args, true);

response.then((data) => {
  console.log(data.data);
});

const args2 = {
  amount: 10000,
  tokenId: "tJlYMKcwPd",
};

const response2 = squad.chargeCard(args2);

response2.then((data) => {
  console.log(data);
});
