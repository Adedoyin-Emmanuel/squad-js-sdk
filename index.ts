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

response.then(async (data) => {
  console.log(data.data);

  //verify a transaction after successful payment
  const transactionRef: any = data.data?.transaction_ref as string;
  const response = await squad.verifyTransaction(transactionRef);

  console.log(response);
});
