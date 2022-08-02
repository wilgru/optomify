// React
import React, { useState } from 'react';

// Ant Design
import { List, Layout, Input } from 'antd';
import moment from 'moment';

// utils
import auth from '../utils/auth';

// graphQL
import { GET_ALL_PATIENTS } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// Ant Design from components
const { Content } = Layout;
const { Search } = Input

const Patients = (props) => {

    // check if loggedin first
    if (!auth.loggedIn()) {
        auth.logout()
        props.setLoggedIn(false)
    }

    const [searchTerm, setSearchTerm] = useState("")

    const { loading, data } = useQuery(GET_ALL_PATIENTS, {
        variables: {
            searchTerm
        },
        fetchPolicy: "no-cache"
    }) 
    const patientData = data?.getAllPatients || [];

    // search field
    const onSearch = (value) => {
        setSearchTerm(value)
    }

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

    return (
        <Content style={{padding: '20px'}}>
            {/* <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <BookingForm bookingDate={bookingDate} bookingStart={bookingStart} bookingEnd={bookingEnd} />
            </Modal> */}
            <Layout>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        <Search
                            placeholder="Search for name, email or mobile number..."
                            allowClear
                            onSearch={onSearch}
                            style={{
                                marginBottom: 10,
                            }}
                        />
                        {loading ? (
                            <h1>loading</h1>
                        ) : (
                            <List
                                header={`Number of records: ${patientData.length}`}
                                bordered
                                itemLayout="horizontal"
                                dataSource={patientData}
                                renderItem={(item) => (
                                    <List.Item  className={"patient-record-li"}>
                                        <Link to={{ pathname: `/patients/${item._id}` }} className={"patient-record"} onClick={()=> console.log(item.first_name)}>
                                            <div>
                                                <h3>{`${item.first_name} ${item.last_name}`}</h3>
                                                <h4>{item.email} </h4>
                                            </div>
                                        </Link>
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