import React from "react";
// import auth from "../../../../client/src/utils/auth";
import { Layout, Menu } from "antd";
import { redirect } from "next/navigation";
import { getPatient } from "../actions/getPatient";

export default async function PatientDetailsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // check if loggedin first
  // if (!auth.loggedIn()) {
  //   auth.logout();
  //   props.setLoggedIn(false);
  // }

  const { id } = await params;
  const patient = await getPatient(id);

  const menuItems = [
    {
      key: "overview",
      label: "Overview",
    },
    {
      key: "clinical-files",
      label: "Clinical Files",
    },
    // {
    //   key: "notes",
    //   label: "Notes",
    // },
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
              redirect(`/patients/${id}/${item.key}`);
            }}
          />
        </Layout.Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Layout.Content
            className="site-layout-background"
            style={{ padding: 20, margin: 0, minHeight: 280 }}
          >
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout.Content>
  );
}
