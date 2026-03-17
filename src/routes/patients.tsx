import { createFileRoute } from "@tanstack/react-router";
import { Button } from "antd";
import { getPatients } from "../patients/actions/getPatients";
import PatientList from "../patients/components/PatientList";
import { ContainedLayout } from "../lib/components/ContainedLayout";
import { PatientListFilterBar } from "../patients/components/PatientListFilterBar";

type PatientsSearch = {
  searchTerm?: string;
};

export const Route = createFileRoute("/patients")({
  validateSearch: (search: Record<string, unknown>): PatientsSearch => ({
    searchTerm:
      typeof search.searchTerm === "string" ? search.searchTerm : undefined,
  }),
  loader: async () => {
    const patients = await getPatients();
    return { patients };
  },
  component: PatientsPage,
});

function PatientsPage() {
  const { patients } = Route.useLoaderData();

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
      <PatientList patients={patients as any} />
    </ContainedLayout>
  );
}
