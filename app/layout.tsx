import type { Metadata } from "next";
import { Breadcrumb, ConfigProvider, Layout } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import localFont from "next/font/local";
import "./globals.css";
import AppNavbar from "./components/Navbar";
import { Content, Footer } from "antd/es/layout/layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Optomify",
  description:
    "Practice management solution built for use in your optometry practice",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ height: "100%" }}
      >
        <AntdRegistry>
          <ConfigProvider>
            <Layout style={{ height: "100%" }}>
              <AppNavbar />

              {children}

              <Footer style={{ textAlign: "center" }}>
                Optomify ©2026 Created by William Gruszka
              </Footer>
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
