// React
import React, { useEffect, useState } from 'react';

// Ant Design
import { List, Layout, DatePicker, Menu, Button, Card, Modal, Popover } from 'antd';
import {
    EyeOutlined,
    CoffeeOutlined,
    CarOutlined,
    SyncOutlined,
    ExclamationCircleOutlined,
    SmallDashOutlined,
    ClockCircleOutlined
  } from '@ant-design/icons';

import moment from 'moment';

// Components
import BookingForm from '../components/BookingForm';
import BookExistingForm from '../components/BookExistingForm';

// grpahQL
import { GET_BOOK_SETUPS } from '../graphql/queries';
import { UPDATE_BOOKING, DELETE_BOOKING } from '../graphql/mutations';
import { useMutation, useQuery } from '@apollo/client';

// Utils
import { getWeek } from '../utils/date';

// Ant Design from components
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

const Bookings = () => {
    //start date and end date for bookings to show
    const [startDate, setStartDate] = useState(getWeek().firstDay);
    const [endDate, setEndDate] = useState(getWeek().lastDay);

    // for booking modal
    const [bookingDate, setBookingDate] = useState('')
    const [bookingStart, setbookingStart] = useState('')
    const [bookingEnd, setbookingEnd] = useState('')

    const [updateBooking, { updateError }] = useMutation(UPDATE_BOOKING);
    const [deleteBooking, { deletError }] = useMutation(DELETE_BOOKING);

    // get booksetup and bookings
    const { loading, data, err} = useQuery(GET_BOOK_SETUPS, {
        variables: {
            startDate,
            endDate
        },
        fetchPolicy: "no-cache"
    });
    const bookSetupData = data?.getBookSetups || [];
    const bookingList = []

    // update bookinng function
    const updateBookingFn = (event, action) => {
        console.log(startDate, endDate)
        updateBooking({
            variables: {
                bookingToUpdateId: event.target.parentNode.getAttribute('data-booking-id'),
                updateAction: action,
                startDate,
                endDate
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        })
    }

    // delete bookinng function
    const deleteBookingFn = (event) => {
        console.log(startDate, endDate)
        deleteBooking({
            variables: {
                bookingToDeleteId: event.target.parentNode.getAttribute('data-booking-id'),
                startDate,
                endDate
            },
            refetchQueries: [
                {query: GET_BOOK_SETUPS},
                GET_BOOK_SETUPS
            ]
        })
    }

    // buttons for popover
    const buttonSet = {
        empty: [
            {text: "Book New", clickFn: function(event){
                setBookingDate(dateWorker(event.target.parentNode.getAttribute('data-date')))
                setbookingStart(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                setbookingEnd(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                showModalNewPatient();
            }}, 
            {text: "Book Existing", clickFn: function(event){
                setBookingDate(dateWorker(event.target.parentNode.getAttribute('data-date')))
                setbookingStart(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                setbookingEnd(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                showModalExistingPatient();
            }}, 
            {text: "Block", clickFn: function(event){
            }}
        ],
        booked: [
            {text: "Confirm", clickFn: function(event){
                updateBookingFn(event, "confirmed")
            }}, 
            {text: "Arrive", clickFn: function(event){
                updateBookingFn(event, "arrived")
            }}, 
            {text: "Cancel", clickFn: function(event){
                deleteBookingFn(event)
            }}
        ],
        confirmed: [
            {text: "Arrive", clickFn: function(event){
                updateBookingFn(event, "arrived")
            }}, 
            {text: "Cancel", clickFn: function(event){
                deleteBookingFn(event)
            }}
        ],
        arrived: [
            {text: "Cancel", clickFn: function(event){
                deleteBookingFn(event)
            }}
        ],
        blocked: [
            {text: "Cancel", clickFn: function(event){
                deleteBookingFn(event)
            }}
        ],
        optomBreak: [],
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

            let titleTime = `${cursorUTC.hour()+10}:${String(cursorUTC.minute()).padStart(2, '0')}`
            let slotTaken = false

            // first check for optom break
            if (moment(cursorUTC).isSame(optomBreakUTC)) {
                // console.log("OPTOM BREAK HERE")
                todaysList.list.push({
                    time: optomBreakUTC,
                    titleTime: titleTime,
                    titleText: "Optometrist break",
                    subTitle: "",
                    bookingType: "optom break",
                    bookingStatus: "blocked",
                    firstName: "",
                    lastName: ""
                })
                slotTaken = true
            }

            // now check bookings
            day.bookings.forEach((booking) => {
                const bookingTime = new Date(parseInt(booking.booking_start)).toISOString()
                const bookingTimeUTC = moment.utc(bookingTime).subtract(10, 'h');

                if (moment(cursorUTC).isSame(bookingTimeUTC)) {
                    // console.log("BOOKING HERE")
                    todaysList.list.push({
                        time: bookingTimeUTC,
                        titleTime: titleTime,
                        titleText:`${booking.patient.first_name} ${booking.patient.last_name}` ,
                        subTitle: booking.booking_type,
                        bookingId: booking._id,
                        bookingType: booking.booking_type,
                        bookingStatus: booking.booking_status,
                        firstName: booking.patient.first_name,
                        lastName: booking.patient.last_name,
                    })
                    slotTaken = true
                }
            })

            if (!slotTaken) {
                // console.log("EMPTY")
                todaysList.list.push({
                    time: moment(cursorUTC),
                    titleTime: titleTime,
                    titleText: "Available slot",
                    subTitle: "",
                    bookingType: "empty",
                    bookingStatus: "empty",
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
        if(props.type === 'General eye test' || props.type === 'general eye test') {
            return <EyeOutlined style={{fontSize: '40px'}}/>
        } else if (props.type === 'health concern') {
            return <ExclamationCircleOutlined style={{fontSize: '40px'}}/>
        } else if (props.type === 'rms form') {
            return <CarOutlined style={{fontSize: '40px'}}/>
        } else if (props.type === 're-check') {
            return <SyncOutlined style={{fontSize: '40px'}}/>
        } else if (props.type === 'other') {
            return <SmallDashOutlined style={{fontSize: '40px'}}/>
        } else if (props.type === 'optom break') {
            return <CoffeeOutlined style={{fontSize: '40px'}}/>
        } else {
            return <ClockCircleOutlined style={{fontSize: '40px'}}/>
        }
    }

    // MODAL - NEW PATIENT
    const [isModalVisibleNewPatient, setIsModalVisibleNewPatient] = useState(false);

    const showModalNewPatient = () => {
      setIsModalVisibleNewPatient(true);
    };
  
    const handleOkNewPatient = () => {
      setIsModalVisibleNewPatient(false);
    };
  
    const handleCancelNewPatient = () => {
      setIsModalVisibleNewPatient(false);
    };
    // END MODAL - NEW PATIENT

    // MODAL - EXISTING PATIENT
    const [isModalVisibleExistingPatient, setIsModalVisibleExistingPatient] = useState(false);

    const showModalExistingPatient = () => {
      setIsModalVisibleExistingPatient(true);
    };
  
    const handleOkExistingPatient = () => {
      setIsModalVisibleExistingPatient(false);
    };
  
    const handleCancelExistingPatient = () => {
      setIsModalVisibleExistingPatient(false);
    };
    // END MODAL - EXISTING PATIENT

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
            <Modal title="Book new patient" visible={isModalVisibleNewPatient} onOk={handleOkNewPatient} onCancel={handleCancelNewPatient}>
                <BookingForm bookingDate={bookingDate} bookingStart={bookingStart} bookingEnd={bookingEnd} modalVis={setIsModalVisibleNewPatient}/>
            </Modal>
            <Modal title="Book existing patient" visible={isModalVisibleExistingPatient} onOk={handleOkExistingPatient} onCancel={handleCancelExistingPatient}>
                <BookExistingForm bookingDate={bookingDate} bookingStart={bookingStart} bookingEnd={bookingEnd} modalVis={setIsModalVisibleExistingPatient}/>
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
                                            //                 showModalNewPatient();
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
                                                                // if (btn === "Book New") {
                                                                //     return (
                                                                //         <Button
                                                                //             data-date={new Date(day.date.toISOString())}
                                                                //             data-start-time={new Date(item.time.toISOString())}
                                                                //             onClick={(event) => {
                                                                //                 setBookingDate(dateWorker(event.target.parentNode.getAttribute('data-date')))
                                                                //                 setbookingStart(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                                                                //                 setbookingEnd(dateWorker(event.target.parentNode.getAttribute('data-start-time')))
                                                                //                 showModalNewPatient();
                                                                //             }}
                                                                //         >
                                                                //             {btn}   
                                                                //         </Button>
                                                                //     );
                                                                // } else {
                                                                //     return <Button >{btn}</Button>;
                                                                // }

                                                                return (
                                                                    <Button
                                                                        data-date={new Date(day.date.toISOString())}
                                                                        data-start-time={new Date(item.time.toISOString())}
                                                                        data-booking-id={item.bookingId}
                                                                        data-booking-action={btn.text}
                                                                        onClick={btn.clickFn}
                                                                    >
                                                                        {btn.text}   
                                                                    </Button>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    }
                                                    title={`${item.titleTime} - ${item.titleText}`}
                                                    placement="right"
                                                >
                                                    <div className={"fill-container"} style={{display:"flex", width: "100%", padding: "0"}}> 
                                                        <ConditionalIcon type={item.bookingType} />
                                                        <div className='booking'>
                                                            {<h4>{`${item.titleTime} - ${item.titleText}`}</h4>}
                                                            {item.subTitle} 
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