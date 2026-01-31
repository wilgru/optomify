"use client";

import React, { useState } from "react";
import { Button, Form, Input, Select, DatePicker, Card, Modal } from "antd";
import {
  getSph,
  getCyl,
  getAxis,
  rxNotationRegex,
  createRxNotation,
} from "../../../utils/rxNotation";
import { ClinicalFileT } from "../../../types/ClinicalFile.type";
import { Dayjs } from "dayjs";
import { updateClinicalFile } from "../actions/updateClinicalFile";
import { HydratedDocument } from "mongoose";

type ClinicalFileForm = {
  fileType: "prescription" | "health check" | "report";
  title: string;
  notes: string;
  recall: Dayjs;
  previousRight: string;
  previousLeft: string;
  previousInterAdd: string;
  previousNearAdd: string;
  givenRight: string;
  givenLeft: string;
  givenInterAdd: string;
  givenNearAdd: string;
  medicareItemCode: string;
};

export default function EditClinicalFileModal({
  clinicalFile,
  onClose,
}: {
  clinicalFile: HydratedDocument<ClinicalFileT>;
  onClose: () => void;
}) {
  // conditionally required if prescription is selected
  const [isPrescription, setIsPrescription] = useState(
    clinicalFile.fileType === "prescription"
  );

  const onFinish = async (values: ClinicalFileForm) => {
    await updateClinicalFile({
      id: clinicalFile.id,
      fileType: values.fileType,
      title: values.title,
      textField: values.notes,
      medicareItemCode: values.medicareItemCode,
      recall: values.recall,
      prevPrescription: {
        rightOd: {
          sphere: getSph(values.previousRight),
          cylinder: getCyl(values.previousRight),
          axis: getAxis(values.previousRight),
        },
        leftOs: {
          sphere: getSph(values.previousLeft),
          cylinder: getCyl(values.previousLeft),
          axis: getAxis(values.previousLeft),
        },
        interAdd: parseFloat(values.previousInterAdd) || 0,
        nearAdd: parseFloat(values.previousNearAdd) || 0,
      },
      givenPrescription: {
        rightOd: {
          sphere: getSph(values.givenRight),
          cylinder: getCyl(values.givenRight),
          axis: getAxis(values.givenRight),
        },
        leftOs: {
          sphere: getSph(values.givenLeft),
          cylinder: getCyl(values.givenLeft),
          axis: getAxis(values.givenLeft),
        },
        interAdd: parseFloat(values.givenInterAdd) || 0,
        nearAdd: parseFloat(values.givenNearAdd) || 0,
      },
    });

    onClose();
  };

  return (
    <Modal
      title="View file"
      open={clinicalFile !== undefined}
      onOk={() => {
        onClose();
      }}
      onCancel={() => {
        onClose();
      }}
      width={1000}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          fileType: clinicalFile.fileType,
          title: clinicalFile.title,
          medicareItemCode: clinicalFile.medicareItemCode,
          previousRight: createRxNotation(
            clinicalFile.prevPrescription.rightOd.sphere,
            clinicalFile.prevPrescription.rightOd.cylinder,
            clinicalFile.prevPrescription.rightOd.axis
          ),
          previousLeft: createRxNotation(
            clinicalFile.prevPrescription.leftOs.sphere,
            clinicalFile.prevPrescription.leftOs.cylinder,
            clinicalFile.prevPrescription.leftOs.axis
          ),
          previousInterAdd: clinicalFile.prevPrescription.interAdd || "",
          previousNearAdd: clinicalFile.prevPrescription.nearAdd || "",
          givenRight: createRxNotation(
            clinicalFile.givenPrescription.rightOd.sphere,
            clinicalFile.givenPrescription.rightOd.cylinder,
            clinicalFile.givenPrescription.rightOd.axis
          ),
          givenLeft: createRxNotation(
            clinicalFile.givenPrescription.leftOs.sphere,
            clinicalFile.givenPrescription.leftOs.cylinder,
            clinicalFile.givenPrescription.leftOs.axis
          ),
          givenInterAdd: clinicalFile.givenPrescription.interAdd,
          givenNearAdd: clinicalFile.givenPrescription.nearAdd,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Type"
          name="fileType"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please select a file type!",
            },
          ]}
        >
          <Select
            placeholder="File type"
            onChange={(value) =>
              value === "prescription"
                ? setIsPrescription(true)
                : setIsPrescription(false)
            }
          >
            <Select.Option value="prescription">Prescription</Select.Option>
            <Select.Option value="health check">Health check</Select.Option>
            <Select.Option value="report">Report</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter a title.",
            },
          ]}
        >
          <Input placeholder="New file" />
        </Form.Item>

        <Form.Item
          label="Notes"
          name="notes"
          valuePropName="notes"
          rules={[
            {
              required: true,
              message: "Please input some text!",
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Recall"
          name="recall"
          rules={[
            {
              validator: async (_, value) => {
                if (!value) return;

                if (value > Date.now()) {
                  return Promise.resolve(); //resolve to say true or it passed
                } else {
                  return Promise.reject(new Error("'title' is must be unique"));
                }
              },
              message: "Please input valid date in the future!",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Use notation">
          <span className="ant-form-text">(-/+)0.00/-0.00x000</span>
        </Form.Item>

        <Card style={{ marginBottom: 20 }}>
          <Form.Item
            label="Previous R"
            name="previousRight"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) return;

                  if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Please enter prescription using the correct notation."
                      )
                    );
                  }
                },
                message:
                  "Please enter prescription using the correct notation.",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              placeholder="(-/+)0.00/-0.00x000"
            />
          </Form.Item>

          <Form.Item
            label="Previous L"
            name="previousLeft"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) return;

                  if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Please enter prescription using the correct notation."
                      )
                    );
                  }
                },
                message:
                  "Please enter prescription using the correct notation.",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              placeholder="(-/+)0.00/-0.00x000"
            />
          </Form.Item>

          <Form.Item
            label="Previous Inter add"
            name="previousInterAdd"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) return;

                  if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Must be a positive number measured in dioptres (steps of 0.25)."
                      )
                    );
                  }
                },
                message:
                  "Must be a positive number measured in dioptres (steps of 0.25).",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              style={{ width: "100px" }}
              placeholder="Inter Add"
            />
          </Form.Item>

          <Form.Item
            label="Previous Near add"
            name="previousNearAdd"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) return;

                  if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Must be a positive number measured in dioptres (steps of 0.25)."
                      )
                    );
                  }
                },
                message:
                  "Must be a positive number measured in dioptres (steps of 0.25).",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              style={{ width: "100px" }}
              placeholder="Inter Add"
            />
          </Form.Item>
        </Card>

        <Card style={{ marginBottom: 20 }}>
          <Form.Item
            label="Given R"
            name="givenRight"
            rules={[
              {
                required: isPrescription,
                validator: async (_, value) => {
                  if (!value) return;

                  if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Please enter prescription using the correct notation."
                      )
                    );
                  }
                },
                message:
                  "Please enter prescription using the correct notation.",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              placeholder="(-/+)0.00/-0.00x000"
            />
          </Form.Item>

          <Form.Item
            label="Given L"
            name="givenLeft"
            rules={[
              {
                required: isPrescription,
                validator: async (_, value) => {
                  if (!value) return;

                  if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Please enter prescription using the correct notation."
                      )
                    );
                  }
                },
                message:
                  "Please enter prescription using the correct notation.",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              placeholder="(-/+)0.00/-0.00x000"
            />
          </Form.Item>

          <Form.Item
            label="Given Inter add"
            name="givenInterAdd"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) return;

                  if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Must be a positive number measured in dioptres (steps of 0.25)."
                      )
                    );
                  }
                },
                message:
                  "Must be a positive number measured in dioptres (steps of 0.25).",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              style={{ width: "100px" }}
              placeholder="Inter Add"
            />
          </Form.Item>

          <Form.Item
            label="Near add"
            name="givenNearAdd"
            rules={[
              {
                validator: async (_, value) => {
                  if (!value) return;

                  if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                  } else {
                    return Promise.reject(
                      new Error(
                        "Must be a positive number measured in dioptres (steps of 0.25)."
                      )
                    );
                  }
                },
                message:
                  "Must be a positive number measured in dioptres (steps of 0.25).",
              },
            ]}
          >
            <Input
              disabled={!isPrescription}
              style={{ width: "100px" }}
              placeholder="Inter Add"
            />
          </Form.Item>
        </Card>

        <Form.Item
          label="Medicare item code"
          name="medicareItemCode"
          rules={[
            {
              validator: async (_, value) => {
                if (!value) return;

                if (!isNaN(value)) {
                  return Promise.resolve(); //resolve to say true or it passed
                } else {
                  return Promise.reject(new Error("Must be a number."));
                }
              },
              message: "Must be a number.",
            },
          ]}
        >
          <Input style={{ width: "100px" }} placeholder="Inter Add" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 5,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Update file
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
