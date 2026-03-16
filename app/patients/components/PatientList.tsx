"use client";

import { List } from "antd";
import Link from "next/link";
import { PatientT } from "../types/Patient.type";

export default function PatientList({ patients }: { patients: PatientT[] }) {
  return (
    <>
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
