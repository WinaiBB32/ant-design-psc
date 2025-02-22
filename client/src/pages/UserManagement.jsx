import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { getUsers, addUser } from "../services/api";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const { data } = await getUsers();
            setUsers(data);
        } catch (error) {
            message.error("ไม่สามารถดึงข้อมูลผู้ใช้ได้",error);
        }
    }

    async function handleAddUser(values) {
        try {
            await addUser(values);
            message.success("เพิ่มผู้ใช้สำเร็จ");
            setOpen(false);
            fetchUsers();
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้",error);
        }
    }

    return (
        <div>
            <h2>จัดการผู้ใช้</h2>
            <Button type="primary" onClick={() => setOpen(true)}>เพิ่มผู้ใช้</Button>

            <Table
                columns={[
                    { title: "ชื่อผู้ใช้", dataIndex: "username" },
                    { title: "อีเมล", dataIndex: "email" },
                    { title: "สิทธิ์", dataIndex: "role" },
                ]}
                dataSource={users}
                rowKey="id"
            />

            {/* ✅ ใช้ open แทน visible */}
            <Modal
                title="เพิ่มผู้ใช้"
                open={open}
                onCancel={() => setOpen(false)}
                onOk={() => form.submit()}
            >
                <Form form={form} onFinish={handleAddUser} layout="vertical">
                    <Form.Item name="username" label="ชื่อผู้ใช้" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="อีเมล" rules={[{ required: true, type: "email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="password" label="รหัสผ่าน" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="role" label="สิทธิ์" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default UserManagement;
