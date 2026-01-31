"use client";

import { Input, List } from "antd";
import Link from "next/link";
import { PatientT } from "../types/Patient.type";
import { useSearchParams } from "next/navigation";

export default function PatientList({ patients }: { patients: PatientT[] }) {
  const searchParams = useSearchParams();

  const onSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("bookSetupRange", JSON.stringify(value));
  };

  return (
    <>
      <Input.Search
        placeholder="Search for name, email or mobile number..."
        allowClear
        onSearch={onSearch}
        style={{
          marginBottom: 10,
        }}
      />
      <List
        header={`Number of records: ${patients.length}`}
        bordered
        itemLayout="horizontal"
        dataSource={patients}
        renderItem={(patient: PatientT) => (
          <List.Item className={"patient-record-li"}>
            <Link href={`/patients/${patient.id}`} className={"patient-record"}>
              <div>
                <h3>{`${patient.firstName} ${patient.lastName}`}</h3>
                <h4>{patient.email} </h4>
              </div>
            </Link>
          </List.Item>
        )}
      />
    </>
  );
}
