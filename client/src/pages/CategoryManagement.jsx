import { useEffect, useState } from "react";
import { Table, Button, message, Card, Modal, Form, Input } from "antd";
import { getCategories, addCategory, updateCategory, deleteCategory } from "../services/api";

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const { data } = await getCategories();
            setCategories(Array.isArray(data) ? data : []);
        } catch (error) {
            message.error("Failed to fetch categories", error);
        }
    }

    async function handleSubmit(values) {
        try {
            if (editingCategory) {
                await updateCategory(editingCategory.id, values);
                message.success("อัปเดตหมวดหมู่สำเร็จ!");
            } else {
                await addCategory(values);
                message.success("เพิ่มหมวดหมู่สำเร็จ!");
            }
            setModalVisible(false);
            setEditingCategory(null);
            form.resetFields();
            fetchCategories();
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล", error);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteCategory(id);
            message.success("ลบหมวดหมู่สำเร็จ!");
            fetchCategories();
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการลบข้อมูล", error);
        }
    }

    return (
        <div>
            <h2>Manage Categories</h2>
            <Card title="หมวดหมู่อุปกรณ์">
                <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
                    เพิ่มหมวดหมู่
                </Button>
                <Table
                    columns={[
                        { title: "ชื่อหมวดหมู่", dataIndex: "name" },
                        { title: "รายละเอียด", dataIndex: "description" },
                        {
                            title: "การจัดการ",
                            render: (_, record) => (
                                <>
                                    <Button type="primary" onClick={() => { setEditingCategory(record); form.setFieldsValue(record); setModalVisible(true); }}>
                                        แก้ไข
                                    </Button>
                                    <Button type="danger" onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>
                                        ลบ
                                    </Button>
                                </>
                            ),
                        },
                    ]}
                    dataSource={categories}
                    rowKey="id"
                />
            </Card>

            <Modal title={editingCategory ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่"} visible={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="name" label="ชื่อหมวดหมู่" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="รายละเอียด">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">บันทึก</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default CategoryManagement;
