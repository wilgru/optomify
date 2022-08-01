// React
import React, { useEffect, useState } from 'react';

// Ant Design
import { List, Layout, DatePicker, Menu, Space, Button, Card, Modal } from 'antd';
import {
    EditOutlined
  } from '@ant-design/icons';

// Components
import AddClinicalFile from './AddClinicalFile'
import ViewClinicalFile from './ViewClinicalFile'

// graphQL
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import AddNote from './AddNote';
import ViewNote from './ViewNote';

// Ant Design from components
const { Content, Sider } = Layout;

const PatientNotes = (props) => {
    const parsedPatientNotes = props.patient.notes

    const patientId = props.patient._id

    // selected clinical file
    const [selectedNote, setSelectedNote] = useState({});

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
            <Modal title="View file" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <ViewNote patientId={patientId} selectedNoteData={selectedNote} modalVis={setIsModalVisible}/>
            </Modal>
            <Modal title="Add new clinical file" visible={isAddModalVisible} onOk={handleAddOk} onCancel={handleAddCancel} width={1000}>
                <AddNote patientId={patientId} modalVis={setIsModalVisible}/>
            </Modal>
            <Layout>
                <Content className="site-layout-background" style={{ padding: 0, margin: 0, minHeight: 280 }}>
                    <List
                        header={`Number of records: ${parsedPatientNotes.length}`}
                        bordered
                        itemLayout="horizontal"
                        dataSource={parsedPatientNotes}
                        renderItem={(item) => (
                            <List.Item className={"patient-record-li"}>
                                <div className={"patient-record"} onClick={() => {
                                    setSelectedNote(item)
                                    showModal()
                                }}>
                                    <EditOutlined style={{fontSize: '40px', margin: 'auto 20px'}}/>
                                    <div>
                                        <h3>{`${item.title}`}</h3>
                                        <h4>{Date(item.date_created)} </h4>
                                    </div>
                                </div>
                            </List.Item>
                        )}
                    />
                    <Button style={{  marginTop: 10 }} onClick={showAddModal}>
                        Add new note
                    </Button>
                </Content>
            </Layout>
        </Content>
    )
}

export default PatientNotes;