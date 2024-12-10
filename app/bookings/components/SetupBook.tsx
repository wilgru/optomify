import React, { useState } from "react";
import { Button, TimePicker, Form, DatePicker } from "antd";
import dayjs from "dayjs";
import { BookSetup } from "../models/BookSetup";

const SetupBook = () => {
  const [form] = Form.useForm();

  const [opening, setOpening] = useState(dayjs("10:00", "HH:mm"));
  const [closing, setClosing] = useState(dayjs("19:00", "HH:mm"));
  const [optomBreak, setOptomBreak] = useState(dayjs("13:00", "HH:mm"));

  const onFinish = async (values) => {
    const date = values.date.format("YYYY-MM-DD");
    const fullDate = values.date.format("YYYY-MM-DDT00:00:00+00:00");
    const openTime = date + values.opening.format("THH:mm:00+00:00");
    const closingTime = date + values.closing.format("THH:mm:00+00:00");
    const breakTime = date + values.break.format("THH:mm:00+00:00");

    const bookSetup = new BookSetup({
      date: fullDate,
      openTime: openTime,
      closingTime: closingTime,
      break: breakTime,
      bookings: [],
    });
    await bookSetup.save();
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{
        span: 9,
      }}
      wrapperCol={{
        span: 14,
      }}
      initialValues={{
        opening: dayjs("10:00", "HH:mm"),
        closing: dayjs("19:00", "HH:mm"),
        break: dayjs("13:00", "HH:mm"),
      }}
      style={{
        marginTop: "20px",
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Date"
        name="date"
        rules={[
          {
            required: true,
            message: "Select a time",
          },
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
            message: "Select a time",
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
            message: "30 min blocks only",
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
            message: "Should be earliest",
          },
        ]}
      >
        <TimePicker
          defaultValue={dayjs("10:00", "HH:mm")}
          format={"HH:mm"}
          onChange={(value) => {
            setOpening(value);
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
            message: "Select a time",
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
            message: "30 min blocks only",
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
            message: "Should be last",
          },
        ]}
      >
        <TimePicker
          defaultValue={dayjs("19:00", "HH:mm")}
          format={"HH:mm"}
          onChange={(value) => {
            setClosing(value);
          }}
        />
      </Form.Item>

      <Form.Item
        label="Break"
        name="break"
        rules={[
          {
            required: true,
            message: "Select a time",
          },
          {
            validator: async (_, value) => {
              console.log(value.minutes());
              console.log(value.minutes() % 30 === 0);
              console.log(value.minutes() === 0);
              if (!value) return;

              if (value.minutes() % 30 === 0 || value.minutes() === 0) {
                return Promise.resolve(); //resolve to say true or it passed
              } else {
                return Promise.reject(new Error("30 min blocks only"));
              }
            },
            message: "30 min blocks only",
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
            message: "Should be in between",
          },
        ]}
      >
        <TimePicker
          defaultValue={dayjs("12:00", "HH:mm")}
          format={"HH:mm"}
          onChange={(value) => {
            setOptomBreak(value);
          }}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 5,
          span: 16,
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
