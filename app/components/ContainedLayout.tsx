import { Breadcrumb, Divider, Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

export const ContainedLayout = ({
  crumbs,
  sider,
  filterBar,
  children,
}: {
  crumbs: string[];
  sider?: React.ReactNode;
  filterBar?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div style={{ height: "100%", padding: "0 48px" }}>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={crumbs.map((crumb) => ({ title: crumb }))}
      />
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
          {sider && <Sider>{sider}</Sider>}

          <Content>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};
