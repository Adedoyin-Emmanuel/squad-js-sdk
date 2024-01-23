import { CreateSquadClient } from "./core";

const squad = new CreateSquadClient(
  process.env.SQUAD_PUBLIC_KEY as string,
  process.env.SQUAD_PRIVATE_KEY as string,
  process.env.NODE_ENV as "development" | "production"
);

const args = {
  firstName: "Adedoyin",
  lastName: "Emmanuel",
  middleName: "Adeniyi",
  mobileNumber: "07061620301",
  dob: "09/14/2005" ,
  email: "adedoyine535@gmail.com",
  bvn: "1234567890",
  gender: "1",
  address: "Lagos Nigeria",
  customerIdentifier: "1234567890",
  beneficiaryAccount: "0123456789",
};

squad.createVirtualAccount(args).then((data) => {
  console.log(data);
});
