// React
import React, { useEffect, useState } from 'react';

// Ant Design
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, DatePicker, Menu, Space, Button } from 'antd';
import moment from 'moment';

// grpahQL
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

// Utils
import { getWeek } from '../utils.js/date';

// Ant Design from components
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

// const items2old = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
//     const key = String(index + 1);
//     return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//         const subKey = index * 4 + j + 1;
//         return {
//         key: subKey,
//         label: `option${subKey}`,
//         };
//     }),
//     };
// });

const Bookings = () => {
    //start date and end date for bookings to show
    const [startDate, setStartDate] = useState(getWeek().firstDay.toISOString());
    const [endDate, setEndDate] = useState(getWeek().lastDay.toISOString());

    console.log(startDate, endDate)

    // get booksetup and bookings
    const { loading, data } = useQuery(GET_BOOK_SETUPS, {
        variables: {
            startDate,
            endDate
        },
        fetchPolicy: "no-cache"
    });

    const bookSetupData = data?.getBookSetups || {};

    // listener for date range picker
    const onPanelChange = (value, mode) => {
        console.log('Start date:', value[0].format('YYYY-MM-DDT00:00:00+00.00'));
        console.log('End date:', value[1].format('YYYY-MM-DDT00:00:00+00.00'));

        // https://stackoverflow.com/questions/563406/how-to-add-days-to-date
        function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        }
        
        // https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
        function getDates(startDate, stopDate) {
            var dateArray = new Array();
            var currentDate = startDate;
            while (currentDate <= stopDate) {
                dateArray.push(new Date (currentDate));
                currentDate = addDays(currentDate, 1);
            }
            return dateArray;
        }

        // console.log(value[0].format('YYYY-MM-DD'), mode);
        // console.log(value[1].format('YYYY-MM-DD'), mode);
    };

    // sub nav options
    const items2 = [
        {
            key: 'sub1',
            label: 'Time Range',
            children: [
                {
                    key: 'sub1option1',
                    label: (    
                        <div>
                            <RangePicker size={"small"} format={[ "DD MMM", "YYYY-MM-DDTHH:mm:ss"]} defaultValue={[moment(startDate, "YYYY-MM-DDT00:00:00+00.00"), moment(endDate, "YYYY-MM-DDT00:00:00+00.00")]} onChange={onPanelChange}/>
                            <Button type="primary">Button</Button>
                        </div>
                    )
                }
            ]
        },
        {
            key: 'sub2',
            label: 'Next Appt. Details',
            children: [
                {
                    key: 'sub2option1',
                    label: (    
                        <>

                        </>
                    )
                }
            ]
        }
    ]

    console.log(bookSetupData)

    return (
        // <Content style={{padding: '20px'}}>
        //     <Layout>
        //         <Sider width={200} className="site-layout-background" style={{padding: '20px'}}>
        //             <h1>Date Range</h1>
        //             <RangePicker size={"small"} format={[ "DD MMMM", "YYYY-MM-DDTHH:mm:ss"]}/>
        //             <Button type="primary">Button</Button>
        //         </Sider>
        //         <Layout style={{padding: '0 24px 24px'}}>
        //             <Breadcrumb style={{ margin: '16px 0' }}>
        //                 <Breadcrumb.Item>Home</Breadcrumb.Item>
        //                 <Breadcrumb.Item>List</Breadcrumb.Item>
        //                 <Breadcrumb.Item>App</Breadcrumb.Item>
        //             </Breadcrumb>
        //             <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
        //                 Content
        //             </Content>
        //         </Layout>
        //     </Layout>
        // </Content>
        <Content style={{padding: '20px'}}>
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height: '100%'}} items={items2} />
            </Sider>
            <Layout style={{padding: '0 24px 24px'}}>
                <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                    {loading ? (
                        <h1>loading</h1>
                    ) : (
                        <h1>Loaded! hehe!</h1>
                    )}
                </Content>
            </Layout>
        </Layout>
    </Content>
    )
}

export default Bookings;