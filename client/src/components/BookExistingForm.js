import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// antd
import { Button, Checkbox, Form, Input, Skeleton, Select, Divider, List, Card } from 'antd';
import moment from 'moment';

// utils
import { dateWorker } from '../utils/date'

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

        // console.log(new Date(values.dob.toISOString()))
        // console.log(dateWorker(new Date(values.dob.toISOString())))
        // console.log(new Date(values.medicare_exp.toISOString()))
        // console.log(dateWorker(new Date(values.medicare_exp.toISOString())))

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
    }

    return (
        <>
            <Card
                title="Search for existing patient"
                style={{
                    marginBottom: 10,
                }}
            >
                <Search
                    placeholder="search by name, email or mobile number"
                    allowClear
                    onSearch={onSearch}
                    style={{
                        marginBottom: 10,
                    }}
                />
                {(searchTerm != "" || selectedPatientId === "") ? (
                    <>
                        {loading ? (
                            <h1>loading...</h1>
                        ) : (
                            <>
                                <h3>
                                    {`Found ${patientData.length} patients:`}    
                                </h3>
                                <div
                                    id="scrollableDiv"
                                    style={{
                                        height: 200,
                                        overflow: 'auto',
                                        padding: '0 8px',
                                        marginBottom: 10,
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                >
                                    <InfiniteScroll
                                        dataLength={patientData.length}
                                        // next={loadMoreData}
                                        // hasMore={patientData.length < 50}
                                        // loader={
                                        // <Skeleton
                                        //     paragraph={{
                                        //     rows: 1,
                                        //     }}
                                        //     active
                                        // />
                                        // }
                                        // endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
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
                                                        setSelectedPatientId(event.target.getAttribute('data-patient-id'))
                                                        setSelectedPatientName(event.target.getAttribute('data-patient-name'))
                                                        setSearchTerm("")
                                                    }}
                                                >
                                                    <div>
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
                        <h4>
                            Booking for: {selectedPatientName}
                        </h4>
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