import { Button, Checkbox, Form, Input, DatePicker } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// grpahQL
// import { UPDATE_PATIENT } from '../graphql/mutations';
import { GET_PATIENT } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const PatientOverview = (props) => {
    const [form] = Form.useForm();

    console.log(new Date(parseInt(props.patient.dob)))

    // const [hasMedicare, setHasMedicare] = useState(true);
    // useEffect(() => {
    //     form.setFieldValue({
    //         first_name: props.patient.first_name,
    //         last_name: props.patient.last_name,
    //         dob: props.patient.dob,
    //         email: props.patient.email,
    //         mobile_number: props.patient.mobileNumber,
    //         has_medicare: props.patient.hasMedicare,
    //         medicare_number: props.patient.medicareNumber,
    //         medicare_ref: props.patient.medicareRef,
    //         medicare_exp: props.patient.medicareExp
    //     })
    //     console.log(props.patient)
    // }, [props.patient])

    const onFinish = (values) => {
        console.log('Success:', values);

        // const [updatePatient, { data, loading, error }] = useMutation(UPDATE_PATIENT);

        // updatePatient({
        //     variables: {
        //         firstName: values.first_name,
        //         lastName: values.last_name,
        //         dob: values.dob,
        //         email: values.email,
        //         mobileNumber: values.mobile_number,
        //         hasMedicare: values.has_medicare,
        //         medicareNumber: values.medicare_number,
        //         medicare_Ref: values.medicare_ref,
        //         medicare_Exp: values.medicare_exp,
        //         bookingDate: props.patient.bookingDate,
        //         bookingStart: props.patient.bookingStart,
        //         bookingEnd: props.patient.bookingEnd,
        //         bookingType: "General eye test"
        //     },
        //     refetchQueries: [
        //         {query: GET_PATIENT},
        //         GET_PATIENT
        //     ]
        // });
        
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
            first_name: props.patient.first_name,
            last_name: props.patient.last_name,
            dob: moment(new Date(parseInt(props.patient.dob))),
            email: props.patient.email,
            mobile_number: props.patient.mobile_number,
            has_medicare: props.patient.has_medicare,
            medicare_number: props.patient.medicare_number,
            medicare_ref: props.patient.medicare_ref,
            medicare_exp: moment(new Date(parseInt(props.patient.medicare_exp)))
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
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="reference number"
            name="medicare_ref"
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="expiry date"
            name="medicare_exp"
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

export default PatientOverview;