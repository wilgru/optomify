import React, { useState } from 'react';

// antd
import { Button, TimePicker, Form, Input, DatePicker, Card } from 'antd';
import moment from 'moment';

// grpahQL
import { SETUP_BOOK } from '../graphql/mutations';
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

// component
const SetupBook = (props) => {
    const [form] = Form.useForm();

    const [opening, setOpening] = useState(moment('10:00', "HH:mm"))
    const [closing, setClosing] = useState(moment('19:00', "HH:mm"))
    const [optomBreak, setOptomBreak] = useState(moment('13:00', "HH:mm"))

    const [setupBook, { data, loading, error }] = useMutation(SETUP_BOOK);

    const onFinish = (values) => {
        // console.log('Success:', values);
        const date = values.date.format('YYYY-MM-DD')
        const full_date = values.date.format('YYYY-MM-DDT00:00:00+00:00')
        const open_time = date+values.opening.format('THH:mm:00+00:00')
        const closing_time = date+values.closing.format('THH:mm:00+00:00')
        const break_time = date+values.break.format('THH:mm:00+00:00')

        // console.log(full_date, open_time, closing_time, break_time)

        setupBook({
            variables: {
                date: full_date,
                openTime: open_time,
                closingTime: closing_time,
                optomBreakStart: break_time,
                optomBreakEnd: break_time
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        });  
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 9
            }}
            wrapperCol={{
                span: 14
            }}
            initialValues={{
                opening: moment('10:00', "HH:mm"),
                closing: moment('19:00', "HH:mm"),
                break: moment('13:00', "HH:mm"),
            }}
            style={{
                marginTop:'20px'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >

        <Form.Item
            label="Date"
            name="date"
            rules={[
                {
                    required: true,
                    message: "Select a time"
                }
                ]}
        >
            <DatePicker />
        </Form.Item>

        <Form.Item
            label="Opening"
            name="opening"
            hasFeedback
                rules={[
                {
                    required: true,
                    message: "Select a time"
                },
                {
                    validator: async (_, value) => {
                    if (!value) return;

                    if (value.minutes() % 30 === 0 || value.minutes() === 0) {
                        return Promise.resolve(); //resolve to say true or it passed
                    } else {
                        return Promise.reject(new Error("30 min blocks only"));
                    }
                    },
                    message: "30 min blocks only"
                },
                {
                    validator: async (_, value) => {
                    if (!value) return;
    
                    if (value < closing && value < optomBreak) {
                        return Promise.resolve(); //resolve to say true or it passed
                    } else {
                        return Promise.reject(new Error("Should be earliest"));
                    }
                    },
                    message: "Should be earliest"
                }
            ]}
        >
            <TimePicker 
                defaultValue={moment('10:00', "HH:mm")} 
                format={"HH:mm"} 
                onChange={(value) => {
                    setOpening(value)
                }}
            />
        </Form.Item>

        <Form.Item
            label="Closing"
            name="closing"
            hasFeedback
            rules={[
                {
                    required: true,
                    message: "Select a time"
                },
                {
                    validator: async (_, value) => {
                    if (!value) return;

                    if (value.minutes() % 30 === 0 || value.minutes() === 0) {
                        return Promise.resolve(); //resolve to say true or it passed
                    } else {
                        return Promise.reject(new Error("30 min blocks only"));
                    }
                    },
                    message: "30 min blocks only"
                },
                {
                    validator: async (_, value) => {
                    if (!value) return;

                    if (value > opening && value > optomBreak) {
                        return Promise.resolve(); //resolve to say true or it passed
                    } else {
                        return Promise.reject(new Error("Should be last"));
                    }
                    },
                    message: "Should be last"
                }
            ]}
        >
            <TimePicker 
                defaultValue={moment('19:00', "HH:mm")} 
                format={"HH:mm"} 
                onChange={(value) => {
                    setClosing(value)
                }}
            />
        </Form.Item>

        <Form.Item
            label="Break"
            name="break"
            rules={[
                {
                    required: true,
                    message: "Select a time"
                },
                {
                    validator: async (_, value) => {
                        console.log(value.minutes());
                        console.log(value.minutes() % 30 === 0 );
                        console.log(value.minutes() === 0);
                    if (!value) return;

                    if (value.minutes() % 30 === 0 || value.minutes() === 0) {
                        return Promise.resolve(); //resolve to say true or it passed
                    } else {
                        return Promise.reject(new Error("30 min blocks only"));
                    }
                    },
                    message: "30 min blocks only"
                },
                {
                    validator: async (_, value) => {
                    if (!value) return;

                    if (value > opening && value < closing) {
                        return Promise.resolve(); //resolve to say true or it passed
                    } else {
                        return Promise.reject(new Error("Should be in between"));
                    }
                    },
                    message: "Should be in between"
                }
            ]}
        >
            <TimePicker 
                defaultValue={moment('12:00', "HH:mm")} 
                format={"HH:mm"} 
                onChange={(value) => {
                    setOptomBreak(value)
                }}
            />
        </Form.Item>

        <Form.Item
            wrapperCol={{
            offset: 5,
            span: 16
            }}
        >
            <Button type="primary" htmlType="submit">
                Set up book
            </Button>
        </Form.Item>
    </Form>
  );
};

export default SetupBook;