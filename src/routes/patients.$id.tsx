import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Layout, Menu } from "antd";
import { getPatient } from "../patients/actions/getPatient";

export const Route = createFileRoute("/patients/$id")({
  loader: async ({ params }) => {
    const patient = await getPatient({ data: params.id });
    return { patient };
  },
  component: PatientDetailsLayout,
});

function PatientDetailsLayout() {
  const { patient } = Route.useLoaderData();
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "overview",
      label: "Overview",
    },
    {
      key: "clinical-files",
      label: "Clinical Files",
    },
  ];

  return (
    <Layout.Content style={{ padding: "20px" }}>
      <h1>{patient.firstName + " " + patient.lastName}</h1>
      <Layout>
        <Layout.Sider width={220} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["overview"]}
            defaultOpenKeys={["overview"]}
            style={{ height: "100%" }}
            items={menuItems}
            onClick={(item) => {
              navigate({ to: `/patients/${id}/${item.key}` });
            }}
          />
        </Layout.Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Layout.Content
            className="site-layout-background"
            style={{ padding: 20, margin: 0, minHeight: 280 }}
          >
            <Outlet />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout.Content>
  );
}
