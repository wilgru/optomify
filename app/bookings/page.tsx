import { Layout } from "antd";
import { BookingSidebar } from "./components/BookingSider";
import { getBookSetups } from "./actions/getBookSetups";
import { getCurrentWeek } from "./actions/getCurrentWeek";
import { BookList } from "./components/BookList";
import { Dayjs } from "dayjs";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    bookSetupRange?: [Dayjs, Dayjs];
  }>;
}) {
  const bookSetupRange = await searchParams.then(
    (params) => params.bookSetupRange ?? getCurrentWeek()
  );

  const bookSetups = await getBookSetups(bookSetupRange[0], bookSetupRange[1]);

  return (
    <Layout.Content style={{ padding: "20px" }}>
      <h1>Bookings</h1>

      <Layout>
        <BookingSidebar />
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
                <BookList bookSetup={bookSetup} key={bookSetup.id} />
              ))}
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout.Content>
  );
}
