import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import Auth from '../utils/auth';

// Ant Design
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

// Antd Layout components
const { Header, Content, Footer, Sider } = Layout;

// 
const items1old = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items1 = [
    {
        key: 1,
        label: (            
            <Link to="/dashboard">
                Dashboard
            </Link>
        ),
    },
    {
        key: 2,
        label: (            
            <Link to="/bookings">
                Bookings
            </Link>
        ),
    },
    {
        key: 3,
        label: (            
            <Link to="/patients">
                Patients
            </Link>
        ),
    },
]

const AppNavbar = () => {
  return (
    <Header className="header">
        <div className="logo" />
        <Menu mode="horizontal" defaultSelectedKeys={['2']} items={items1}/>
    </Header>
  );
};

export default AppNavbar;
