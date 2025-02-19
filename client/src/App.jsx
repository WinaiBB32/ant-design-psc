import { Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useState } from 'react';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import BorrowEquipment from "./pages/BorrowEquipment";
import LoanApprovals from "./pages/LoanApprovals";
import ReturnManagement from "./pages/ReturnManagement";
import MaintenanceLogs from "./pages/MaintenanceLogs";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import EquipmentManagement from './pages/EquipmentManagement';

function App() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    const isLoginPage = location.pathname === '/login';

    return (
        <Layout style={{ height: '100vh', width: '100vw' }}>
            {!isLoginPage && <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />}
            <Layout>
                {!isLoginPage && <Sidebar collapsed={collapsed} />}
                <Layout.Content style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                            <Route path="/borrow" element={<ProtectedRoute role="user"><BorrowEquipment /></ProtectedRoute>} />
                            <Route path="/loans" element={<ProtectedRoute role="staff"><LoanApprovals /></ProtectedRoute>} />
                            <Route path="/returns" element={<ProtectedRoute role="staff"><ReturnManagement /></ProtectedRoute>} />
                            <Route path="/maintenance" element={<ProtectedRoute role="staff"><MaintenanceLogs /></ProtectedRoute>} />
                            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                            <Route path="/Equipment" element={<ProtectedRoute><EquipmentManagement /></ProtectedRoute>} />
                            <Route path="/users" element={<ProtectedRoute role="admin"><UserManagement /></ProtectedRoute>} />
                            {!isLoginPage && <Route path="*" element={<NotFound collapsed={collapsed} />} />} {/* Route 404 */}
                    </Routes>
                </Layout.Content>
            </Layout>
        </Layout>
    );
}

export default App;