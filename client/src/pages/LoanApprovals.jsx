import { useEffect, useState } from "react";
import { Table, Button, message, Card, Tag } from "antd";
import { getPendingLoans, approveLoan, rejectLoan } from "../services/api";
import { getRole } from "../services/auth";

function LoanApprovals() {
    const [loans, setLoans] = useState([]);
    const role = getRole();

    useEffect(() => {
        async function fetchData() {
            const pendingLoans = await getPendingLoans();
            setLoans(pendingLoans);
        }
        fetchData();
    }, []);

    async function handleApprove(id) {
        await approveLoan(id);
        message.success("Loan approved!");
        setLoans(loans.filter(loan => loan.id !== id));
    }

    async function handleReject(id) {
        await rejectLoan(id);
        message.warning("Loan rejected!");
        setLoans(loans.filter(loan => loan.id !== id));
    }

    const columns = [
        { title: "Equipment Name", dataIndex: "equipment_name" },
        { title: "Borrower", dataIndex: "borrower_name" },
        { title: "Request Date", dataIndex: "request_date" },
        { 
            title: "Status", 
            dataIndex: "status",
            render: (status) => <Tag color="blue">{status}</Tag>
        },
        {
            title: "Actions",
            render: (_, record) => (
                <>
                    <Button type="primary" onClick={() => handleApprove(record.id)} style={{ marginRight: 8 }}>
                        Approve
                    </Button>
                    <Button type="danger" onClick={() => handleReject(record.id)}>
                        Reject
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <h2>Loan Approvals</h2>
            {role === "admin" || role === "staff" ? (
                <Card title="Pending Loan Requests">
                    <Table columns={columns} dataSource={loans} rowKey="id" pagination={{ pageSize: 5 }} />
                </Card>
            ) : (
                <Card>
                    <p>You do not have permission to approve loans.</p>
                </Card>
            )}
        </div>
    );
}

export default LoanApprovals;