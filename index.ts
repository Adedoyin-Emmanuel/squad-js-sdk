import { CreateSquadClient } from "./core";

const squad = new CreateSquadClient(
  process.env.SQUAD_PUBLIC_KEY as string,
  process.env.SQUAD_PRIVATE_KEY as string,
  process.env.NODE_ENV as "development" | "production"
);

squad.updateCustomerBvn("1245", "CCC", "07061620301").then((data) => {
  console.log(data.status);
  console.log(data.message);
});
