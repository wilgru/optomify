import type { Metadata } from "next";
import { Layout } from "antd";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import localFont from "next/font/local";
import "./globals.css";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Footer } = Layout;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <Layout>
            {children}

            <Footer style={{ textAlign: "center" }}>
              Optomify ©2024 Created by William Gruszka
            </Footer>
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
