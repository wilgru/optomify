import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

// antd
import { Button, Checkbox, Form, Input, Skeleton, Select } from 'antd';
import moment from 'moment';

// utils
import { dateWorker } from '../utils/date'

// grpahQL
import { CREATE_NEW_BOOKING } from '../graphql/mutations';
import { GET_ALL_PATIENTS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

const { Option } = Select;
const { Search } = Input;

const BookExistingForm = (props) => {
    const [form] = Form.useForm();

    // for search field
    const [searchTerm, setSearchTerm] = useState("")

    // const [createNewBooking] = useMutation(CREATE_NEW_BOOKING);

    // get patients
    const { data } = useQuery(GET_ALL_PATIENTS, {
        variables: {
            searchTerm
        },
        fetchPolicy: "no-cache"
    }) 
    const patientData = data?.getAllPatients || [];

    // on form submit
    const onFinish = (values) => {
        console.log('Success:', values);

        console.log(new Date(values.dob.toISOString()))
        console.log(dateWorker(new Date(values.dob.toISOString())))
        console.log(new Date(values.medicare_exp.toISOString()))
        console.log(dateWorker(new Date(values.medicare_exp.toISOString())))

        
        
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
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{
                    marginBottom: 10,
                }}
            />
            {searchTerm != "" ? (
                <div
                    id="scrollableDiv"
                    style={{
                        height: 200,
                        overflow: 'auto',
                        padding: '0 16px',
                        border: '1px solid rgba(140, 140, 140, 0.35)',
                    }}
                >
                    <InfiniteScroll
                        dataLength={data.length}
                        next={loadMoreData}
                        hasMore={data.length < 50}
                        loader={
                        <Skeleton
                            paragraph={{
                            rows: 1,
                            }}
                            active
                        />
                        }
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            header={`Number of records: ${patientData.length}`}
                            bordered
                            itemLayout="horizontal"
                            dataSource={patientData}
                            renderItem={(item) => (
                                <List.Item  className={"patient-record-li"}>
                                    <div>
                                        <h3>{`${item.first_name} ${item.last_name}`}</h3>
                                        <h4>{item.email} </h4>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            ) : (
                <></>
            )}

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
                    label="Booking Reason"
                    name="bookingType"
                    hasFeedback
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
                        <Option value="health check">Health concern</Option>
                        <Option value="rms form">RMS form/Drivers License</Option>
                        <Option value="re-check">Re-check</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
            </Form>
        </>
    );
};

export default BookExistingForm;