import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Typography, message, Alert } from "antd";
import axios from "axios";
import "../styles/login.css";

const { Title, Text } = Typography;

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null); // ✅ สร้างตัวแปรเก็บข้อความ Error
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setLoading(true);
        setErrorMessage(null); // ✅ ล้างข้อความ Error ก่อนเริ่ม Login

        try {
            const response = await axios.post("http://localhost:3307/api/auth/login", values);
            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("role", user.role);
            localStorage.setItem("userID",user.id);

            message.success(`ยินดีต้อนรับ, ${user.username}!`);
            navigate(user.role === "admin" ? "/" : "/");
        } catch (error) {
            console.error("❌ [FRONTEND LOGIN ERROR]:", error.response?.data);
            message.error(error.response?.data?.message || "เข้าสู่ระบบล้มเหลว กรุณาลองอีกครั้ง");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <Title level={2} className="login-title">เข้าสู่ระบบ</Title>
                <Text type="secondary" className="login-subtitle">
                    ยินดีต้อนรับ กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
                </Text>

                {/* ✅ แสดงข้อความแจ้งเตือนถ้า Login ล้มเหลว */}
                {errorMessage && <Alert message={errorMessage} type="error" showIcon style={{ marginBottom: 10 }} />}

                <Form onFinish={handleLogin} layout="vertical">
                    <Form.Item name="username" label="ชื่อผู้ใช้" rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้" }]}>
                        <Input placeholder="ชื่อผู้ใช้" />
                    </Form.Item>
                    <Form.Item name="password" label="รหัสผ่าน" rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน" }]}>
                        <Input.Password placeholder="รหัสผ่าน" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block className="login-button">
                            เข้าสู่ระบบ
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
