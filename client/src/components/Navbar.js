import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// import Auth from '../utils/auth';

import auth from '../utils/auth';

// Ant Design
import { Layout, Menu, Image, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import Login from './Login';

// Antd Layout components
const { Header } = Layout;

const AppNavbar = () => {
    
    // if the current token in local storage is exired log it out
    if (auth.isTokenExpired(auth.getToken())) {
        localStorage.removeItem('id_token');
    }
    
    // const items1old = ['1', '2', '3'].map((key) => ({
    //     key,
    //     label: `nav ${key}`,
    // }));

    //
    const items1 = [
        {
            key: 2,
            label: (            
                <Link to="/dashboard">
                    Dashboard
                </Link>
            ),
        },
        {
            key: 3,
            label: (            
                <Link to="/bookings">
                    Bookings
                </Link>
            ),
        },
        {
            key: 4,
            label: (            
                <Link to="/patients">
                    Patients
                </Link>
            ),
        },
    ]

    // if (!auth.loggedIn()) {
    //     items1.push(
    //         {
    //             key:5,
    //             label: (            
    //                 <Link to="/patients">
    //                     Login
    //                 </Link>
    //             ),
    //         }
    //     )
    // } else {
    //     items1.push(
    //         {
    //             key:5,
    //             label: (            
    //                 <Link to="/patients">
    //                     Sign out
    //                 </Link>
    //             ),
    //         }
    //     )
    // }

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
    <Header className="header">
        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Login hideModal={setIsModalVisible}/>
        </Modal>
        <div className="logo">
            <img
                width={50}
                src="./optomify_logo.png"
            />
        </div>
        <Menu className="navbar" mode="horizontal" defaultSelectedKeys={['2']} items={items1}/>
        <div className="login-signout">
            {!auth.loggedIn() ? (
                <Button onClick={showModal}>Login</Button>
            ) : (
                <Button onClick={auth.logout}>Sign out</Button>
            )}
        </div>
    </Header>
  );
};

export default AppNavbar;
