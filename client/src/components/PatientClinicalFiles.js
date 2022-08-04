// React
import React, { useState } from 'react';

// Ant Design
import { List, Layout, Button, Modal } from 'antd';
import {
    ReconciliationOutlined,
    HeartOutlined,
    FileTextOutlined,
  } from '@ant-design/icons';

// Components
import AddClinicalFile from './AddClinicalFile'
import ViewClinicalFile from './ViewClinicalFile'

// Ant Design from components
const { Content } = Layout;

const Patients = (props) => {
    const clinicalFiles = props.patient.clinical_files

    const patientId = props.patient._id

    // selected clinical file
    const [selectedClinicalFile, setSelectedClinicalFile] = useState({});

    // return conditional icon
    function ConditionalIcon(props) {
        if(props.type === 'prescription') {
            return <ReconciliationOutlined style={{fontSize: '40px', margin: 'auto 20px'}}/>
        } else if (props.type === 'health check') {
            return <HeartOutlined style={{fontSize: '40px', margin: 'auto 20px'}}/>
        } else {
            return <FileTextOutlined style={{fontSize: '40px', margin: 'auto 20px'}}/>
        }
    }

    // ADD MODAL
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
    // END VIEW MODAL

    // ADD MODAL
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
    // END ADD MODAL

    return (
        <Content>
            <Modal title="View file" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000} footer={null}>
                <ViewClinicalFile patientId={patientId} selectedClinicalFileData={selectedClinicalFile} modalVis={setIsModalVisible}/>
            </Modal>
            <Modal title="Add new clinical file" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel} width={1000} footer={null}>
                <AddClinicalFile patientId={patientId} modalVis={setIsModalVisible}/>
            </Modal>
            <Layout>
                <Content className="site-layout-background" style={{ padding: 0, margin: 0, minHeight: 280 }}>
                    <List
                        header={`Number of records: ${clinicalFiles.length}`}
                        bordered
                        itemLayout="horizontal"
                        dataSource={clinicalFiles}
                        renderItem={(item) => (
                            <List.Item className={"patient-file-record-li"}>
                                <div className={"patient-record"} 
                                onClick={() => {
                                    setSelectedClinicalFile(item)
                                    showModal()
                                }}>
                                    <ConditionalIcon type={item.file_type}/>
                                    <div>
                                        <h3>{`${item.title}`}</h3>
                                        <h4>{new Date(parseInt(item.date_created)).toDateString()} </h4>
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