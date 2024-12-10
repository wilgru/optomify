import { List } from "antd";
import { BookSetup, TimeSlot } from "../types/BookSetup.type";
import TimeSlotPopover from "./TimeSlotPopover";
import { BookingReason } from "../types/Booking.type";
import {
  EyeOutlined,
  ExclamationCircleOutlined,
  CarOutlined,
  ReloadOutlined,
  SmallDashOutlined,
  CoffeeOutlined,
  StopOutlined,
} from "@ant-design/icons";

const BookingReasonIcon = ({ reason }: { reason: BookingReason | null }) => {
  if (reason === "general") {
    return <EyeOutlined style={{ fontSize: "20px", margin: "auto 10px" }} />;
  } else if (reason === "health concern") {
    return (
      <ExclamationCircleOutlined
        style={{ fontSize: "20px", margin: "auto 10px" }}
      />
    );
  } else if (reason === "rms") {
    return <CarOutlined style={{ fontSize: "20px", margin: "auto 10px" }} />;
  } else if (reason === "recheck") {
    return <ReloadOutlined style={{ fontSize: "20px", margin: "auto 10px" }} />;
  } else if (reason === "other") {
    return (
      <SmallDashOutlined style={{ fontSize: "20px", margin: "auto 10px" }} />
    );
  } else if (reason === "break") {
    return <CoffeeOutlined style={{ fontSize: "20px", margin: "auto 10px" }} />;
  } else if (reason === "blocked") {
    return <StopOutlined style={{ fontSize: "20px", margin: "auto 10px" }} />;
  }

  return (
    <SmallDashOutlined style={{ fontSize: "20px", margin: "auto 10px" }} />
  );
};

const generateTimeSlots = (bookSetup: BookSetup) => {
  const { openTime, closingTime } = bookSetup;
  const startDate = openTime;
  const endDate = closingTime;

  const timeSlots: TimeSlot[] = [];

  let currentDate = startDate;

  while (currentDate <= endDate) {
    const foundBooking = bookSetup.bookings.find((booking) =>
      booking.bookingTime.isSame(currentDate)
    );

    timeSlots.push({
      bookSetupId: bookSetup.id,
      time: currentDate,
      booking: foundBooking ?? null,
    });
    currentDate = currentDate.add(30, "minutes");
  }

  return timeSlots;
};

export const BookList = ({
  bookSetup,
  onSelectTimeSlot,
}: {
  bookSetup: BookSetup;
  onSelectTimeSlot: (timeSlot: TimeSlot) => void;
}) => {
  const timeSlots: TimeSlot[] = generateTimeSlots(bookSetup);

  const renderItem = (timeSlot: TimeSlot) => {
    return (
      <List.Item
        className={`${timeSlot.booking?.status} ${timeSlot.booking?.hasPassed} appt-li`}
        onClick={() => {
          onSelectTimeSlot(timeSlot);
        }}
      >
        <TimeSlotPopover timeSlot={timeSlot}>
          {timeSlot.booking && (
            <div
              style={{
                display: "flex",
                width: "100%",
                padding: !timeSlot?.booking?.reason ? "0 0 0 10px" : "0",
              }}
            >
              <BookingReasonIcon reason={timeSlot?.booking?.reason} />
              <h4> Booking patient name here</h4>
              <h4 style={{ margin: 0 }}>{timeSlot?.booking?.reason}</h4>
            </div>
          )}
        </TimeSlotPopover>
      </List.Item>
    );
  };

  return (
    <List
      key={bookSetup.id}
      header={
        <div
          style={{
            fontStyle: bookSetup.isToday ? "italic" : "initial",
            fontWeight: bookSetup.isToday ? "bold" : "initial",
          }}
        >
          {bookSetup.date.format("ddd MMM Do, YYYY")}
        </div>
      }
      bordered
      itemLayout="horizontal"
      dataSource={timeSlots}
      style={{
        marginRight: "20px",
        width: "100%",
      }}
      renderItem={renderItem}
    />
  );
};
