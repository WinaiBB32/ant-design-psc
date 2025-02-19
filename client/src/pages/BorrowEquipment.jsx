import { useEffect, useState } from "react";
import { Form, Select, Button, Table, message, Modal, Card } from "antd";
import { getAvailableEquipment, requestBorrow, getUserLoans } from "../services/api";
import { getRole } from "../services/auth";

function BorrowEquipment() {
    const [form] = Form.useForm();
    const [equipmentList, setEquipmentList] = useState([]);
    const [userLoans, setUserLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const role = getRole();
    const userId = 1; // สมมติว่า userId เป็น 1 คุณสามารถเปลี่ยนเป็นค่าที่ถูกต้องได้

    useEffect(() => {
        async function fetchData() {
            const equipmentData = await getAvailableEquipment();
            setEquipmentList(equipmentData);
            const loansData = await getUserLoans(userId);
            setUserLoans(loansData);
        }
        fetchData();
    }, [userId]);

    async function handleBorrow(values) {
        setLoading(true);
        try {
            await requestBorrow(values.equipmentId);
            message.success("Borrow request submitted!");
            form.resetFields();
            setModalVisible(false);
        } catch (error) {
            message.error("Error submitting request.", error);
        }
        setLoading(false);
    }

    const columns = [
        { title: "Equipment Name", dataIndex: "equipment_name" },
        { title: "Status", dataIndex: "status" },
        { title: "Borrow Date", dataIndex: "borrow_date" },
    ];

    return (
        <div>
            <h2>Borrow Equipment</h2>
            
            {role === "user" && (
                <Card>
                    <Button type="primary" onClick={() => setModalVisible(true)}>
                        Request Borrow
                    </Button>
                </Card>
            )}

            {/* Modal สำหรับขอยืมอุปกรณ์ */}
            <Modal
                title="Request Borrow"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleBorrow} layout="vertical">
                    <Form.Item name="equipmentId" label="Select Equipment" rules={[{ required: true }]}>
                        <Select placeholder="Select Equipment">
                            {equipmentList.map((item) => (
                                <Select.Option key={item.id} value={item.id}>
                                    {item.equipment_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Submit Request
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            {/* รายการอุปกรณ์ที่ผู้ใช้เคยยืม */}
            <Card title="My Borrowed Equipment" style={{ marginTop: 20 }}>
                <Table columns={columns} dataSource={userLoans} rowKey="id" pagination={{ pageSize: 5 }} />
            </Card>
        </div>
    );
}

export default BorrowEquipment;
