import React from "react";
import { getPatients } from "./actions/getPatients";
import PatientList from "./components/PatientList";
import { ContainedLayout } from "../components/ContainedLayout";

export default async function Page() {
  // check if logged in first
  // if (!auth.loggedIn()) {
  //   auth.logout();
  //   props.setLoggedIn(false);
  // }

  const patients = await getPatients();

  return (
    <ContainedLayout
      crumbs={["Patients", "All Patients"]}
      filterBar={<h1>Patients</h1>}
    >
      <PatientList patients={patients} />
    </ContainedLayout>
  );
}
