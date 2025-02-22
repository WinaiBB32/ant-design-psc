import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, message, Card, Typography, Spin, Tag } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "../styles/LoanApprovals.css";

const { Title } = Typography;

const LoanApprovals = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLoanRequests();
  }, []);

  const fetchLoanRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        message.warning("กรุณาเข้าสู่ระบบ");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:3307/api/loans/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data);
    } catch (error) {
      message.error("❌ ไม่สามารถโหลดข้อมูลคำขอยืมได้",error);
    }
    setLoading(false);
  };

  const handleApproval = async (loanId, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3307/api/loans/approve/${loanId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      message.success(`✅ ${status === "approved" ? "อนุมัติ" : "ปฏิเสธ"} การยืมสำเร็จ!`);
      fetchLoanRequests();
    } catch (error) {
      message.error("❌ เกิดข้อผิดพลาดในการอัปเดตสถานะ",error);
    }
  };

  const columns = [
    {
      title: "ชื่ออุปกรณ์",
      dataIndex: "equipment_name",
      key: "equipment_name",
    },
    {
      title: "ผู้ขอยืม",
      dataIndex: "borrower_name",
      key: "borrower_name",
    },
    {
      title: "วันที่ขอยืม",
      dataIndex: "borrow_date",
      key: "borrow_date",
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "borrowed" ? "orange" : status === "approved" ? "green" : "red"}>
          {status === "borrowed" ? "รออนุมัติ" : status === "approved" ? "อนุมัติแล้ว" : "ถูกปฏิเสธ"}
        </Tag>
      ),
    },
    {
      title: "การดำเนินการ",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" icon={<CheckOutlined />} onClick={() => handleApproval(record.id, "approved")}>
            อนุมัติ
          </Button>
          <Button type="danger" icon={<CloseOutlined />} onClick={() => handleApproval(record.id, "rejected")}>
            ปฏิเสธ
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card className="loan-approvals-container">
      <Title level={2}>📋 อนุมัติการยืมอุปกรณ์</Title>
      {loading ? <Spin size="large" /> : <Table columns={columns} dataSource={loans} rowKey="id" />}
    </Card>
  );
};

export default LoanApprovals;
