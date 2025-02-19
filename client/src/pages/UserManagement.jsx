import { useEffect, useState } from "react";
import { Table, Button, message, Card, Modal, Form, Input, Select } from "antd";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";
import { getRole } from "../services/auth";

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [form] = Form.useForm();
    const role = getRole();

    useEffect(() => {
        async function fetchData() {
            const usersData = await getUsers();
            setUsers(usersData);
        }
        fetchData();
    }, []);

    async function handleSubmit(values) {
        if (editingUser) {
            await updateUser(editingUser.id, values);
            message.success("User updated successfully!");
        } else {
            await addUser(values);
            message.success("User added successfully!");
        }
        setModalVisible(false);
        setEditingUser(null);
        form.resetFields();
        setUsers(await getUsers());
    }

    async function handleDelete(id) {
        await deleteUser(id);
        message.success("User deleted successfully!");
        setUsers(users.filter(user => user.id !== id));
    }

    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Email", dataIndex: "email" },
        { title: "Role", dataIndex: "role" },
        {
            title: "Actions",
            render: (_, record) => (
                <>
                    <Button type="primary" onClick={() => {
                        setEditingUser(record);
                        form.setFieldsValue(record);
                        setModalVisible(true);
                    }} style={{ marginRight: 8 }}>
                        Edit
                    </Button>
                    <Button type="danger" onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>User Management</h2>
            {role === "admin" ? (
                <Card title="Manage Users">
                    <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
                        Add User
                    </Button>
                    <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 5 }} />
                </Card>
            ) : (
                <Card>
                    <p>You do not have permission to manage users.</p>
                </Card>
            )}

            {/* Modal สำหรับเพิ่ม/แก้ไขผู้ใช้ */}
            <Modal
                title={editingUser ? "Edit User" : "Add User"}
                visible={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setEditingUser(null);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="admin">Admin</Select.Option>
                            <Select.Option value="staff">Staff</Select.Option>
                            <Select.Option value="user">User</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {editingUser ? "Update User" : "Add User"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default UserManagement;
