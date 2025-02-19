import { useEffect, useState } from "react";
import { Table, Button, message, Card, Modal, Form, Input, Select } from "antd";
import { getEquipment, addEquipment, updateEquipment, deleteEquipment } from "../services/api";
import { getRole } from "../services/auth";

function EquipmentManagement() {
    const [equipment, setEquipment] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingEquipment, setEditingEquipment] = useState(null);
    const [form] = Form.useForm();
    const role = getRole();

    useEffect(() => {
        async function fetchData() {
            const equipmentData = await getEquipment();
            setEquipment(equipmentData);
        }
        fetchData();
    }, []);

    async function handleSubmit(values) {
        if (editingEquipment) {
            await updateEquipment(editingEquipment.id, values);
            message.success("Equipment updated successfully!");
        } else {
            await addEquipment(values);
            message.success("Equipment added successfully!");
        }
        setModalVisible(false);
        setEditingEquipment(null);
        form.resetFields();
        setEquipment(await getEquipment());
    }

    async function handleDelete(id) {
        await deleteEquipment(id);
        message.success("Equipment deleted successfully!");
        setEquipment(equipment.filter(item => item.id !== id));
    }

    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Category", dataIndex: "category" },
        { title: "Status", dataIndex: "status" },
        { title: "Location", dataIndex: "location" },
        {
            title: "Actions",
            render: (_, record) => (
                <>
                    <Button type="primary" onClick={() => {
                        setEditingEquipment(record);
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
            <h2>Equipment Management</h2>
            {role === "admin" || role === "staff" ? (
                <Card title="Manage Equipment">
                    <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
                        Add Equipment
                    </Button>
                    <Table columns={columns} dataSource={equipment} rowKey="id" pagination={{ pageSize: 5 }} />
                </Card>
            ) : (
                <Card>
                    <p>You do not have permission to manage equipment.</p>
                </Card>
            )}

            {/* Modal สำหรับเพิ่ม/แก้ไขอุปกรณ์ */}
            <Modal
                title={editingEquipment ? "Edit Equipment" : "Add Equipment"}
                visible={modalVisible}
                onCancel={() => {
                    setModalVisible(false);
                    setEditingEquipment(null);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="available">Available</Select.Option>
                            <Select.Option value="borrowed">Borrowed</Select.Option>
                            <Select.Option value="maintenance">Maintenance</Select.Option>
                            <Select.Option value="damaged">Damaged</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="location" label="Location" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            {editingEquipment ? "Update Equipment" : "Add Equipment"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default EquipmentManagement;
