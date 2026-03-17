"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  Card,
  InputNumber,
} from "antd";
import { ClinicalFileT } from "../../types/ClinicalFile.type";
import { createClinicalFile } from "../../actions/createClinicalFile";

const { Option } = Select;
const { TextArea } = Input;

const CreateClinicalFileModal = ({
  patientId,
  open,
  onClose,
}: {
  patientId: string;
  open: boolean;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await createClinicalFile({
        data: {
          patientId,
          file: {
            ...values,
            id: "",
          } as Omit<ClinicalFileT, "id" | "dateCreated">,
        },
      });
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Failed to create clinical file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create Clinical File"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Create
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="File Type"
          name="fileType"
          rules={[{ required: true, message: "Please select a file type" }]}
        >
          <Select placeholder="Select file type">
            <Option value="prescription">Prescription</Option>
            <Option value="health check">Health Check</Option>
            <Option value="report">Report</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="File title" />
        </Form.Item>

        <Form.Item
          label="Notes"
          name="textField"
          rules={[{ required: true, message: "Please enter notes" }]}
        >
          <TextArea rows={4} placeholder="Clinical notes" />
        </Form.Item>

        <Form.Item label="Medicare Item Code" name="medicareItemCode">
          <Input placeholder="e.g., 10190" />
        </Form.Item>

        <Form.Item label="Recall Date" name="recall">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateClinicalFileModal;
