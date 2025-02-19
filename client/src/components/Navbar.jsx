import { Layout, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BellOutlined, LogoutOutlined } from '@ant-design/icons';
import { logout } from '../services/auth';
import PropTypes from 'prop-types';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

function Navbar({ collapsed, setCollapsed }) {
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ color: 'white', margin: 0,  }}>ระบบยืม - คืนอุปกรณ์</h2>
                <Button
                    type="text"
                    icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        color: 'white',
                    }}
                />
            </div>
            <div style={{ display: 'flex', gap: '15px',  alignItems: 'center', padding: '10px' }}>
                <Link to="/notifications">
                    <BellOutlined style={{ fontSize: '24px', color: 'white' }} />
                </Link>
                <Button type="primary" danger onClick={handleLogout} icon={<LogoutOutlined />}>
                    Logout
                </Button>
            </div>
        </Header>
    );
}

Navbar.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
};

export default Navbar;
