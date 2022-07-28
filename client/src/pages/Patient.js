import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
// import {  } from '../utils/mutations';
import { GET_PATIENT } from '../graphql/queries';

// antd
import { List, Layout, DatePicker, Menu, Space, Button, Card, Modal } from 'antd';
const { Content, Sider } = Layout;

const Patient = () => {
  let { id } = useParams();

  const { loading, data } = useQuery(GET_PATIENT, {
    variables: { _id: id },
  });

  const patient = data?.getPatient || [];

//   const [createPatient, { error }] = useMutation(CREATE_VOTE);

  const handleCreateNewNote = async (techNum) => {
    // try {
    //   await createNewNote({
    //     variables: { _id: id, techNum: techNum },
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleCreateClinicalFile = async (techNum) => {
    // try {
    //   await createPatient({
    //     variables: { _id: id, techNum: techNum },
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

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

    // sub nav options
    const subNav = [
        {
            key: 'sub1',
            label: 'Overview',
        },
        {
            key: 'sub2',
            label: 'Clinical Files',
        },
        {
            key: 'sub3',
            label: 'Notes',
        },
        {
            key: 'sub4',
            label: 'Bookings',
        }
    ]

  return (
    <Content style={{padding: '20px'}}>
        <Layout>
            <Sider width={220} className="site-layout-background">
                <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height: '100%'}} items={subNav} />
            </Sider>
            <Layout style={{padding: '0 24px 24px'}}>
                <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                    Content
                </Content>
            </Layout>
        </Layout>
    </Content>
  );
};

export default Patient;
