import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  Card,
  FormInstance,
} from "antd";
import { PatientT } from "../../patients/types/Patient.type";
import { TimeSlot } from "../types/BookSetup.type";
import { createPatientAndBooking } from "../actions/createPatientAndBooking";

const { Option } = Select;
const { TextArea } = Input;

const BookNewForm = ({
  form,
  timeSlot,
  onFinishSuccess,
}: {
  form: FormInstance;
  timeSlot: TimeSlot;
  onFinishSuccess: () => void;
}) => {
  const [hasMedicare, setHasMedicare] = useState(true);

  const onFinish = async (
    values: PatientT & { bookingType: string; note: string }
  ) => {
    await createPatientAndBooking(values, timeSlot);

    form.resetFields();
    onFinishSuccess();
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        has_medicare: true,
      }}
      form={form}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Booking Reason"
        name="bookingType"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please select a file type!",
          },
        ]}
      >
        <Select placeholder="Booking Reason">
          <Option value="general eye test">General eye test</Option>
          <Option value="health concern">Health concern</Option>
          <Option value="rms form">RMS form/Drivers License</Option>
          <Option value="re-check">Re-check</Option>
          <Option value="other">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="First Name"
        name="firstName"
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="date of birth"
        name="dob"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="mobile number"
        name="phone"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Card style={{ marginBottom: 20 }}>
        <Form.Item
          name="has_medicare"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox
            onChange={(value) => {
              setHasMedicare(value.target.checked);
            }}
          >
            Eligable for Medicare
          </Checkbox>
        </Form.Item>

        <Form.Item
          label="medicare number"
          name="medicareNumber"
          rules={[
            {
              required: hasMedicare,
              message: "please provide medicare",
            },
          ]}
        >
          <Input disabled={!hasMedicare} />
        </Form.Item>

        <Form.Item
          label="reference number"
          name="medicareRef"
          rules={[
            {
              required: hasMedicare,
              message: "please provide medicare",
            },
          ]}
        >
          <Input disabled={!hasMedicare} />
        </Form.Item>

        <Form.Item
          label="expiry date"
          name="medicareExp"
          rules={[
            {
              required: hasMedicare,
              message: "please provide medicare",
            },
          ]}
        >
          <DatePicker disabled={!hasMedicare} />
        </Form.Item>
      </Card>

      <Form.Item
        label="Booking Notes"
        name="note"
        hasFeedback
        wrapperCol={{
          offset: 0,
          span: 16,
        }}
      >
        <TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Book Patient
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookNewForm;
