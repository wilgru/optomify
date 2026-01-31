// React
import React from "react";
import { List, Layout, Button } from "antd";
import {
  ReconciliationOutlined,
  HeartOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { getClinicalFilesForPatient } from "./actions/getClinicalFilesForPatient";
import { redirect } from "next/navigation";
import CreateClinicalFileModal from "./components/CreateClinicalFileModal";
import Link from "next/link";
import EditClinicalFileModal from "./components/EditClinicalFileModal";
import { ClinicalFileT } from "../../types/ClinicalFile.type";

function ConditionalIcon({
  type,
}: {
  type: "prescription" | "health check" | "report";
}) {
  if (type === "prescription") {
    return (
      <ReconciliationOutlined
        style={{ fontSize: "40px", margin: "auto 20px" }}
      />
    );
  } else if (type === "health check") {
    return <HeartOutlined style={{ fontSize: "40px", margin: "auto 20px" }} />;
  } else {
    return (
      <FileTextOutlined style={{ fontSize: "40px", margin: "auto 20px" }} />
    );
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Record<string, string> | null | undefined;
}) {
  const showCreateClinicalFile = !!searchParams?.showCreateClinicalFile;
  const clinicalFileToEditId = searchParams?.clinicalFileToEditId;

  const { id } = await params;

  const clinicalFiles = await getClinicalFilesForPatient(id);
  const clinicalFileToEdit = clinicalFiles.find(
    (clinicalFile) => clinicalFile.id === clinicalFileToEditId
  );

  return (
    <Layout.Content>
      <Layout>
        <Layout.Content
          className="site-layout-background"
          style={{ padding: 0, margin: 0, minHeight: 280 }}
        >
          <List
            header={`Number of records: ${clinicalFiles.length}`}
            bordered
            itemLayout="horizontal"
            dataSource={clinicalFiles}
            renderItem={(clinicalFile: ClinicalFileT) => (
              <List.Item className={"patient-file-record-li"}>
                <div
                  className={"patient-record"}
                  onClick={() => {
                    redirect(
                      `/patients/${id}/clinical-files?clinicalFileToEditId=${clinicalFile.id}`
                    );
                  }}
                >
                  <ConditionalIcon type={clinicalFile.fileType} />
                  <div>
                    <h3>{`${clinicalFile.title}`}</h3>
                    <h4>{clinicalFile.dateCreated.toISOString()}</h4>
                  </div>
                </div>
              </List.Item>
            )}
          />

          <Link
            href={`/patients/${id}/clinical-files?showCreateClinicalFile=true`}
          >
            <Button style={{ marginTop: 10 }}>Add new Clinical File</Button>
          </Link>

          <CreateClinicalFileModal
            patientId={id}
            open={showCreateClinicalFile}
            onClose={() => {
              redirect(`/patients/${id}/clinical-files`);
            }}
          />

          {clinicalFileToEdit && (
            <EditClinicalFileModal
              clinicalFile={clinicalFileToEdit}
              onClose={() => {
                redirect(`/patients/${id}/clinical-files`);
              }}
            />
          )}
        </Layout.Content>
      </Layout>
    </Layout.Content>
  );
}
