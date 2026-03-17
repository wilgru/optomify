"use client";

import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  DatePicker,
  InputNumber,
} from "antd";
import { ClinicalFileT } from "../../types/ClinicalFile.type";
import { updateClinicalFile } from "../../actions/updateClinicalFile";
import { deleteClinicalFile } from "../../actions/deleteClinicalFile";

const { Option } = Select;
const { TextArea } = Input;

const EditClinicalFileModal = ({
  clinicalFile,
  onClose,
}: {
  clinicalFile: ClinicalFileT;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await updateClinicalFile({
        data: {
          id: clinicalFile.id,
          updates: values,
        },
      });
      onClose();
    } catch (error) {
      console.error("Failed to update clinical file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteClinicalFile({
        data: {
          id: clinicalFile.id,
        },
      });
      onClose();
    } catch (error) {
      console.error("Failed to delete clinical file:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Clinical File"
      open={!!clinicalFile}
      onCancel={onClose}
      footer={[
        <Button
          key="delete"
          danger
          loading={deleteLoading}
          onClick={handleDelete}
        >
          Delete
        </Button>,
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={() => form.submit()}
        >
          Update
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          fileType: clinicalFile.fileType,
          title: clinicalFile.title,
          textField: clinicalFile.textField,
          medicareItemCode: clinicalFile.medicareItemCode,
          recall: clinicalFile.recall,
        }}
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

export default EditClinicalFileModal;
