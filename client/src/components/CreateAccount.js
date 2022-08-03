import { Button, Form, Input, Alert } from 'antd';
import React, { useState } from 'react';

// grpahQL
import { CREATE_ACCOUNT } from '../graphql/mutations';
import { useMutation } from '@apollo/client';
import auth from '../utils/auth';

const Login = (props) => {
    const [form] = Form.useForm();

    const [createAccountMutation, { error }] = useMutation(CREATE_ACCOUNT);

    const onFinish = async (values) => {
        console.log('Success:', values);

        try {
            const { data } = await createAccountMutation({
                variables: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    username: values.username,
                    email: values.email,
                    password: values.password,
                } // refect queries depending on the page use useParams to ge the page
            });

            if (!data) {
                throw new Error('Couldnt create account');
            }

            auth.login(data.createNewUser.token);

            props.setLoggedIn(true);
            props.hideModal(false);
        } catch(e) {
        
        }
    };

    const [enteredPassword, setEnteredPassword] = useState("")

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
                label="First name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input a username' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email Address"
                name="email"
                rules={[{ required: true, message: 'Please input your Email' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input a password' }]}
            >
                <Input.Password                 
                    onChange={(value) => {
                        setEnteredPassword(value.target.value)
                        console.log(enteredPassword)
                    }
                }/>
            </Form.Item>

            <Form.Item
                label="Confirm password"
                name="confirmPassword"
                rules={[
                    { 
                        required: true, 
                        message: 'Please input a password'
                    },
                    {
                        validator: async (_, value) => {
                            if (!value) return;
            
                            if (value === enteredPassword) {
                                return Promise.resolve(); //resolve to say true or it passed
                            } else {
                                return Promise.reject(new Error("passwords do not match"));
                            }
                        },
                        message: "passwords do not match"
                    }
                ]}
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