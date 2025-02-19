import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Card, message } from 'antd';
import { login } from '../services/auth';

function Login() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleLogin(values) {
        setLoading(true);
        setTimeout(() => {
            login(values.role);
            message.success("Login successful!");
            navigate("/");
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="login-container">
            <Card title="Login" style={{ width: 300, margin: "auto", marginTop: "50px" }}>
                <Form onFinish={handleLogin} layout="vertical">
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter your username' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="staff">Staff</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>Login</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}

export default Login;
