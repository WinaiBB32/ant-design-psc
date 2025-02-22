import {  UserOutlined, VideoCameraOutlined, AntDesignOutlined, HomeOutlined } from '@ant-design/icons';
import { Layout, Menu, Avatar, Space } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getRole } from '../services/auth';

const { Sider } = Layout;

function Sidebar({ collapsed }) {
    const role = getRole();

    const menuItems = [
        {
            key: '1',
            icon: <HomeOutlined />,
            label: <Link to="/">Dashboard</Link>,
        },
        {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: <Link to="/borrow">ยืมอุปกรณ์</Link>,
        },
        
    ];
    if (role === 'admin' || role === 'staff') {
        menuItems.push(
            {
            key: '6',
            icon: <AntDesignOutlined />,
            label: <Link to="/loans">อนุมัติยืม</Link>,
        },
            {
            key: '7',
            icon: <AntDesignOutlined />,
            label: <Link to="/returns">จัดการอุปกรณ์ที่ถูกคืน</Link>,
        },
            {
            key: '8',
            icon: <AntDesignOutlined />,
            label: <Link to="/Category">จัดการหมวดหมู่</Link>,
        },
            {
            key: '9',
            icon: <AntDesignOutlined />,
            label: <Link to="/Equipment">จัดการอุปกรณ์อุปกรณ์</Link>,
        },
    );
    }

    if (role === 'admin') {
        menuItems.push(
            {
            key: '10',
            icon: <AntDesignOutlined />,
            label: <Link to="/users">จัดการบัญชีผู้ใช้</Link>,
        },
    );
    }

    return (
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: '100vh' }}>
            <div className="demo-logo-vertical" style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00152ab3' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                    <Space wrap size={16}>
                        <Avatar size={64} icon={<UserOutlined />} />
                    </Space>
                    <h2 style={{ color: 'white', fontSize: '16px' }}>{role}</h2>
                </div>
            </div>
            <Menu
                style={{ marginTop: '20px' }}
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={menuItems}
            />
        </Sider>
    );
}

Sidebar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
};

export default Sidebar;