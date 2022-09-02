import React, { useState } from 'react';

// antd
import { Button, Checkbox, Form, Input, DatePicker, Select, Card } from 'antd';

// grpahQL
import { CREATE_NEW_PATIENT_AND_BOOKING } from '../graphql/mutations';
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const { Option } = Select;
const { TextArea } = Input;

const BookingForm = (props) => {
    const [form] = Form.useForm();

    const [createNewPatientAndBooking] = useMutation(CREATE_NEW_PATIENT_AND_BOOKING);

    // conditionally required if prescription is selected
    const [hasMedicare, setEligableForMedicare] = useState(true);

    const onFinish = (values) => {
        console.log('Success:', values);

        createNewPatientAndBooking({
            variables: {
                firstName: values.first_name,
                lastName: values.last_name,
                dob: values.dob,
                email: values.email,
                mobileNumber: values.mobile_number,
                hasMedicare: values.has_medicare || false,
                medicareNumber: values.medicare_number,
                medicareRef: values.medicare_ref,
                medicareExp: values.medicare_exp,
                bookingDate: props.bookingDate,
                bookingStart: props.bookingStart,
                bookingEnd: props.bookingEnd,
                bookingType: values.bookingType,
                bookingNote: values.bookingNote
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        });
        
        props.modalVis(false);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Booking Reason"
                name="bookingType"
                hasFeedback
                rules={[
                {
                    required: true,
                    message: "Please select a file type!"
                }
                ]}
            >
                <Select
                    placeholder="Booking Reason"
                    onChange={(value) => {}}
                >
                    <Option value="general eye test">General eye test</Option>
                    <Option value="health concern">Health concern</Option>
                    <Option value="rms form">RMS form/Drivers License</Option>
                    <Option value="re-check">Re-check</Option>
                    <Option value="other">Other</Option>
                </Select>
            </Form.Item>

            <Form.Item
                label="First Name"
                name="first_name"
                rules={[
                {
                    required: true,
                    message: 'Please input your first name!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="last_name"
                rules={[
                {
                    required: true,
                    message: 'Please input your last name!',
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
                    message: '',
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
                    message: '',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="mobile number"
                name="mobile_number"
                rules={[
                {
                    required: true,
                    message: '',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Card style={{marginBottom: 20}}>
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
                            value.target.checked === true
                            ? setEligableForMedicare(true)
                            : setEligableForMedicare(false);
                        }}
                    >Eligable for Medicare</Checkbox>
                </Form.Item>

                <Form.Item
                    label="medicare number"
                    name="medicare_number"
                    rules={[
                    {
                        required: hasMedicare,
                        message: "please provide medicare"
                    }
                    ]}
                >
                    <Input disabled={!hasMedicare}/>
                </Form.Item>

                <Form.Item
                    label="reference number"
                    name="medicare_ref"
                    rules={[
                    {
                        required: hasMedicare,
                        message: "please provide medicare"
                    }
                    ]}
                >
                    <Input disabled={!hasMedicare}/>
                </Form.Item>

                <Form.Item
                    label="expiry date"
                    name="medicare_exp"
                    rules={[
                    {
                        required: hasMedicare,
                        message: "please provide medicare"
                    }
                    ]}
                >
                    <DatePicker disabled={!hasMedicare}/>
                </Form.Item>
            </Card>

            <Form.Item
                label="Booking Notes"
                name="bookingNote"
                hasFeedback
                wrapperCol={{
                    offset: 0,
                    span: 16
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
                <Button 
                    type="primary" 
                    htmlType="submit"
                >
                    Book Patient
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BookingForm;