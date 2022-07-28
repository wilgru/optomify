// React
import React, { useEffect, useState } from 'react';

// Ant Design
import { List, Layout, DatePicker, Menu, Space, Button, Card, Modal } from 'antd';
import BookingForm from '../components/BookingForm';
import {
    HomeOutlined,
    LoadingOutlined,
    SettingFilled,
    SmileOutlined,
    SyncOutlined,
    EyeOutlined,
  } from '@ant-design/icons';

import moment from 'moment';

// grpahQL
import { GET_ALL_PATIENTS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

// Ant Design from components
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

const Patients = () => {
    const { loading, data } = useQuery(GET_ALL_PATIENTS, {fetchPolicy: "no-cache"}) 
    const patientData = data?.getAllPatients || [];

    // MODAL

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
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

        return f.toISOString()
    }

    return (
        <Content style={{padding: '20px'}}>
            {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <BookingForm bookingDate={bookingDate} bookingStart={bookingStart} bookingEnd={bookingEnd} />
            </Modal> */}
            <Layout>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        {loading ? (
                            <h1>loading</h1>
                        ) : (
                            <List
                                header={`Number of records: ${patientData.length}`}
                                bordered
                                itemLayout="horizontal"
                                dataSource={patientData}
                                renderItem={(item) => (
                                <List.Item>
                                    <div style={{display:"flex"}}> 
                                        <div className='booking'>
                                            {<h4>{`${item.first_name} ${item.last_name}`}</h4>}
                                            {item.email} 
                                        </div>
                                    </div>
                                </List.Item>
                                )}
                            />
                        )}
                    </Content>
                </Layout>
            </Layout>
        </Content>
    )
}

export default Patients;