import { Layout } from "antd";
import { useState } from "react";
import { BookingSidebar } from "./components/BookingSider";
import { useBookSetups } from "./hooks/useBookSetups";
import { useCurrentWeek } from "../hooks/useCurrentWeek";
import { BookList } from "./components/BookList";
import { Dayjs } from "dayjs";
import BookingModal from "./components/BookingModal";
import { TimeSlot } from "./types/BookSetup.type";

const Page = () => {
  const { firstDay, lastDay } = useCurrentWeek();
  const [bookingTimeSlot, setBookingTimeSlot] = useState<TimeSlot | null>(null);

  const [bookSetupRange, setBookSetupRange] = useState<
    [Dayjs | null, Dayjs | null]
  >([firstDay, lastDay]);

  const { bookSetups } = useBookSetups(bookSetupRange[0], bookSetupRange[1]);

  return (
    <Layout.Content style={{ padding: "20px" }}>
      <BookingModal
        timeSlot={bookingTimeSlot}
        onClose={() => {
          setBookingTimeSlot(null);
        }}
      />

      <h1>Bookings</h1>

      <Layout>
        <BookingSidebar
          bookSetupRange={bookSetupRange}
          onChangeDateRange={(start, end) => {
            setBookSetupRange([start, end]);
          }}
        />
        <Layout style={{ padding: "0 24px 24px" }}>
          <Layout.Content
            className="site-layout-background"
            style={{ padding: "20 0", margin: 0, minHeight: 280 }}
          >
            <div
              style={{
                display: "flex",
              }}
            >
              {bookSetups.map((bookSetup) => (
                <BookList
                  bookSetup={bookSetup}
                  key={bookSetup.id}
                  onSelectTimeSlot={(timeSlot) => {
                    setBookingTimeSlot(timeSlot);
                  }}
                />
              ))}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout.Content>
  );
};

export default Page;
