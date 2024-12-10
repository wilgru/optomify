import { Button, Card, DatePicker, Layout, Menu } from "antd";
import Link from "next/link";
import SetupBook from "./SetupBook";
import dayjs, { Dayjs } from "dayjs";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { RangePicker } = DatePicker;

type BookingSidebarProps = {
  bookSetupRange: [Dayjs | null, Dayjs | null];
  onChangeDateRange: (start: Dayjs | null, end: Dayjs | null) => void;
};

export const BookingSidebar = ({
  bookSetupRange,
  onChangeDateRange,
}: BookingSidebarProps) => {
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

  // sub nav options
  const subNav = [
    {
      key: "sub1",
      label: "Show Range",
      children: [
        {
          key: "sub1option1",
          label: (
            <div>
              <RangePicker
                size={"small"}
                format={["DD MMM", "YYYY-MM-DDTHH:mm:ss"]}
                value={bookSetupRange}
                onChange={(value) => {
                  onChangeDateRange(value?.[0] ?? null, value?.[1] ?? null);
                }}
              />
              <Button type="primary">Button</Button>
            </div>
          ),
        },
      ],
    },
    {
      key: "sub2",
      label: "Next Appt. Details",
      children: [
        {
          key: "sub2option1",
          label: (
            <Card className="next-patient-card">
              <Link href={`/patients/${nextPatient.id}`}>
                <h4>{nextPatient.time.toString()}</h4>
                <h4>{`${nextPatient.firstName} ${nextPatient.lastName}`}</h4>
                <p>{nextPatient.bookingType}</p>
                <br />
                <p>
                  <PhoneOutlined /> {nextPatient.mobileNumber}
                </p>
                <p>
                  <MailOutlined /> {nextPatient.email}
                </p>
              </Link>
            </Card>
          ),
        },
      ],
    },
    {
      key: "sub3",
      label: "Add New Book",
      children: [
        {
          key: "sub3option1",
          label: <SetupBook />,
        },
      ],
    },
  ];

  return (
    <Sider width={220} className="site-layout-background">
      <Menu mode="inline" style={{ height: "100%" }} items={subNav} />
    </Sider>
  );
};
