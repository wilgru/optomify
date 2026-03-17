"use client";

import { Card, DatePicker, Flex } from "antd";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import dayjs, { Dayjs } from "dayjs";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

export const BookingFilterBar = () => {
  const navigate = useNavigate({ from: "/bookings" });
  const searchParams = useSearch({ from: "/bookings" });

  const bookSetupRange: [Dayjs, Dayjs] = (() => {
    const bookStartDate = searchParams.bookStartDate;
    const bookEndDate = searchParams.bookEndDate;
    if (!bookStartDate || !bookEndDate)
      return [dayjs().startOf("week"), dayjs().endOf("week")];

    try {
      return [dayjs(bookStartDate), dayjs(bookEndDate)];
    } catch {
      return [dayjs().startOf("week"), dayjs().endOf("week")];
    }
  })();

  const handleDateChange = (value: [Dayjs | null, Dayjs | null] | null) => {
    if (!value) return;
    const start = value[0];
    const end = value[1];
    if (!start || !end) return;

    navigate({
      search: (prev) => ({
        ...prev,
        bookStartDate: start.toISOString(),
        bookEndDate: end.toISOString(),
      }),
    });
  };

  // const nextPatient = useNextPatient(bookSetups);
  const nextPatient = {
    id: "1",
    firstName: "First",
    lastName: "Last",
    bookingType: "patient",
    mobileNumber: "1234567890",
    email: "First@gmail.com",
    time: dayjs().hour(10).minute(0).second(0).millisecond(0),
  };

  return (
    <Flex gap="large">
      <div>
        <DatePicker.RangePicker
          size={"small"}
          format={["DD MMM", "YYYY-MM-DDTHH:mm:ss"]}
          value={bookSetupRange}
          onChange={handleDateChange}
        />
      </div>

      <Card className="next-patient-card">
        <Link to="/patients/$id" params={{ id: nextPatient.id }}>
          <Flex gap="large">
            <div>
              <h4>{`${nextPatient.firstName} ${nextPatient.lastName}`}</h4>
              <p>{nextPatient.time.toString()}</p>
            </div>

            <div>
              <p>
                <PhoneOutlined /> {nextPatient.mobileNumber}
              </p>
              <p>
                <MailOutlined /> {nextPatient.email}
              </p>
            </div>
          </Flex>
        </Link>
      </Card>
    </Flex>
  );
};
