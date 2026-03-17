import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "antd";
import dayjs from "dayjs";
import { BookingFilterBar } from "../bookings/components/BookingFilterBar";
import { getBookSetups } from "../bookings/actions/getBookSetups";
import { getCurrentWeek } from "../bookings/actions/getCurrentWeek";
import { BookList } from "../bookings/components/BookList";
import { ContainedLayout } from "../lib/components/ContainedLayout";
import { BookSetupT } from "../bookings/types/BookSetup.type";

type BookingsSearch = {
  bookStartDate?: string;
  bookEndDate?: string;
};

export const Route = createFileRoute("/bookings")({
  validateSearch: (search: Record<string, unknown>): BookingsSearch => ({
    bookStartDate:
      typeof search.bookStartDate === "string"
        ? search.bookStartDate
        : undefined,
    bookEndDate:
      typeof search.bookEndDate === "string" ? search.bookEndDate : undefined,
  }),
  loaderDeps: ({ search }) => search,
  loader: async ({ deps }) => {
    const bookStartDate = deps.bookStartDate;
    const bookEndDate = deps.bookEndDate;

    const bookSetupRange =
      bookStartDate && bookEndDate
        ? [dayjs(bookStartDate), dayjs(bookEndDate)]
        : getCurrentWeek();

    const bookSetups = await getBookSetups({
      data: {
        startDate: bookSetupRange[0].toISOString(),
        endDate: bookSetupRange[1].toISOString(),
      },
    });

    return {
      bookSetups: bookSetups as BookSetupT[],
      startLabel: bookSetupRange[0].format("DD MMM YYYY"),
      endLabel: bookSetupRange[1].format("DD MMM YYYY"),
    };
  },
  component: BookingsPage,
});

function BookingsPage() {
  const { bookSetups, startLabel, endLabel } = Route.useLoaderData();

  return (
    <ContainedLayout
      crumbs={["Bookings", `${startLabel} - ${endLabel}`]}
      filterBar={<BookingFilterBar />}
    >
      <Layout hasSider style={{ display: "flex", gap: "24px" }}>
        <Layout.Content>
          {bookSetups.map((bookSetup) => (
            <BookList bookSetup={bookSetup as any} key={bookSetup.id} />
          ))}
        </Layout.Content>
      </Layout>
    </ContainedLayout>
  );
}
