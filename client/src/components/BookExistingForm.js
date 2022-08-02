import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// antd
import { Button, Form, Input, Skeleton, Select, Divider, List, Card } from 'antd';

// grpahQL
import { CREATE_NEW_BOOKING } from '../graphql/mutations';
import { GET_ALL_PATIENTS, GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

// inputs 
const { Option } = Select;
const { Search, TextArea } = Input;

// component
const BookExistingForm = (props) => {
    const [form] = Form.useForm();

    // for search field
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPatientId, setSelectedPatientId] = useState("")
    const [selectedPatientName, setSelectedPatientName] = useState("")

    // create new booking
    const [createNewBooking] = useMutation(CREATE_NEW_BOOKING);

    // get patients
    const { loading, data } = useQuery(GET_ALL_PATIENTS, {
        variables: {
            searchTerm
        },
        fetchPolicy: "no-cache"
    }) 
    const patientData = data?.getAllPatients || [];
    console.log(patientData)

    // on form submit
    const onFinish = (values) => {
        console.log('Values:', values);
        console.log('id:', selectedPatientId);
        console.log('Props:', props);

        createNewBooking({
            variables: {
                onPatientId: selectedPatientId,
                bookingType: values.bookingType,
                bookingDate: props.bookingDate,
                bookingStart: props.bookingStart,
                bookingEnd: props.bookingEnd,
                bookingNote: values.bookingNote || null
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        })
        
        setSearchTerm("")
        setSelectedPatientId("")
        setSelectedPatientName("")

        props.modalVis(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    // search field
    const onSearch = (value) => {
        setSearchTerm(value)
        setSelectedPatientId("")
    }

    return (
        <>
            <Card
                // title="Search for existing patient"
                title={
                    <Search
                        placeholder="search by name, email or mobile number"
                        allowClear
                        onSearch={onSearch}
                        style={{
                            marginBottom: '10px',
                        }}
                    />
                }
                style={{
                    marginBottom: '10px',
                    padding: '0'
                }}
            >
                {(selectedPatientId === "" && searchTerm !== "") ? (
                    <>
                        {loading ? (
                            <p>loading...</p>
                        ) : (
                            <>
                                <h3>
                                    {`Found ${patientData.length} patients:`}    
                                </h3>
                                <div
                                    id="scrollableDiv"
                                    style={{
                                        minHeight: 'fit-content',
                                        maxHeight: '200px',
                                        overflow: 'auto',
                                        padding: '0px',
                                        marginBottom: '10px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                >
                                    <InfiniteScroll
                                        dataLength={patientData.length}
                                        scrollableTarget="scrollableDiv"
                                    >
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={patientData}
                                            renderItem={(item) => (
                                                <List.Item 
                                                    className={"patient-record-li"}
                                                    data-patient-id={item._id}
                                                    data-patient-name={`${item.first_name} ${item.last_name}`}
                                                    onClick={(event)=>{
                                                        console.log(selectedPatientId)
                                                        setSelectedPatientId(event.target.closest('li').getAttribute('data-patient-id'))
                                                        setSelectedPatientName(event.target.closest('li').getAttribute('data-patient-name'))
                                                        setSearchTerm("")
                                                    }}
                                                >
                                                    <div style={{width: '100%'}}>
                                                        <h3>{`${item.first_name} ${item.last_name}`}</h3>
                                                        <h4>{item.email} </h4>
                                                    </div>
                                                </List.Item>
                                            )}
                                        />
                                    </InfiniteScroll>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <div>
                            Booking for:
                            <h3>{selectedPatientName}</h3>
                        </div>
                    </>
                )}
            </Card>

            <Form
                name="basic"
                labelCol={{
                    span: 6,
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
                    label="Booking Reason"
                    name="bookingType"
                    hasFeedback
                    wrapperCol={{
                        offset: 2,
                        span: 16
                        }}
                    rules={[
                    {
                        required: true,
                        message: "Please select a booking type!"
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
                    label="Booking Notes"
                    name="bookingNote"
                    hasFeedback
                    wrapperCol={{
                        offset: 2,
                        span: 16
                        }}
                >
                    <TextArea />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Book patient
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default BookExistingForm;