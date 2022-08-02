import React, { useState } from 'react';
import { Link, useLocation, useParams, useHref } from 'react-router-dom';

// utils
import auth from '../utils/auth';

// Ant Design
import { Layout, Menu, Image, Button, Modal } from 'antd';
import 'antd/dist/antd.css';

// componenets
import Login from './Login';
import CreateAccount from './CreateAccount';

// Antd Layout components
const { Header } = Layout;

const AppNavbar = (props) => {
    const [page, setPage] = useState(
        window.location.href.substring(
            window.location.href.lastIndexOf('/')+1
        )
    )
    
    // if the current token in local storage is exired log it out
    if (auth.isTokenExpired(auth.getToken())) {
        localStorage.removeItem('id_token');
    }

    //
    const navItem = [
        // {
        //     key: 'dashboard',
        //     label: (            
        //         <Link to="/dashboard">
        //             Dashboard
        //         </Link>
        //     ),
        // },
        {
            key: 'bookings',
            label: (            
                <Link to="/bookings">
                    Bookings
                </Link>
            ),
        },
        {
            key: 'patients',
            label: (            
                <Link to="/patients">
                    Patients
                </Link>
            ),
        },
    ]

    // if (!auth.loggedIn()) {
    //     navItem.push(
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
    //     navItem.push(
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

    // LOGIN MODAL
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
    // LOGIN END MODAL

    // LOGIN MODAL
    const [isCreateAccountModalVisible, setIsCreateAccountModalVisible] = useState(false);

    const showCreateAccountModal = () => {
        setIsCreateAccountModalVisible(true);
    };

    const handleCreateAccountOk = () => {
        setIsCreateAccountModalVisible(false);
    };

    const handleCreateAccountCancel = () => {
        setIsCreateAccountModalVisible(false);
    };
    // LOGIN END MODAL

  return (
    <Header className="header">
        <Modal title="Login" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Login hideModal={setIsModalVisible} setLoggedIn={props.setLoggedIn}/>
        </Modal>
        <Modal title="Create account" visible={isCreateAccountModalVisible} onOk={handleCreateAccountOk} onCancel={handleCreateAccountCancel}>
            <CreateAccount hideModal={setIsCreateAccountModalVisible} setLoggedIn={props.setLoggedIn}/>
        </Modal>
        <div className="logo">
            <img
                width={50}
                src="/optomify_logo.png"
            />
        </div>
        <Menu className="navbar" mode="horizontal" defaultSelectedKeys={[page || 'bookings']} items={props.loggedIn ? navItem : []}/>
        <div className="login-signout">
            {!auth.loggedIn() ? (
                <>
                    <Button type='primary' style={{marginRight: "18px"}} onClick={showCreateAccountModal}>Create account</Button>
                    <Button onClick={showModal}>Login</Button>
                </>
            ) : (
                <Button onClick={auth.logout}> Sign out </Button>
            )}
        </div>
    </Header>
  );
};

export default AppNavbar;
