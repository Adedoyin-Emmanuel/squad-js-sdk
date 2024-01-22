import { CreateSquadClient } from "./core";

const squad = new CreateSquadClient(
  process.env.SQUAD_PUBLIC_KEY as string,
  process.env.SQUAD_PRIVATE_KEY as string,
  process.env.NODE_ENV as "development" | "production"
);

const args = {
  displayName: "Adedoyin Emmanuel",
  accountName: "Adedoyin Emmanuel",
  accountNumber: "0000000000",
  bankCode: "058",
  bankName: "GTBank",
};
const response = squad.createSubMerchant(args);

response.then((data) => {
  console.log(data.data?.account_id);
});
