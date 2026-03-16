"use client";

import { Button, Flex, Input } from "antd";
import { useSearchParams } from "next/navigation";

export const PatientListFilterBar = () => {
  const searchParams = useSearchParams();

  const onSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("bookSetupRange", JSON.stringify(value));
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
