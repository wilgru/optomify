import { Button, Checkbox, Form, Input, DatePicker } from 'antd';
import React, { useEffect, useState } from 'react';

// grpahQL
import { CREATE_NEW_PATIENT_AND_BOOKING } from '../graphql/mutations';
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const Login = (props) => {
    const [form] = Form.useForm();

    const [createNewPatientAndBooking, { data, loading, error }] = useMutation(CREATE_NEW_PATIENT_AND_BOOKING);

    // const [hasMedicare, setHasMedicare] = useState(true);

    const onFinish = (values) => {
        console.log('Success:', values);

        createNewPatientAndBooking({
            variables: {
                firstName: values.first_name,
                lastName: values.last_name,
                dob: values.dob,
                email: values.email,
                mobileNumber: values.mobile_number,
                hasMedicare: values.has_medicare,
                medicareNumber: values.medicare_number,
                medicare_Ref: values.medicare_ref,
                medicare_Exp: values.medicare_exp,
                bookingDate: props.bookingDate,
                bookingStart: props.bookingStart,
                bookingEnd: props.bookingEnd,
                bookingType: "General eye test"
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        });
        
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
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
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
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

        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>
    );
};

export default Login;