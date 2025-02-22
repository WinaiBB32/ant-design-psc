import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message, Card, Typography, Image, Spin, Tag } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "../styles/BorrowEquipment.css";

const { Title } = Typography;

const BorrowEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3307/api/equipment");
      setEquipment(response.data);
    } catch (error) {
      message.error("❌ ไม่สามารถโหลดข้อมูลอุปกรณ์ได้",error);
    }
    setLoading(false);
  };

  const handleBorrow = async (equipmentId) => {
    try {
      const userId = localStorage.getItem("userID");
      const token = localStorage.getItem("token");

      if (!userId || !token) {
        message.warning("กรุณาเข้าสู่ระบบก่อนยืมอุปกรณ์");
        return;
      }

      console.log("📌 Debug Token:", token);
      console.log("📌 Debug userId:", userId);

      const response = await axios.post(
        "http://localhost:3307/api/loans/borrow",
        { userId, equipmentId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success(response.data.message);
      fetchEquipment();
    } catch (error) {
      console.error("❌ [BORROW ERROR]:", error.response?.data || error.message);
      message.error(error.response?.data?.message || "เกิดข้อผิดพลาดในการยืมอุปกรณ์");
    }
  };

  const columns = [
    {
      title: "รูปภาพ",
      dataIndex: "image_url",
      key: "image_url",
      render: (image) => <Image width={50} src={image} alt="Equipment" />,
    },
    {
      title: "ชื่ออุปกรณ์",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "จำนวนที่เหลือ",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <strong>{quantity}</strong>,
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "available" ? "green" : status === "borrowed" ? "red" : "gray"}>
          {status === "available" ? "พร้อมใช้งาน" : status === "borrowed" ? "ถูกยืม" : "ไม่พร้อมใช้งาน"}
        </Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<CheckOutlined />}
          disabled={record.status !== "available" || record.quantity <= 0}
          onClick={() => handleBorrow(record.id)}
        >
          ยืม
        </Button>
      ),
    },
  ];

  return (
    <Card className="borrow-container">
      <Title level={2}>📦 ยืมอุปกรณ์</Title>
      {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={equipment} rowKey="id" />}
    </Card>
  );
};

export default BorrowEquipment;
