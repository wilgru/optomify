// React
import React from 'react';

// Ant Design
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';

// utils
import auth from '../utils/auth';

// Ant Design from layout component
const { Content, Sider } = Layout;

const Dashboard = () => {
    // 
    const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
        const key = String(index + 1);
        return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
            key: subKey,
            label: `option${subKey}`,
            };
        }),
        };
    });

    return (
        <Content style={{padding: '20px'}}>
            <Layout>
                <Sider width={220} className="site-layout-background">
                    <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{height: '100%'}} items={items2} />
                </Sider>
                <Layout style={{padding: '0 24px 24px'}}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="site-layout-background" style={{ padding: 24, margin: 0, minHeight: 280 }}>
                        Content
                    </Content>
                </Layout>
            </Layout>
        </Content>
    )
}

export default Dashboard;