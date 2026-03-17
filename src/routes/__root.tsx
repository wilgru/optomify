import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import { ConfigProvider, Layout } from "antd";
import AppNavbar from "../lib/components/Navbar";
import antdResetCss from "antd/dist/reset.css?url";
import { ReactNode } from "react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Optomify",
      },
      {
        name: "description",
        content:
          "Practice management solution built for use in your optometry practice",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: antdResetCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  component: RootComponent,
});

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <Layout style={{ height: "100%" }}>
      <AppNavbar />
      <Outlet />
      <Layout.Footer style={{ textAlign: "center" }}>
        Optomify (c) 2026 Created by William Gruszka
      </Layout.Footer>
    </Layout>
  );
}
