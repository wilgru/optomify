// React
import React, { useEffect, useState } from 'react';

// Ant Design
import { List, Layout, DatePicker, Menu, Button, Card, Modal, Popover } from 'antd';
import BookingForm from '../components/BookingForm';
import {
    SyncOutlined,
    EyeOutlined,
    CoffeeOutlined
  } from '@ant-design/icons';

import moment from 'moment';

// grpahQL
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

// Utils
import { getWeek } from '../utils/date';

// Ant Design from components
const { Content, Sider } = Layout;
const { Meta } = Card;
const { RangePicker } = DatePicker;

const Bookings = () => {
    //start date and end date for bookings to show
    const [startDate, setStartDate] = useState(getWeek().firstDay.toISOString());
    const [endDate, setEndDate] = useState(getWeek().lastDay.toISOString());

    // for booking modal
    const [bookingDate, setBookingDate] = useState('')
    const [bookingStart, setbookingStart] = useState('')
    const [bookingEnd, setbookingEnd] = useState('')

    // get booksetup and bookings
    const { loading, data } = useQuery(GET_BOOK_SETUPS, {
        variables: {
            startDate,
            endDate
        },
        fetchPolicy: "no-cache"
    });
    const bookSetupData = data?.getBookSetups || [];
    const bookingList = []

    // buttons for popover
    const newButtonSet = {
        Empty: [
            {text: "Book New", clickFn: function(event){}}, 
            {text: "Book Existing", clickFn: function(event){}}, 
            {text: "Block", clickFn: function(event){}}
        ],
        Booked: [
            {text: "Confirm", clickFn: function(event){}}, 
            {text: "Arrive", clickFn: function(event){}}, 
            {text: "Cancel", clickFn: function(event){}}
        ],
        Confirmed: [
            {text: "Arrive", clickFn: function(event){}}, 
            {text: "Cancel", clickFn: function(event){}}
        ],
        Arrived: [
            {text: "Cancel", clickFn: function(event){}}
        ],
        Blocked: [
            {text: "Cancel", clickFn: function(event){}}
        ],
        OptomBreak: [],
    };

    // buttons for popover
    const buttonSet = {
        Empty: ["Book New", "Book Existing", "Block"],
        Booked: ["Confirm", "Arrive", "Cancel"],
        Confirmed: ["Arrive", "Cancel"],
        Arrived: ["Cancel"],
        Blocked: ["Cancel"],
        OptomBreak: [],
    };

    // populate bookingList
    bookSetupData.forEach((day) => {
        // console.log("DAY HERE")
        // console.log(day)
        let todaysList = {}
        const today = new Date(parseInt(day.open_time)).toISOString()
        const todayUTC = moment.utc(today).subtract(10, 'h');
        todaysList.date = todayUTC;
        todaysList.list = [];

        // find static times
        const opening = new Date(parseInt(day.open_time)).toISOString()
        const openingUTC = moment.utc(opening).subtract(10, 'h');

        const closing = new Date(parseInt(day.closing_time)).toISOString()
        const closingUTC = moment.utc(closing).subtract(10, 'h');

        const optomBreak = new Date(parseInt(day.optom_break_start)).toISOString()
        const optomBreakUTC = moment.utc(optomBreak).subtract(10, 'h');

        // init cursor
        let cursorUTC = moment(openingUTC)
        
        while (moment(cursorUTC).isBefore(closingUTC)) {

            let busy = false

            // first check for optom break
            if (moment(cursorUTC).isSame(optomBreakUTC)) {
                // console.log("OPTOM BREAK HERE")
                todaysList.list.push({
                    time: optomBreakUTC,
                    bookingType: "optom break",
                    bookingStatus: "OptomBreak",
                    firstName: "",
                    lastName: ""
                })
                busy = true
            }

            // now check bookings
            day.bookings.forEach((booking) => {
                const bookingTime = new Date(parseInt(booking.booking_start)).toISOString()
                const bookingTimeUTC = moment.utc(bookingTime).subtract(10, 'h');

                if (moment(cursorUTC).isSame(bookingTimeUTC)) {
                    // console.log("BOOKING HERE")
                    todaysList.list.push({
                        time: bookingTimeUTC,
                        bookingId: booking._id,
                        bookingType: booking.booking_type,
                        bookingStatus: booking.booking_status,
                        firstName: booking.patient.first_name,
                        lastName: booking.patient.last_name,
                    })
                    busy = true
                }
            })

            if (!busy) {
                // console.log("EMPTY")
                todaysList.list.push({
                    time: moment(cursorUTC),
                    bookingType: "empty",
                    bookingStatus: "Empty",
                    firstName: "",
                    lastName: ""
                })
            }
            cursorUTC = cursorUTC.add(30, 'm')
            // console.log(cursorUTC._d)
        }

        bookingList.push(todaysList);

    })
    console.log(bookingList);

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
    const subNav = [
        {
            key: 'sub1',
            label: 'Show Range',
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
        },
        {
            key: 'sub3',
            label: 'Add New Book',
            children: [
                {
                    key: 'sub3option1',
                    label: (    
                        <div>
                            <DatePicker size={"small"} format={[ "DD MMM", "YYYY-MM-DDTHH:mm:ss"]} defaultValue={moment(startDate, "YYYY-MM-DDT00:00:00+00.00")} onChange={onPanelChange}/>
                            <Button type="primary">Button</Button>
                        </div>
                    )
                }
            ]
        }
    ]

    // return conditional icon
    function ConditionalIcon(props) {
        if(props.type === 'General eye test') {
            return <EyeOutlined style={{fontSize: '20px'}}/>
        } else if (props.type === 'optom break') {
            return <CoffeeOutlined style={{fontSize: '20px'}}/>
        }
    }

    // MODAL

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [okState, setOkState] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
      setOkState(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    // END MODAL

    // date working
    function dateWorker(date) {
        let b = String(date)
        let c = b.split(" ", 5)
        let d = c.join(" ")
        let e = d+" UTC" 
        let f = new Date(e)
        let g = f.toISOString()

        return g
        // let h = g.split(".")[0]
        // let i = h+"+00.00"

        // return i
    }

    return (
        <Content style={{padding: '20px'}}>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <BookingForm bookingDate={bookingDate} bookingStart={bookingStart} bookingEnd={bookingEnd} modalVis={setIsModalVisible}/>
            </Modal>
            <Layout>
                <Sider width={220} className="site-layout-background">
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height: '100%'}} items={subNav} />
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        {loading ? (
                            <h1>loading</h1>
                        ) : (
                            <div style={{display:"flex"}}>
                                {bookingList.map((day) => {
                                    return (
                                        <List
                                            header={<div>{day.date.format('ddd MMM Do, YYYY')}</div>}
                                            bordered
                                            itemLayout="horizontal"
                                            dataSource={day.list}
                                            renderItem={(item) => (
                                            // <List.Item>
                                            //     <div style={{display:"flex"}}> 
                                            //         <ConditionalIcon type={item.bookingType} />
                                                    
                                            //         <div className='booking'>
                                            //             {<h4>{`${item.time.hour()+10}:${item.time.minute()} ${item.firstName} ${item.lastName}`}</h4>}
                                            //             {item.bookingType} 
                                            //         </div>

                                            //         {item.bookingType === 'empty' ? (
                                            //             <a 
                                            //             data-date={new Date(day.date.toISOString())}
                                            //             data-start-time={new Date(item.time.toISOString())}
                                            //             onClick={(event) => {
                                            //                 showModal();
                                            //                 setBookingDate(dateWorker(event.target.getAttribute('data-date')))
                                            //                 setbookingStart(dateWorker(event.target.getAttribute('data-start-time')))
                                            //                 setbookingEnd(dateWorker(event.target.getAttribute('data-start-time')))
                                            //                 console.log("HELLO??")
                                            //                 console.log(dateWorker(event.target.getAttribute('data-date')))
                                            //                 console.log(dateWorker(event.target.getAttribute('data-start-time')))

                                            //             }}>
                                            //                 Book an Appointment
                                            //             </a>
                                            //         ) : (
                                            //             <a></a>
                                            //         )}
                                            //     </div>
                                            // </List.Item>
                                            <List.Item className={item.bookingStatus}>
                                                <Popover
                                                    content={
                                                    <div className={"booking-card"}>
                                                        {item.bookingNote ? (
                                                            <Card className={"booking-note"}>
                                                                {item.bookingNote}
                                                            </Card>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between"
                                                            }}
                                                        >
                                                            {buttonSet[item.bookingStatus].map((btn) => {
                                                                if (btn === "Book New") {
                                                                    return (
                                                                        <Button
                                                                            data-date={new Date(day.date.toISOString())}
                                                                            data-start-time={new Date(item.time.toISOString())}
                                                                            onClick={(event) => {
                                                                                setBookingDate(dateWorker(event.target.parentNode.getAttribute('data-date')))
                                                                                setbookingStart(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                                                                                setbookingEnd(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                                                                                showModal();
                                                                            }}
                                                                        >
                                                                            {btn}   
                                                                        </Button>
                                                                    );
                                                                } else {
                                                                    return <Button >{btn}</Button>;
                                                                    // return (
                                                                    //     <Button
                                                                    //         data-date={new Date(day.date.toISOString())}
                                                                    //         data-start-time={new Date(item.time.toISOString())}
                                                                    //         data-booking-id={item.bookingId}
                                                                    //         data-booking-action={btn.text}
                                                                    //         onClick={btn.clickFn}
                                                                    //     >
                                                                    //         {btn.text}   
                                                                    //     </Button>
                                                                    // );
                                                                }
                                                            })}
                                                        </div>
                                                    </div>
                                                    }
                                                    title={`${item.firstName} ${item.lastName}`}
                                                    placement="right"
                                                >
                                                    <div className={"fill-container"} style={{display:"flex", width: "100%", padding: "0"}}> 
                                                        <ConditionalIcon type={item.bookingType} />
                                                        <div className='booking'>
                                                            {<h4>{`${item.time.hour()+10}:${String(item.time.minute()).padStart(2, '0')} ${item.firstName} ${item.lastName}`}</h4>}
                                                            {item.bookingType} 
                                                        </div>
                                                    </div>
                                                </Popover>
                                            </List.Item>
                                            )}
                                            
                                        />
                                    )
                                })}
                            </div>
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Content>
    )
}

export default Bookings;