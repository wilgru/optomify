import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

// utils
import auth from '../utils/auth';

// GraphQL
import { GET_PATIENT } from '../graphql/queries';

// componenets
import PatientOverview from '../components/PatientOverview'
import PatientClinicalFiles from '../components/PatientClinicalFiles'

// antd
import { Layout, Menu } from 'antd';
import PatientNotes from '../components/PatientNotes';
const { Content, Sider } = Layout;

const Patient = (props) => {

  // check if loggedin first
  if (!auth.loggedIn()) {
    auth.logout()
    props.setLoggedIn(false)
  }

  let { id } = useParams();
  const [chosenContent, setChosenContent] = useState('overview');

  const { loading, data } = useQuery(GET_PATIENT, {
    variables: { id },
    fetchPolicy: "no-cache"
  });
  const patient = data?.getPatient || [];

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
  ]

  function PatientContent(props) {
    switch (props.choice) {
      case "overview":
        return <PatientOverview patient={patient}/>
      case "clinical_files":
        return <PatientClinicalFiles patient={patient}/>
      case "notes":
        return <PatientNotes patient={patient}/>
      default:
        break;
    }
  }

  return (
    <Content style={{padding: '20px'}}>
      <h1>{patient.first_name + ' ' + patient.last_name}</h1>
      <Layout>
        <Sider width={220} className="site-layout-background">
          <Menu 
            mode="inline" 
            defaultSelectedKeys={['overview']} 
            defaultOpenKeys={['overview']} 
            style={{height: '100%'}} 
            items={subNav} 
            onClick={
              (item, key, keyPath)=>{
                setChosenContent(item.key);
              }
            }
          />
        </Sider>
        <Layout style={{padding: '0 24px 24px'}}>
          <Content className="site-layout-background" style={{ padding: 20, margin: 0, minHeight: 280 }}>
            {loading ? (
              <></>
            ) : (
              <PatientContent choice={chosenContent} />
            )}
              
          </Content>
        </Layout>
      </Layout>
    </Content>
  );
};

export default Patient;
