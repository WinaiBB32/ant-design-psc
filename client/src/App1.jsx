
import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  AntDesignOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Avatar, Space } from 'antd';

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // ตัวอย่าง role ของผู้ใช้
  const user=  { 
    name: 'ผู้ใช้งาน',
    role: 'admin'

  }
  
  const menuItems = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: 'หน้าแรก',
    },
    {
      key: '2',
      icon: <VideoCameraOutlined />,
      label: 'nav 2',
    },
    {
      key: '3',
      icon: <UploadOutlined />,
      label: 'nav 3',
    },
  ];

  if (user.role === 'admin') {
    menuItems.push({
      key: '4',
      icon: <AntDesignOutlined />,
      label: 'Admin',
    });
  }

  return (
    <>
      <Layout style={{ height: '100vh', width: '100vw' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" style={{ marginTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
              <Space wrap size={16}>
                <Avatar size={64} icon={<UserOutlined />} />
              </Space>
              <h2 style={{ color: 'white', fontSize: '16px' }}>{user.name}</h2>
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
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default App
