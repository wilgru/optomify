import { Layout } from "antd";
import { BookingSidebar } from "./components/BookingSider";
import { getBookSetups } from "./actions/getBookSetups";
import { getCurrentWeek } from "./actions/getCurrentWeek";
import { BookList } from "./components/BookList";
import { Content } from "antd/es/layout/layout";
import dayjs from "dayjs";
import { ContainedLayout } from "../components/ContainedLayout";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    bookStartDate?: string;
    bookEndDate?: string;
  };
}) {
  const bookSetupRange =
    searchParams.bookStartDate && searchParams.bookEndDate
      ? [dayjs(searchParams.bookStartDate), dayjs(searchParams.bookEndDate)]
      : getCurrentWeek();

  const bookSetups = await getBookSetups(bookSetupRange[0], bookSetupRange[1]);

  return (
    <ContainedLayout
      crumbs={[
        "Bookings",
        `${bookSetupRange[0].format("DD MMM YYYY")} - ${bookSetupRange[1].format("DD MMM YYYY")}`,
      ]}
      sider={<BookingSidebar />}
    >
      <Layout hasSider style={{ display: "flex", gap: "24px" }}>
        <Content>
          {bookSetups.map((bookSetup) => (
            <BookList bookSetup={bookSetup} key={"bookSetup.id"} />
          ))}
        </Content>
      </Layout>
    </ContainedLayout>
  );
}
