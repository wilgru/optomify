// React
import React from 'react';

// Ant Design
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, DatePicker, Space } from 'antd';
import 'antd/dist/antd.css';

// Ant Design from components
const { Content, Sider } = Layout;
const { RangePicker } = DatePicker;

// 
const items2old = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
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

// 
const items2 = {

}

const Bookings = () => {
    const onPanelChange = (value, mode) => {
        console.log(value.format('YYYY-MM-DD'), mode);
    };

    return (
        <Content style={{padding: '20px'}}>
            <Layout>
                <Sider width={200} className="site-layout-background" style={{padding: '20px'}}>
                    <h1>Date Range</h1>
                    <RangePicker size={"small"} format={[ "DD MMMM", "YYYY-MM-DDTHH:mm:ss"]}/>
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

export default Bookings;