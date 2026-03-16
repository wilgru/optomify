"use client";

import { Button, Card, DatePicker, Flex, Menu } from "antd";
import Link from "next/link";
import SetupBook from "./SetupBook";
import dayjs, { Dayjs } from "dayjs";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter, useSearchParams } from "next/navigation";

export const BookingFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookSetupRange: [Dayjs, Dayjs] = (() => {
    const bookStartDate = searchParams.get("bookStartDate");
    const bookEndDate = searchParams.get("bookEndDate");
    if (!bookStartDate || !bookEndDate)
      return [dayjs().startOf("week"), dayjs().endOf("week")];

    try {
      return [dayjs(bookStartDate), dayjs(bookEndDate)];
    } catch {
      return [dayjs().startOf("week"), dayjs().endOf("week")];
    }
  })();

  const handleDateChange = (value: [Dayjs, Dayjs] | null) => {
    if (!value) return;
    router.push(
      `?bookStartDate=${value[0].toISOString()}&bookEndDate=${value[1].toISOString()}`,
    );
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
        <Link href={`/patients/${nextPatient.id}`}>
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
