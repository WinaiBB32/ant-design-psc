import { useEffect, useState } from "react";
import { Table, Button, message, Card, Modal, Form, Input, Select, DatePicker } from "antd";
import { getMaintenanceLogs, addMaintenanceLog, getEquipmentList } from "../services/api";
import { getRole } from "../services/auth";

function MaintenanceLogs() {
    const [logs, setLogs] = useState([]);
    const [equipmentList, setEquipmentList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const role = getRole();

    useEffect(() => {
        async function fetchData() {
            const logsData = await getMaintenanceLogs();
            setLogs(logsData);
            const equipmentData = await getEquipmentList();
            setEquipmentList(equipmentData);
        }
        fetchData();
    }, []);

    async function handleAddMaintenance(values) {
        await addMaintenanceLog(values);
        message.success("Maintenance record added!");
        setModalVisible(false);
        setLogs([...logs, values]);
        form.resetFields();
    }

    const columns = [
        { title: "Equipment Name", dataIndex: "equipment_name" },
        { title: "Date", dataIndex: "maintenance_date" },
        { title: "Type", dataIndex: "type" },
        { title: "Description", dataIndex: "description" },
        { title: "Cost", dataIndex: "cost" },
    ];

    return (
        <div>
            <h2>Maintenance Logs</h2>
            {role === "admin" || role === "staff" ? (
                <Card title="Equipment Maintenance Records">
                    <Button type="primary" onClick={() => setModalVisible(true)} style={{ marginBottom: 16 }}>
                        Add Maintenance Record
                    </Button>
                    <Table columns={columns} dataSource={logs} rowKey="id" pagination={{ pageSize: 5 }} />
                </Card>
            ) : (
                <Card>
                    <p>You do not have permission to manage maintenance logs.</p>
                </Card>
            )}

            {/* Modal สำหรับเพิ่มข้อมูลการซ่อมบำรุง */}
            <Modal
                title="Add Maintenance Record"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleAddMaintenance} layout="vertical">
                    <Form.Item name="equipmentId" label="Select Equipment" rules={[{ required: true }]}>
                        <Select placeholder="Select Equipment">
                            {equipmentList.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item name="maintenance_date" label="Date" rules={[{ required: true }]}>
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                        <Select>
                            <Select.Option value="Routine">Routine</Select.Option>
                            <Select.Option value="Repair">Repair</Select.Option>
                            <Select.Option value="Inspection">Inspection</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="cost" label="Cost" rules={[{ required: true }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default MaintenanceLogs;
