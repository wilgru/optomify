"use client";

import { Link, useLocation } from "@tanstack/react-router";
import { Layout, Menu } from "antd";

const AppNavbar = () => {
  const { pathname } = useLocation();
  // if the current token in local storage is expired log it out
  // if (auth.isTokenExpired(auth.getToken())) {
  //   localStorage.removeItem("id_token");
  // }

  const navItems = [
    {
      key: "bookings",
      label: <Link to="/bookings">Bookings</Link>,
    },
    {
      key: "patients",
      label: <Link to="/patients">Patients</Link>,
    },
  ];

  return (
    <Layout.Header
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
    </Layout.Header>
  );
};

export default AppNavbar;
