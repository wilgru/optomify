"use client";

import { Button, Flex, Input } from "antd";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const PatientListFilterBar = () => {
  const navigate = useNavigate({ from: "/patients" });
  const searchParams = useSearch({ from: "/patients" });

  const onSearch = (value: string) => {
    navigate({
      search: {
        ...searchParams,
        searchTerm: value,
      },
    });
  };

  return (
    <Flex gap="middle">
      <Input.Search
        placeholder="Search for name, email or mobile number..."
        allowClear
        onSearch={onSearch}
        style={{
          marginBottom: 10,
        }}
      />

      <Button type="text">Filters</Button>
    </Flex>
  );
};
