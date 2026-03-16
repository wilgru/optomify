import React from "react";
import { getPatients } from "./actions/getPatients";
import PatientList from "./components/PatientList";
import { ContainedLayout } from "../components/ContainedLayout";
import { PatientListFilterBar } from "./components/PatientListFilterBar";
import { Button } from "antd";

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
      actions={[
        <Button key="add-patient" type="primary">
          Add Patient
        </Button>,
      ]}
      filterBar={<PatientListFilterBar />}
    >
      <PatientList patients={patients} />
    </ContainedLayout>
  );
}
