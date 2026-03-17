import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Button, Layout, List } from "antd";
import {
  FileTextOutlined,
  HeartOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import { ClinicalFileT } from "../patients/types/ClinicalFile.type";
import CreateClinicalFileModal from "../patients/clinical-files/components/CreateClinicalFileModal";
import EditClinicalFileModal from "../patients/clinical-files/components/EditClinicalFileModal";
import { getClinicalFilesForPatient } from "../patients/actions/getClinicalFilesForPatient";

type ClinicalFilesSearch = {
  showCreateClinicalFile?: string;
  clinicalFileToEditId?: string;
};

export const Route = createFileRoute("/patients/$id/clinical-files")({
  validateSearch: (search: Record<string, unknown>): ClinicalFilesSearch => ({
    showCreateClinicalFile:
      typeof search.showCreateClinicalFile === "string"
        ? search.showCreateClinicalFile
        : undefined,
    clinicalFileToEditId:
      typeof search.clinicalFileToEditId === "string"
        ? search.clinicalFileToEditId
        : undefined,
  }),
  loader: async ({ params }) => {
    const clinicalFiles = await getClinicalFilesForPatient({ data: params.id });
    return { clinicalFiles: clinicalFiles as ClinicalFileT[] };
  },
  component: ClinicalFilesPage,
});

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
  }
  if (type === "health check") {
    return <HeartOutlined style={{ fontSize: "40px", margin: "auto 20px" }} />;
  }

  return <FileTextOutlined style={{ fontSize: "40px", margin: "auto 20px" }} />;
}

function ClinicalFilesPage() {
  const { id } = Route.useParams();
  const { clinicalFiles } = Route.useLoaderData();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const showCreateClinicalFile = !!search.showCreateClinicalFile;
  const clinicalFileToEdit = clinicalFiles.find(
    (clinicalFile) => clinicalFile.id === search.clinicalFileToEditId,
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
                    navigate({
                      to: "/patients/$id/clinical-files",
                      params: { id },
                      search: {
                        clinicalFileToEditId: clinicalFile.id,
                      },
                    });
                  }}
                >
                  <ConditionalIcon type={clinicalFile.fileType} />
                  <div>
                    <h3>{`${clinicalFile.title}`}</h3>
                    <h4>
                      {new Date(
                        clinicalFile.dateCreated as unknown as string,
                      ).toISOString()}
                    </h4>
                  </div>
                </div>
              </List.Item>
            )}
          />

          <Link
            to="/patients/$id/clinical-files"
            params={{ id }}
            search={{ showCreateClinicalFile: "true" }}
          >
            <Button style={{ marginTop: 10 }}>Add new Clinical File</Button>
          </Link>

          <CreateClinicalFileModal
            patientId={id}
            open={showCreateClinicalFile}
            onClose={() => {
              navigate({
                to: "/patients/$id/clinical-files",
                params: { id },
                search: {},
              });
            }}
          />

          {clinicalFileToEdit && (
            <EditClinicalFileModal
              clinicalFile={clinicalFileToEdit as any}
              onClose={() => {
                navigate({
                  to: "/patients/$id/clinical-files",
                  params: { id },
                  search: {},
                });
              }}
            />
          )}
        </Layout.Content>
      </Layout>
    </Layout.Content>
  );
}
