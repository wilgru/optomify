import { Button, Checkbox, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

import { dateWorker } from '../utils/date'

// grpahQL
import { CREATE_NEW_PATIENT_AND_BOOKING } from '../graphql/mutations';
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const BookingForm = (props) => {
    const [form] = Form.useForm();
    const hasMedicare = Form.useWatch('has_medicare', form);

    const [createNewPatientAndBooking, { data, loading, error }] = useMutation(CREATE_NEW_PATIENT_AND_BOOKING);

    // const [hasMedicare, setHasMedicare] = useState(true);

    const onFinish = (values) => {
        console.log('Success:', values);

        console.log(new Date(values.dob.toISOString()))
        console.log(dateWorker(new Date(values.dob.toISOString())))
        console.log(new Date(values.medicare_exp.toISOString()))
        console.log(dateWorker(new Date(values.medicare_exp.toISOString())))
        // addNewPatient({ variables: {
        //     firstName: values.first_name,
        //     lastName: values.last_name,
        //     dob: values.dob,
        //     email: values.email,
        //     mobileNumber: values.mobile_number,
        //     hasMedicare: values.has_medicare,
        //     medicareNumber: values.medicare_number,
        //     medicare_Ref: values.medicare_ref,
        //     medicare_Exp: values.medicare_exp
        // }});

        // console.log(data.createNewPatient._id);
        // const patientId = data.createNewPatient._id

        // createNewBooking({ variables: {
        //     bookingDate: props.bookingDate,
        //     bookingStart: props.bookingStart,
        //     bookingEnd: props.bookingEnd,
        //     onPatientId: patientId,
        //     bookingType: "General eye test"
        // }})

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
                bookingType: "General eye test"
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        });
        
        props.modalVis(false);
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
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
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
                label="mobile_number"
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

            <Form.Item
                name="has_medicare"
                valuePropName="checked"
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Checkbox>Eligable for Medicare</Checkbox>
            </Form.Item>

            <Form.Item
                label="medicare number"
                name="medicare_number"
                rules={[
                {
                    required: hasMedicare,
                    message: '',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="reference number"
                name="medicare_ref"
                rules={[
                {
                    required: hasMedicare,
                    message: '',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="expiry date"
                name="medicare_exp"
                rules={[
                {
                    required: hasMedicare,
                    message: '',
                },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                offset: 8,
                span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default BookingForm;