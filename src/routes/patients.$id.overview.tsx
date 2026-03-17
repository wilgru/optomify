import { createFileRoute } from "@tanstack/react-router";
import { Button, DatePicker, Form, Input, message } from "antd";
import { getPatient } from "../patients/actions/getPatient";
import { updatePatient } from "../patients/actions/updatePatient";

export const Route = createFileRoute("/patients/$id/overview")({
  loader: async ({ params }) => {
    const patient = await getPatient({ data: params.id });
    return { patient };
  },
  component: PatientOverviewPage,
});

function PatientOverviewPage() {
  const { patient } = Route.useLoaderData();
  const { id } = Route.useParams();

  const handleFinish = async (values: any) => {
    try {
      await updatePatient({
        id,
        updates: values,
      });
      message.success("Patient details updated successfully");
    } catch (error) {
      message.error("Failed to update patient details");
      console.error(error);
    }
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
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="date of birth"
        name="dob"
        rules={[{ required: true, message: "" }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: "" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="mobile number"
        name="mobileNumber"
        rules={[{ required: true, message: "" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="medicare number" name="medicareNumber">
        <Input />
      </Form.Item>
      <Form.Item label="reference number" name="medicareRef">
        <Input />
      </Form.Item>
      <Form.Item label="expiry date" name="medicareExp">
        <DatePicker />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <p className="created-by-details">
          {patient.created?.toISOString?.() ?? ""}
        </p>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Update patient details
        </Button>
      </Form.Item>
    </Form>
  );
}
