import React, { useState, useEffect } from 'react';

// antd
import { Button, Checkbox, Form, Input, Select, DatePicker, Card } from 'antd';
import moment from 'moment';

// tinyMCE
import { Editor } from "@tinymce/tinymce-react";

// grpahQL
import { CREATE_NEW_NOTE } from '../graphql/mutations';
import { GET_PATIENT, GET_TINYMCE_KEY } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

const { Option } = Select;

// component
const AddNote = (props) => {
    const [form] = Form.useForm();

    const { loading, data } = useQuery(GET_TINYMCE_KEY);
    const tinyMceKey = data?.getTinyMCEApiKey?.key || ""
    // if (data){
    //     console.log(data[Object.keys(data)[0]].key)
    //     console.log(data.getTinyMCEApiKey.key)
    // }

    // const tinyMceKey = ""
    // useEffect(() => {
    //     const tinyMceKey = data.getTinyMCEApiKey.key;
    // }, [data])

    const [createNewClinicalFile] = useMutation(CREATE_NEW_NOTE);

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(props.patientId)
        console.log(values.tinyMCEValue4?.level.content)

        createNewClinicalFile({
            variables: {
                onPatientId: props.patientId,
                title: values.title,
                textField: values.tinyMCEValue4?.level.content,
            },
            refetchQueries: [
                {query: GET_PATIENT},
                GET_PATIENT
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
                span: 5
            }}
            wrapperCol={{
                span: 16
            }}
            initialValues={{
                fileType: "prescription"
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

        <Form.Item
            label="Title"
            name="title"
            rules={[
            {
                required: true,
                message: "Please enter a title."
            }
            ]}
        >
            <Input placeholder="New file" />
        </Form.Item>

        <Form.Item
            label="Notes"
            name="tinyMCEValue4"
            valuePropName="tinyMCEValue4"
            rules={[
            {
                required: true,
                message: "Please input some text!"
            }
            ]}
        >
            {loading ? (
                <></>
            ) : (
                <Editor
                    apiKey={tinyMceKey}
                    init={{
                        menubar: false,
                        plugins: "link image code autoresize lists",
                        toolbar:
                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
                    }}
                    initialValue="<p>Your notes here</p>"
                />
            )}
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 5,
            span: 16
            }}
        >
            <Button type="primary" htmlType="submit">
                Add note
            </Button>
        </Form.Item>
    </Form>
  );
};

export default AddNote;