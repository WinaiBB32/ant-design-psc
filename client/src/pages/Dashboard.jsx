import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Table } from "antd";
import { Pie } from "@ant-design/plots";
import { getDashboardStats, getBorrowedEquipment } from "../services/api";

function Dashboard() {
    const [stats, setStats] = useState({
        totalEquipment: 0,
        borrowed: 0,
        available: 0,
    });

    const [borrowedList, setBorrowedList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const statsData = await getDashboardStats();
            setStats(statsData);

            const borrowedData = await getBorrowedEquipment();
            setBorrowedList(borrowedData);
        }
        fetchData();
    }, []);

    // ข้อมูล Pie Chart
    const pieData = [
        { type: "Borrowed", value: stats.borrowed },
        { type: "Available", value: stats.available },
    ];

    const pieConfig = {
        appendPadding: 10,
        data: pieData,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    return (
        <div>
            <h2>Dashboard</h2>

            {/* ส่วนแสดงสถิติ */}
            <Row gutter={16}>
                <Col span={8}>
                    <Card>
                        <Statistic title="Total Equipment" value={stats.totalEquipment} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Borrowed" value={stats.borrowed} />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <Statistic title="Available" value={stats.available} />
                    </Card>
                </Col>
            </Row>

            {/* แสดง Pie Chart */}
            <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={12}>
                    <Card title="Equipment Status">
                        <Pie {...pieConfig} />
                    </Card>
                </Col>

                {/* รายการอุปกรณ์ที่กำลังถูกยืม */}
                <Col span={12}>
                    <Card title="Currently Borrowed Equipment">
                        <Table
                            columns={[
                                { title: "Equipment Name", dataIndex: "equipment_name" },
                                { title: "Borrower", dataIndex: "borrower_name" },
                                { title: "Borrow Date", dataIndex: "borrow_date" },
                            ]}
                            dataSource={borrowedList}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;
