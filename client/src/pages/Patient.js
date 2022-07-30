import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';

// utils
import { loggedin } from '../utils/auth';

// GraphQL
import { GET_PATIENT } from '../graphql/queries';

// componenets
import PatientOverview from '../components/PatientOverview'
import PatientClinicalFiles from '../components/PatientClinicalFiles'

// antd
import { List, Layout, DatePicker, Menu, Space, Button, Card, Modal } from 'antd';
import moment from 'moment';
const { Content, Sider } = Layout;

const Patient = () => {
  let { id } = useParams();
  const [chosenContent, setChosenContent] = useState('overview');

  const { loading, data } = useQuery(GET_PATIENT, {
    variables: { id },
    fetchPolicy: "no-cache"
  });

  const patient = data?.getPatient || [];
  console.log(patient)

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
          key: 'overview',
          label: 'Overview',
      },
      {
          key: 'clinical_files',
          label: 'Clinical Files',
      },
      {
          key: 'notes',
          label: 'Notes',
      },
      {
          key: 'bookings',
          label: 'Bookings',
      }
  ]

  function PatientContent(props) {
    console.log(props.choice)
    switch (props.choice) {
      case "overview":
        return <PatientOverview patient={patient}/>
        break;
      case "clinical_files":
        return <PatientClinicalFiles patient={patient}/>
        break;
    
      default:
        break;
    }
  }

  return (
    <Content style={{padding: '20px'}}>
        <Layout>
            <Sider width={220} className="site-layout-background">
                <Menu mode="inline" defaultSelectedKeys={['overview']} defaultOpenKeys={['overview']} style={{height: '100%'}} items={subNav} onClick={(item, key, keyPath)=>{console.log(item.key); setChosenContent(item.key)}}/>
            </Sider>
            <Layout style={{padding: '0 24px 24px'}}>
                <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                  {loading ? (
                    <></>
                  ) : (
                    // <PatientOverview patient={patient}/>
                    <PatientContent choice={chosenContent} />
                  )}
                    
                </Content>
            </Layout>
        </Layout>
    </Content>
  );
};

export default Patient;
