import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message, Card, Typography, Spin, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";


const { Title } = Typography;

const ReturnManagement = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBorrowedEquipment();
  }, []);

  const fetchBorrowedEquipment = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userID");

      if (!token || !userId) {
        message.warning("กรุณาเข้าสู่ระบบ");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:3307/api/loans/borrowed/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data);
    } catch (error) {
      message.error("❌ ไม่สามารถโหลดข้อมูลอุปกรณ์ที่ยืมได้",error);
    }
    setLoading(false);
  };

  const handleReturn = async (loanId, equipmentId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3307/api/loans/return/${loanId}`,
        { equipmentId }, // ✅ ส่งค่า equipmentId ไปเพื่อเพิ่ม quantity
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success("✅ คืนอุปกรณ์สำเร็จ!");
      fetchBorrowedEquipment();
    } catch (error) {
      message.error("❌ เกิดข้อผิดพลาดในการคืนอุปกรณ์",error);
    }
  };

  const columns = [
    {
      title: "ชื่ออุปกรณ์",
      dataIndex: "equipment_name",
      key: "equipment_name",
    },
    {
      title: "วันที่ยืม",
      dataIndex: "borrow_date",
      key: "borrow_date",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "borrowed" ? "blue" : "green"}>
          {status === "borrowed" ? "กำลังใช้งาน" : "คืนแล้ว"}
        </Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      render: (_, record) =>
        record.status === "borrowed" && (
          <Button type="primary" icon={<CheckOutlined />} onClick={() => handleReturn(record.id, record.equipment_id)}>
            คืน
          </Button>
        ),
    },
  ];

  return (
    <Card className="return-container">
      <Title level={2}>📦 คืนอุปกรณ์</Title>
      {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={loans} rowKey="id" />}
    </Card>
  );
};

export default ReturnManagement;
