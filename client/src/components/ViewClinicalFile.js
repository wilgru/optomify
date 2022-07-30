import React, { useState } from 'react';

// antd
import { Button, Checkbox, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';

// tinyMCE
import { Editor } from "@tinymce/tinymce-react";


// utils
import { dateWorker } from '../utils/date'
import { getSph, getCyl, getAxis, createRxNotation } from '../utils/rxNotation'

// grpahQL
import { CREATE_NEW_CLINICAL_FILE } from '../graphql/mutations';
import { GET_PATIENT } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const { Option } = Select;

// component
const ViewClinicalFile = (props) => {
    const [form] = Form.useForm();

    const [createNewClinicalFile, { data, loading, error }] = useMutation(CREATE_NEW_CLINICAL_FILE);

    // conditionally required if prescription is selected
    const [conditionalReq, setConditionalReq] = useState(true);

    const rxNotationRegex = new RegExp(
        "[-,+]\\d+\\.(00|25|75)\\/-(\\d+.(00|25|75)x[1-9][0-8]?[0-9]?|0\\.00x000)$"
    );

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(props.patientId)
        console.log(values.tinyMCEValue2?.level.content)

        if (values.fileType === "prescription") {
            createNewClinicalFile({
                variables: {
                    on_patient_id: props.patientId,
                    fileType: values.fileType,
                    title: values.title,
                    textField: values.tinyMCEValue2?.level.content,
                    medicareItemCode: values.medicareItemCode,

                    pprSphere: getSph(values.previousRight),
                    pprCylinder: getCyl(values.previousRight),
                    pprAxis: getAxis(values.previousRight),
                    pplSphere: getSph(values.previousLeft),
                    pplCylinder: getCyl(values.previousLeft),
                    pplAxis: getAxis(values.previousLeft),
                    ppInterAdd: parseInt(values.previousInterAdd),
                    ppNearAdd: parseInt(values.previousNearAdd),

                    gprSphere: getSph(values.givenRight),
                    gprCylinder: getCyl(values.givenRight),
                    gprAxis: getAxis(values.givenRight),
                    gplSphere: getSph(values.givenLeft),
                    gplCylinder: getCyl(values.givenLeft),
                    gplAxis: getAxis(values.givenLeft),
                    gpInterAdd: parseInt(values.givenInterAdd),
                    gpNearAdd: parseInt(values.givenNearAdd)
                },
                refetchQueries: [
                    {query: GET_PATIENT},
                    GET_PATIENT
                ]
            });
        }
        
        props.modalVis(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8
            }}
            wrapperCol={{
                span: 16
            }}
            initialValues={{
                fileType: "prescription",
                title: props.selectedClinicalFileData.title,
                medicareItemCode: props.selectedClinicalFileData.medicare_item_code,

                previousRight: createRxNotation(
                    props.selectedClinicalFileData.prev_prescription.right_od.sphere,
                    props.selectedClinicalFileData.prev_prescription.right_od.cylinder,
                    props.selectedClinicalFileData.prev_prescription.right_od.axis,
                ),
                previousLeft: createRxNotation(
                    props.selectedClinicalFileData.prev_prescription.left_os.sphere,
                    props.selectedClinicalFileData.prev_prescription.left_os.cylinder,
                    props.selectedClinicalFileData.prev_prescription.left_os.axis,
                ),
                previousInterAdd: props.selectedClinicalFileData.prev_prescription.inter_add,
                previousNearAdd: props.selectedClinicalFileData.prev_prescription.near_add,

                givenRight: createRxNotation(
                    props.selectedClinicalFileData.given_prescription.right_od.sphere,
                    props.selectedClinicalFileData.given_prescription.right_od.cylinder,
                    props.selectedClinicalFileData.given_prescription.right_od.axis,
                ),
                givenLeft: createRxNotation(
                    props.selectedClinicalFileData.given_prescription.left_os.sphere,
                    props.selectedClinicalFileData.given_prescription.left_os.cylinder,
                    props.selectedClinicalFileData.given_prescription.left_os.axis,
                ),
                givenInterAdd: props.selectedClinicalFileData.given_prescription.inter_add,
                givenNearAdd: props.selectedClinicalFileData.given_prescription.near_add,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

        <Form.Item
            label="Type"
            name="fileType"
            hasFeedback
            rules={[
            {
                required: true,
                message: "Please select a file type!"
            }
            ]}
        >
            <Select
                placeholder="File type"
                onChange={(value) => {
                    value === "prescription"
                    ? setConditionalReq(true)
                    : setConditionalReq(false);
                }}
            >
                <Option value="prescription">Prescription</Option>
                <Option value="health check">Health check</Option>
                <Option value="report">Report</Option>
            </Select>
        </Form.Item>

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
            name="tinyMCEValue2"
            valuePropName="tinyMCEValue2"
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
                initialValue={props.selectedClinicalFileData.text_field}
            />
        </Form.Item>

        <Form.Item
            label="Recall"
            name="recall"
            rules={[
            {
                required: conditionalReq,
                validator: async (_, value) => {
                if (!value) return;

                if (value > Date.now()) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("'title' is must be unique"));
                }
                },
                message: "Please input valid date in the future!"
            }
            ]}
        >
            <DatePicker />
        </Form.Item>

        <Form.Item label="Use notation">
            <span className="ant-form-text">(-/+)0.00/-0.00x000</span>
        </Form.Item>

        <Form.Item
            label="Previous R"
            name="previousRight"
            rules={[
            {
                validator: async (_, value) => {
                if (!value) return;

                if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Please enter prescription using the correct notation."));
                }
                },
                message: "Please enter prescription using the correct notation."
            }
            ]}
        >
            <Input disabled={!conditionalReq} placeholder="(-/+)0.00/-0.00x000" />
        </Form.Item>

        <Form.Item
            label="Previous L"
            name="previousLeft"
            rules={[
            {
                validator: async (_, value) => {
                if (!value) return;

                if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Please enter prescription using the correct notation."));
                }
                },
                message: "Please enter prescription using the correct notation."
            }
            ]}
        >
            <Input disabled={!conditionalReq} placeholder="(-/+)0.00/-0.00x000" />
        </Form.Item>

        <Form.Item
            label="Previous Inter add"
            name="previousInterAdd"
            rules={[
            {
                validator: async (_, value) => {
                if (!value) return;

                if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Must be a positive number measured in dioptres (steps of 0.25)."));
                }
                },
                message: "Must be a positive number measured in dioptres (steps of 0.25)."
            }
            ]}
        >
            <Input
                disabled={!conditionalReq}
                style={{ width: "100px" }}
                placeholder="Inter Add"
            />
        </Form.Item>

        <Form.Item
            label="Previous Near add"
            name="previousNearAdd"
            rules={[
            {
                validator: async (_, value) => {
                if (!value) return;

                if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Must be a positive number measured in dioptres (steps of 0.25)."));
                }
                },
                message: "Must be a positive number measured in dioptres (steps of 0.25)."
            }
            ]}
        >
            <Input
                disabled={!conditionalReq}
                style={{ width: "100px" }}
                placeholder="Inter Add"
            />
        </Form.Item>

        <Form.Item
            label="Given R"
            name="givenRight"
            rules={[
            {
                required: conditionalReq,
                validator: async (_, value) => {
                if (!value) return;

                if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Please enter prescription using the correct notation."));
                }
                },
                message: "Please enter prescription using the correct notation."
            }
            ]}
        >
            <Input disabled={!conditionalReq} placeholder="(-/+)0.00/-0.00x000" />
        </Form.Item>

        <Form.Item
            label="Given L"
            name="givenLeft"
            rules={[
            {
                required: conditionalReq,
                validator: async (_, value) => {
                if (!value) return;

                if (rxNotationRegex.test(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Please enter prescription using the correct notation."));
                }
                },
                message: "Please enter prescription using the correct notation."
            }
            ]}
        >
            <Input disabled={!conditionalReq} placeholder="(-/+)0.00/-0.00x000" />
        </Form.Item>

        <Form.Item
            label="Given Inter add"
            name="givenInterAdd"
            rules={[
            {
                validator: async (_, value) => {
                if (!value) return;

                if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Must be a positive number measured in dioptres (steps of 0.25)."));
                }
                },
                message: "Must be a positive number measured in dioptres (steps of 0.25)."
            }
            ]}
        >
            <Input
            disabled={!conditionalReq}
            style={{ width: "100px" }}
            placeholder="Inter Add"
            />
        </Form.Item>

        <Form.Item
            label="Near add"
            name="givenNearAdd"
            rules={[
            {
                validator: async (_, value) => {
                if (!value) return;

                if (!isNaN(value) && value % 0.25 === 0 && value > 0) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Must be a positive number measured in dioptres (steps of 0.25)."));
                }
                },
                message: "Must be a positive number measured in dioptres (steps of 0.25)."
            }
            ]}
        >
            <Input
                disabled={!conditionalReq}
                style={{ width: "100px" }}
                placeholder="Inter Add"
            />
        </Form.Item>

        <Form.Item
            label="Expiry"
            name="expiry"
            rules={[
            {
                required: conditionalReq,
                validator: async (_, value) => {
                if (!value) return;

                if (value > Date.now()) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("'title' is must be unique"));
                }
                },
                message: "Please input valid date in the future!"
            }
            ]}
        >
            <DatePicker disabled={!conditionalReq} />
        </Form.Item>

        <Form.Item
            label="Medicare item code"
            name="medicareItemCode"
            rules={[
            {
                validator: async (_, value) => {
                if (!value) return;

                if (!isNaN(value)) {
                    return Promise.resolve(); //resolve to say true or it passed
                } else {
                    return Promise.reject(new Error("Must be a number."));
                }
                },
                message: "Must be a number."
            }
            ]}
        >
            <Input
                style={{ width: "100px" }}
                placeholder="Inter Add"
            />
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 8,
            span: 16
            }}
        >
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>
    </Form>
  );
};

export default ViewClinicalFile;