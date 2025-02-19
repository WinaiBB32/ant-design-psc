import { useEffect, useState } from "react";
import { Table, Button, message, Card, Tag } from "antd";
import { getBorrowedLoans, confirmReturn } from "../services/api";
import { getRole } from "../services/auth";

function ReturnManagement() {
    const [loans, setLoans] = useState([]);
    const role = getRole();

    useEffect(() => {
        async function fetchData() {
            const borrowedLoans = await getBorrowedLoans();
            setLoans(borrowedLoans);
        }
        fetchData();
    }, []);

    async function handleReturn(id) {
        await confirmReturn(id);
        message.success("Equipment returned!");
        setLoans(loans.filter(loan => loan.id !== id));
    }

    const columns = [
        { title: "Equipment Name", dataIndex: "equipment_name" },
        { title: "Borrower", dataIndex: "borrower_name" },
        { title: "Borrow Date", dataIndex: "borrow_date" },
        { 
            title: "Status", 
            dataIndex: "status",
            render: (status) => <Tag color="red">{status}</Tag>
        },
        {
            title: "Actions",
            render: (_, record) => (
                <Button type="primary" onClick={() => handleReturn(record.id)}>
                    Confirm Return
                </Button>
            ),
        },
    ];

    return (
        <div>
            <h2>Return Management</h2>
            {role === "admin" || role === "staff" ? (
                <Card title="Borrowed Equipment">
                    <Table columns={columns} dataSource={loans} rowKey="id" pagination={{ pageSize: 5 }} />
                </Card>
            ) : (
                <Card>
                    <p>You do not have permission to manage returns.</p>
                </Card>
            )}
        </div>
    );
}

export default ReturnManagement;
