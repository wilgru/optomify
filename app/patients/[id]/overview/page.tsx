import React from "react";
import { Button, Form, Input, DatePicker } from "antd";
import { getPatient } from "../../actions/getPatient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await getPatient(id);

  const onFinish = async () => {
    // await updatePatient({
    //   patientToUpdateId: patient.id,
    //   firstName: formValues.firstName || patient.firstName,
    //   lastName: formValues.lastName || patient.lastName,
    //   dob: formValues.dob || patient.dob,
    //   email: formValues.email || patient.email,
    //   phone: formValues.phone || patient.phone,
    //   medicareNumber: formValues.medicareNumber || patient.medicareNumber,
    //   medicareRef: formValues.medicareRef || patient.medicareRef,
    //   medicareExp: formValues.medicareExp || patient.medicareExp,
    // });
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 5,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        firstName: patient.firstName,
        lastName: patient.lastName,
        dob: patient.dob,
        email: patient.email,
        phone: patient.phone,
        medicareNumber: patient.medicareNumber,
        medicareRef: patient.medicareRef,
        medicareExp: patient.medicareExp,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
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
        name="mobileNumber"
        rules={[
          {
            required: true,
            message: "",
          },
        ]}
      >
        <Input />
      </Form.Item>

      {/* <Form.Item
        name="has_medicare"
        valuePropName="checked"
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      > */}
      {/* <Checkbox
          onChange={(value) => {
            value.target.checked === true
              ? setEligableForMedicare(true)
              : setEligableForMedicare(false);
          }}
        >
          Eligable for Medicare
        </Checkbox> */}
      {/* </Form.Item> */}

      <Form.Item
        label="medicare number"
        name="medicareNumber"
        // rules={[
        //   {
        //     required: eligableForMedicare,
        //     message: "please provide medicare",
        //   },
        // ]}
      >
        <Input />
        {/* <Input disabled={!eligableForMedicare} /> */}
      </Form.Item>

      <Form.Item
        label="reference number"
        name="medicareRef"
        // rules={[
        //   {
        //     required: eligableForMedicare,
        //     message: "please provide medicare",
        //   },
        // ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="expiry date"
        name="medicareExp"
        // rules={[
        //   {
        //     required: eligableForMedicare,
        //     message: "please provide medicare",
        //   },
        // ]}
      >
        {/* <DatePicker disabled={!eligableForMedicare} /> */}
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        {/* <p className="created-by-details"> */}
        {/* Created by {patient.createdBy.username} */}
        {/* </p> */}
        <p className="created-by-details">{patient.created.toISOString()}</p>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Update patient details
        </Button>
      </Form.Item>
    </Form>
  );
}
