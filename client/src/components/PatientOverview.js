import { Button, Checkbox, Form, Input, DatePicker, Alert } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';

// grpahQL
// import { UPDATE_PATIENT } from '../graphql/mutations';
import { GET_PATIENT } from '../graphql/queries';
import { UPDATE_PATIENT } from '../graphql/mutations';
import { useMutation } from '@apollo/client';

const PatientOverview = (props) => {
    const [form] = Form.useForm();

    const [eligableForMedicare, setEligableForMedicare] = useState(props.patient.has_medicare)

    const [updatePatient, { data, loading, error }] = useMutation(UPDATE_PATIENT);

    const onFinish = (values) => {
        console.log('Success:', values);

        updatePatient({
            variables: {
                patientToUpdateId: props.patient._id,
                firstName: values.first_name || props.patient.first_name,
                lastName: values.last_name || props.patient.last_name,
                dob: values.dob || props.patient.dob,
                email: values.email || props.patient.email,
                mobileNumber: values.mobile_number || props.patient.mobile_number,
                hasMedicare: values.has_medicare || false,
                medicareNumber: values.medicare_number || props.patient.medicare_number,
                medicareRef: values.medicare_ref || props.patient.medicare_ref,
                medicareExp: values.medicare_exp || props.patient.medicare_exp
            },
            refetchQueries: [
                {query: GET_PATIENT},
                GET_PATIENT
            ]
        });
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
            labelCol={{
                span: 5,
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

            <Form.Item
                name="has_medicare"
                valuePropName="checked"
                wrapperCol={{
                offset: 5,
                span: 16,
                }}
            >
                <Checkbox             
                    onChange={(value) => {
                        value.target.checked === true
                        ? setEligableForMedicare(true)
                        : setEligableForMedicare(false);
                }}>
                    Eligable for Medicare
                </Checkbox>
            </Form.Item>

            <Form.Item
                label="medicare number"
                name="medicare_number"
                rules={[
                {
                    required: eligableForMedicare,
                    message: "please provide medicare"
                }
                ]}
            >
                <Input disabled={!eligableForMedicare} />
            </Form.Item>

            <Form.Item
                label="reference number"
                name="medicare_ref"
                rules={[
                {
                    required: eligableForMedicare,
                    message: "please provide medicare"
                }
                ]}
            >
                <Input disabled={!eligableForMedicare} />
            </Form.Item>

            <Form.Item
                label="expiry date"
                name="medicare_exp"
                rules={[
                {
                    required: eligableForMedicare,
                    message: "please provide medicare"
                }
                ]}
            >
                <DatePicker disabled={!eligableForMedicare} />
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
    </>
    );
};

export default PatientOverview;