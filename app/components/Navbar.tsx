"use client";

import React from "react";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import { Menu } from "antd";
import { usePathname } from "next/navigation";

const AppNavbar = () => {
  const pathname = usePathname();
  // if the current token in local storage is expired log it out
  // if (auth.isTokenExpired(auth.getToken())) {
  //   localStorage.removeItem("id_token");
  // }

  const navItems = [
    {
      key: "bookings",
      label: <Link href="/bookings">Bookings</Link>,
    },
    {
      key: "patients",
      label: <Link href="/patients">Patients</Link>,
    },
  ];

  return (
    <Header
      style={{ background: "#fff", display: "flex", alignItems: "center" }}
    >
      <img alt="logo" width={50} src="/optomify_logo.png" />

      <Menu
        className="navbar"
        mode="horizontal"
        selectedKeys={[
          pathname.includes("bookings")
            ? "bookings"
            : pathname.includes("patients")
              ? "patients"
              : "",
        ]}
        onClick={(item) => {
          console.log(item.key);
        }}
        style={{
          background: "unset",
        }}
        items={navItems}
      />
    </Header>
  );
};

export default AppNavbar;
