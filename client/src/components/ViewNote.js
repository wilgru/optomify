import React, { useState } from 'react';

// antd
import { Button, Checkbox, Form, Input, Select, DatePicker, Card } from 'antd';
import moment from 'moment';

// tinyMCE
import { Editor } from "@tinymce/tinymce-react";

// grpahQL
import { UPDATE_NOTE } from '../graphql/mutations';
import { GET_PATIENT } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const { Option } = Select;

// component
const ViewClinicalFile = (props) => {
    const [form] = Form.useForm();

    const [createNewClinicalFile, { data, loading, error }] = useMutation(UPDATE_NOTE);

    console.log(props.selectedNoteData)

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(props)
        console.log(values.tinyMCEValue3?.level.content)

        
        createNewClinicalFile({
            variables: {
                onPatientId: props.patientId,
                noteToUpdateId: props.selectedNoteData._id,
                title: values.title,
                textField: values.tinyMCEValue3?.level.content,
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
                fileType: "prescription",
                title: props.selectedNoteData.title,
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
            name="tinyMCEValue3"
            valuePropName="tinyMCEValue3"
            rules={[
            {
                required: true,
                message: "Please input some text!"
            }
            ]}
        >
            <Editor
                apiKey={process.env.REACT_APP_TINYMCEAPIKEY}
                init={{
                    menubar: false,
                    plugins: "link image code autoresize lists",
                    toolbar:
                    "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
                }}
                initialValue={props.selectedNoteData.text_field}
            />
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 5,
            span: 16
            }}
        >
            <Button type="primary" htmlType="submit">
                Update note
            </Button>
        </Form.Item>
    </Form>
  );
};

export default ViewClinicalFile;