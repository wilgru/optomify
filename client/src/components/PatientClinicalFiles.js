// React
import React, { useEffect, useState } from 'react';

// Ant Design
import { List, Layout, DatePicker, Menu, Space, Button, Card, Modal } from 'antd';

// grpahQL
import { GET_ALL_PATIENTS } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// Ant Design from components
const { Content, Sider } = Layout;

const Patients = (props) => {
    const clinicalFiles = props.patient.clinical_files

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

    // MODAL

    const [isAddModalVisible, setIsAddModalVisible] = useState(false);

    const showAddModal = () => {
        setIsAddModalVisible(true);
    };
    
    const handleAddOk = () => {
        setIsAddModalVisible(false);
    };
    
    const handleAddCancel = () => {
        setIsAddModalVisible(false);
    };

    // END MODAL

    return (
        <Content style={{padding: '20px'}}>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            </Modal>
            <Modal title="Add new clinical file" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
            </Modal>
            <Layout>
                <Content className="site-layout-background" style={{ padding: 0, margin: 0, minHeight: 280 }}>
                    <List
                        header={`Number of records: ${clinicalFiles.length}`}
                        bordered
                        itemLayout="horizontal"
                        dataSource={clinicalFiles}
                        renderItem={(item) => (
                            <List.Item  className={"patient-record-li"}>
                                <div className={"patient-record"} onClick={showModal}>
                                    <div>
                                        <h3>{`${item.first_name} ${item.last_name}`}</h3>
                                        <h4>{item.email} </h4>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                    <Button style={{  marginTop: 10 }} onClick={showAddModal}>
                        Add new Clinical File
                    </Button>
                </Content>
            </Layout>
        </Content>
    )
}

export default Patients;