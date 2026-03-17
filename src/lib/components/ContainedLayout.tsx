import { Breadcrumb, Divider, Flex, Layout } from "antd";

export const ContainedLayout = ({
  crumbs,
  actions,
  sider,
  filterBar,
  children,
}: {
  crumbs: string[];
  actions?: React.ReactNode[];
  sider?: React.ReactNode;
  filterBar?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div style={{ height: "100%", padding: "0 48px" }}>
      <Flex justify="space-between" align="center">
        <Breadcrumb
          style={{ margin: "16px 0" }}
          items={crumbs.map((crumb) => ({ title: crumb }))}
        />

        {actions && actions.map((ActionComp) => ActionComp)}
      </Flex>

      <Layout
        style={{
          background: "#fff",
          borderRadius: "8px",
        }}
      >
        {filterBar && (
          <>
            <div style={{ padding: "24px" }}>{filterBar}</div>
            <Divider style={{ margin: 0 }} />
          </>
        )}

        <Layout
          hasSider={!!sider}
          style={{
            background: "#fff",
            display: "flex",
            gap: "24px",
            padding: "24px",
            borderRadius: "8px",
          }}
        >
          {sider && <Layout.Sider>{sider}</Layout.Sider>}

          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
    </div>
  );
};
