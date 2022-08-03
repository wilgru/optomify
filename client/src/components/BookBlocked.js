import React from 'react';

// antd
import { Button, Form, Input } from 'antd';

// grpahQL
import { CREATE_NEW_BOOKING } from '../graphql/mutations';
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation } from '@apollo/client';

// inputs 
const { TextArea } = Input;

// component
const BookBlocked = (props) => {
    const [form] = Form.useForm();

    // create new booking
    const [createNewBooking] = useMutation(CREATE_NEW_BOOKING);

    // on form submit
    const onFinish = (values) => {
        console.log('Values:', values);
        console.log('Props:', props);

        createNewBooking({
            variables: {
                bookingType: "blocked",
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

        props.modalVis(false);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 18,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Notes"
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
                    offset: 6,
                    span: 16
                    }}
                >
                    <Button type="danger" htmlType="submit">
                        Block 
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default BookBlocked;