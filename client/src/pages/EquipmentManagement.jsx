import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Upload, Select, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getAllEquipment, getCategories, addEquipment, updateEquipment, deleteEquipment } from "../services/api";

function EquipmentManagement() {
    const [equipment, setEquipment] = useState([]);
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchEquipment();
        fetchCategories();
    }, []);

    async function fetchEquipment() {
        try {
            const { data } = await getAllEquipment();
            setEquipment(data);
        } catch (error) {
            message.error("ไม่สามารถดึงข้อมูลอุปกรณ์ได้",error);
        }
    }

    async function fetchCategories() {
        try {
            const { data } = await getCategories();
            setCategories(data);
        } catch (error) {
            message.error("ไม่สามารถดึงข้อมูลหมวดหมู่ได้",error);
        }
    }

    async function handleSubmit(values) {
        console.log("📌 Debug Submit Values:", values); // ✅ ตรวจสอบค่าก่อนส่ง
        
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("category", values.category);
        formData.append("location", values.location);
        formData.append("quantity", values.quantity);
        if (values.image && values.image.file) {
            formData.append("image", values.image.file);
        }

        try {
            if (editMode) {
                await updateEquipment(selectedEquipment.id, formData);
                message.success("อัปเดตอุปกรณ์สำเร็จ");
            } else {
                await addEquipment(formData);
                message.success("เพิ่มอุปกรณ์สำเร็จ");
            }
            setOpen(false);
            fetchEquipment();
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล",error);
        }
    }

    async function handleDelete(id) {
        try {
            await deleteEquipment(id);
            message.success("ลบอุปกรณ์สำเร็จ");
            fetchEquipment();
        } catch (error) {
            message.error("เกิดข้อผิดพลาดในการลบอุปกรณ์",error);
        }
    }

    function handleEdit(record) {
        setEditMode(true);
        setSelectedEquipment(record);
        form.setFieldsValue(record);
        setOpen(true);
    }

    return (
        <div style={{ padding: "20px" }}>
            <h2>📦 จัดการอุปกรณ์</h2>
            <Button type="primary" onClick={() => {
                setEditMode(false);
                form.resetFields();
                setOpen(true);
            }}>➕ เพิ่มอุปกรณ์</Button>

            <Card title="📋 รายการอุปกรณ์ทั้งหมด" style={{ marginTop: "20px" }}>
                <Table
                    columns={[
                        { title: "📌 ชื่ออุปกรณ์", dataIndex: "name" },
                        { title: "📂 หมวดหมู่", dataIndex: "category" },
                        { title: "📍 ที่เก็บ", dataIndex: "location" },
                        { title: "📦 จำนวน", dataIndex: "quantity" },
                        {
                            title: "🖼 รูปภาพ",
                            dataIndex: "image",
                            render: (image) =>
                                image ? <img src={`http://localhost:3307${image}`} alt="Equipment" style={{ width: 50 }} /> : "ไม่มีรูป",
                        },
                        {
                            title: "⚙️ การจัดการ",
                            render: (_, record) => (
                                <>
                                    <Button type="link" onClick={() => handleEdit(record)}>✏️ แก้ไข</Button>
                                    <Button type="link" danger onClick={() => handleDelete(record.id)}>🗑 ลบ</Button>
                                </>
                            ),
                        },
                    ]}
                    dataSource={equipment}
                    rowKey="id"
                />
            </Card>

            <Modal title={editMode ? "✏️ แก้ไขอุปกรณ์" : "➕ เพิ่มอุปกรณ์"} open={open} onCancel={() => setOpen(false)} onOk={() => form.submit()}>
                <Form form={form} onFinish={handleSubmit} layout="vertical">
                    <Form.Item name="name" label="📌 ชื่ออุปกรณ์" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="category" label="📂 หมวดหมู่" rules={[{ required: true }]}>
                        <Select options={categories.map(c => ({ value: c.name, label: c.name }))} />
                    </Form.Item>
                    <Form.Item name="location" label="📍 ที่เก็บ" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="quantity" label="📦 จำนวน" rules={[{ required: true }]}>
                        <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item name="image" label="🖼 อัปโหลดรูปภาพ">
                        <Upload beforeUpload={() => false} listType="picture">
                            <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default EquipmentManagement;
