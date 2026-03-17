"use client";

import React from "react";
import { Button, Form, Modal } from "antd";
import BookNewForm from "./BookNewForm";
import { TimeSlotT } from "../types/BookSetup.type";

const BookingModal = ({
  timeSlot,
  onClose,
}: {
  timeSlot: TimeSlotT | null;
  onClose: () => void;
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Book new patient"
      open={!!timeSlot}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            form.submit();
          }}
        >
          Submit
        </Button>
      }
    >
      {timeSlot && (
        <BookNewForm
          form={form}
          timeSlot={timeSlot}
          onFinishSuccess={onClose}
        />
      )}
      {/* <BookExistingForm timeSlot={timeSlot} onFinish={onClose} /> */}
      {/* <BookBlockedForm timeSlot={timeSlot} onFinish={onClose} /> */}
    </Modal>
  );
};

export default BookingModal;
