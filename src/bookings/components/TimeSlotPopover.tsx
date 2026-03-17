"use client";

import { Card, Popover, Radio, message } from "antd";
import { Link } from "@tanstack/react-router";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { TimeSlotT } from "../types/BookSetup.type";
import { BookingT, BookingStatusT } from "../types/Booking.type";
import { updateBookingStatus } from "../actions/updateBookingStatus";

type TimeSlotPopoverProps = {
  timeSlot: TimeSlotT;
  children: React.ReactNode;
};

const TimeSlotPopover = ({ timeSlot, children }: TimeSlotPopoverProps) => {
  const handleUpdateBooking = async (id: string, status: BookingStatusT) => {
    try {
      await updateBookingStatus({
        id,
        status,
      });
      message.success("Booking status updated");
    } catch (error) {
      message.error("Failed to update booking status");
      console.error(error);
    }
  };

  return (
    <Popover
      title={
        timeSlot.booking?.patient ? (
          <Link to="/patients/$id" params={{ id: timeSlot.booking.patient.id }}>
            {timeSlot.booking.patient.firstName}
          </Link>
        ) : (
          <h3>Empty Slot</h3>
        )
      }
      placement="right"
      content={
        <div className={"booking-card"}>
          {timeSlot.booking ? (
            <>
              <div style={{ marginBottom: "10px" }}>
                <h4>Booking reason:</h4> {timeSlot.booking.type}
                <p>
                  <PhoneOutlined /> {timeSlot.booking.patient.phone}
                </p>
                <p>
                  <MailOutlined /> {timeSlot.booking.patient.email}
                </p>
              </div>

              <h4>Bookings notes:</h4>
              <Card className={"booking-note"}>{timeSlot.booking.note}</Card>

              {timeSlot.booking.type === "patient" && (
                <Radio.Group
                  block
                  defaultValue={timeSlot.booking.status}
                  onChange={(e) =>
                    timeSlot.booking &&
                    handleUpdateBooking(
                      timeSlot.booking?.id,
                      e.target.value as BookingStatusT,
                    )
                  }
                  options={[
                    { label: "Booked", value: "booked" },
                    { label: "Confirmed", value: "confirmed" },
                    { label: "Arrived", value: "arrived" },
                    { label: "Absent", value: "absent" },
                  ]}
                />
              )}
            </>
          ) : (
            <h3>Empty Slot</h3>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          ></div>
        </div>
      }
    >
      {children}
    </Popover>
  );
};

export default TimeSlotPopover;
