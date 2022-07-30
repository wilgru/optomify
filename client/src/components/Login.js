import { Button, Checkbox, Form, Input, DatePicker, Alert } from 'antd';
import React, { useEffect, useState } from 'react';

// grpahQL
import { LOGIN } from '../graphql/mutations';
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';

const Login = (props) => {
    const [form] = Form.useForm();

    const [loginMutation, { error }] = useMutation(LOGIN);

    // const [hasMedicare, setHasMedicare] = useState(true);

    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            const { data } = await loginMutation({
                variables: {
                    email: values.email,
                    password: values.password
                } // refect queries depending on the page use useParams to ge the page
            });

            if (!data) {
                throw new Error('Couldnt login');
            }

            auth.login(data.login.token);
            props.hideModal(false);
        } catch(e) {
        
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    //alert
    const onClose = (e) => {
        console.log(e, 'I was closed.');
    };

    return (
        <>
        {error ? (
            <Alert
                message="Somethings wrong!"
                description={error.message}
                type="error"
                closable
                onClose={onClose}
                style={{
                    marginBottom:"10px"
                }}
            />
        ) : (
            <></>
        )}
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
        <Form.Item
            label="Email Address"
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
        </>
    );
};

export default Login;