import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, Button, Card, Flex, Form, Input, Typography } from "antd";
import { useState } from "react";
import { login } from "../users/actions/login";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);

    try {
      await login({ data: values });
      navigate({ to: "/" });
    } catch (e) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      style={{ height: "100%", padding: "48px" }}
    >
      <Card style={{ width: 400 }}>
        <Typography.Title level={3} style={{ marginBottom: 24 }}>
          Sign in to Optomify
        </Typography.Title>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError(null)}
            style={{ marginBottom: 16 }}
          />
        )}

        <Form
          name="login"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  );
}
