import React, { useState } from 'react';

// antd
import { Button, Checkbox, Form, Input, Select, DatePicker, Card } from 'antd';
import moment from 'moment';

// tinyMCE
import { Editor } from "@tinymce/tinymce-react";


// utils
import { getSph, getCyl, getAxis, createRxNotation, rxNotationRegex } from '../utils/rxNotation'

// grpahQL
import { UPDATE_CLINICAL_FILE } from '../graphql/mutations';
import { GET_PATIENT, GET_TINYMCE_KEY } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

const { Option } = Select;

// component
const ViewClinicalFile = (props) => {
    const [form] = Form.useForm();

    const { data, loading } = useQuery(GET_TINYMCE_KEY);

    const [updateClinicalFile] = useMutation(UPDATE_CLINICAL_FILE);

    // conditionally required if prescription is selected
    const [isPrescription, setIsPrescription] = useState(props.selectedClinicalFileData.file_type === "prescription");

    // const rxNotationRegex = new RegExp(
    //     "[-,+]\\d+\\.(00|25|50|75)\\/-(\\d+.(00|25|50|75)x[1-9][0-8]?[0-9]?|0\\.00x000)$"
    // );

    console.log(props.selectedClinicalFileData)

    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(props)
        console.log(values.tinyMCEValue2?.level.content)

        updateClinicalFile({
            variables: {
                onPatientId: props.patientId,
                fileToUpdateId: props.selectedClinicalFileData._id,
                fileType: values.fileType,
                title: values.title,
                textField: values.tinyMCEValue2?.level.content || props.selectedClinicalFileData.text_field, // becuase tinymce doesnt exactly work like the other inputs, it wont give its initial val as the value on submit. itll give nothing if the user doesnt change anything in the input
                medicareItemCode: values.medicareItemCode,
                
                pprSphere: values.previousRight ? getSph(values.previousRight) : undefined,
                pprCylinder: values.previousRight ? getCyl(values.previousRight) : undefined,
                pprAxis: values.previousRight ? getAxis(values.previousRight) : undefined,
                pplSphere: values.previousLeft ? getSph(values.previousLeft) : undefined,
                pplCylinder: values.previousLeft ? getCyl(values.previousLeft) : undefined,
                pplAxis: values.previousLeft ? getAxis(values.previousLeft) : undefined,
                ppInterAdd: parseFloat(values.previousInterAdd) || 0,
                ppNearAdd: parseFloat(values.previousNearAdd) || 0,

                gprSphere: values.givenRight ? getSph(values.givenRight) : undefined,
                gprCylinder: values.givenRight ? getCyl(values.givenRight) : undefined,
                gprAxis: values.givenRight ? getAxis(values.givenRight) : undefined,
                gplSphere: values.givenLeft ? getSph(values.givenLeft) : undefined,
                gplCylinder: values.givenLeft ? getCyl(values.givenLeft) : undefined,
                gplAxis: values.givenLeft ? getAxis(values.givenLeft) : undefined,
                gpInterAdd: parseFloat(values.givenInterAdd) || 0,
                gpNearAdd: parseFloat(values.givenNearAdd) || 0
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
                fileType: props.selectedClinicalFileData.file_type,
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
                previousInterAdd: props.selectedClinicalFileData.prev_prescription.inter_add || '',
                previousNearAdd: props.selectedClinicalFileData.prev_prescription.near_add || '',

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
                    ? setIsPrescription(true)
                    : setIsPrescription(false);
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
            {loading ? (
                <></>
            ) : (
                <Editor
                    apiKey={data.getTinyMCEApiKey.key}
                    init={{
                        menubar: false,
                        plugins: "link image code autoresize lists",
                        toolbar:
                        "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help"
                    }}
                    initialValue={props.selectedClinicalFileData.text_field}
                />
            )}
        </Form.Item>

        <Form.Item
            label="Recall"
            name="recall"
            rules={[
            {
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

        <Card style={{marginBottom: 20}}>
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
                <Input disabled={!isPrescription} placeholder="(-/+)0.00/-0.00x000" />
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
                <Input disabled={!isPrescription} placeholder="(-/+)0.00/-0.00x000" />
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
                    disabled={!isPrescription}
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
                    disabled={!isPrescription}
                    style={{ width: "100px" }}
                    placeholder="Inter Add"
                />
            </Form.Item>
        </Card>

        <Card style={{marginBottom: 20}}>
            <Form.Item
                label="Given R"
                name="givenRight"
                rules={[
                {
                    required: isPrescription,
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
                <Input disabled={!isPrescription} placeholder="(-/+)0.00/-0.00x000" />
            </Form.Item>

            <Form.Item
                label="Given L"
                name="givenLeft"
                rules={[
                {
                    required: isPrescription,
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
                <Input disabled={!isPrescription} placeholder="(-/+)0.00/-0.00x000" />
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
                disabled={!isPrescription}
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
                    disabled={!isPrescription}
                    style={{ width: "100px" }}
                    placeholder="Inter Add"
                />
            </Form.Item>
        </Card>

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
            offset: 5,
            span: 16
            }}
        >
            <Button type="primary" htmlType="submit">
                Update file
            </Button>
        </Form.Item>
    </Form>
  );
};

export default ViewClinicalFile;