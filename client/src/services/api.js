import axios from "axios";

const API_URL = "http://localhost:3307/api";



// ✅ ดึง token จาก LocalStorage
const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ✅ ดึงรายชื่อผู้ใช้
export async function getUsers() {
    console.log("📌 Fetching Users...");
    return await axios.get(`${API_URL}/users`, {
        headers: getAuthHeader(),
    });
}

// ✅ เพิ่มผู้ใช้ใหม่
export async function addUser(userData) {
    console.log("📌 Adding user:", userData);
    return await axios.post(`${API_URL}/users`, userData, {
        headers: {
            ...getAuthHeader(),
            "Content-Type": "application/json",
        },
    });
}



// ✅ ดึงรายการหมวดหมู่ทั้งหมด
export async function getCategories() {
    return await axios.get(`${API_URL}/categories`, {
        headers: getAuthHeader(),
    });
}

// ✅ ดึงอุปกรณ์ทั้งหมด (รวมอุปกรณ์ที่ไม่สามารถยืมได้)
export async function getAllEquipment() {
    return await axios.get(`${API_URL}/equipment`, {
        headers: getAuthHeader(),
    });
}

// ✅ ดึงอุปกรณ์ที่สามารถยืมได้ (quantity > 0)
export async function getAvailableEquipment() {
    return await axios.get(`${API_URL}/equipment/available`, {
        headers: getAuthHeader(),
    });
}

// ✅ ดึงอุปกรณ์ตาม ID
export async function getEquipmentById(id) {
    return await axios.get(`${API_URL}/equipment/${id}`, {
        headers: getAuthHeader(),
    });
}

// ✅ เพิ่มอุปกรณ์ใหม่
export const addEquipment = async (equipmentData) => {
    try {
        console.log("📌 Debug Equipment Data (Before Send):", equipmentData); // ✅ ตรวจสอบค่าก่อนส่ง

        const response = await axios.post(
            `${API_URL}/equipment`,
            equipmentData,
            { headers: { "Content-Type": "application/json" } } // ✅ กำหนด Header ให้เป็น JSON
        );

        return response.data;
    } catch (error) {
        console.error("❌ Error adding equipment:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ อัปเดตอุปกรณ์
export async function updateEquipment(id, equipmentData) {
    return await axios.put(`${API_URL}/equipment/${id}`, equipmentData, {
        headers: { ...getAuthHeader(), "Content-Type": "multipart/form-data" },
    });
}

// ✅ ลบอุปกรณ์
export async function deleteEquipment(id) {
    return await axios.delete(`${API_URL}/equipment/${id}`, {
        headers: getAuthHeader(),
    });
}




// ✅ ดึงรายการการยืมของผู้ใช้
export async function getMyLoans() {
    return await axios.get(`${API_URL}/loans/my-loans`, {
        headers: getAuthHeader(),
    });
}

// ✅ ส่งคำขอยืมอุปกรณ์
export async function requestBorrow(borrowRequest) {
    return await axios.post(`${API_URL}/loans/borrow`, borrowRequest, {
        headers: { ...getAuthHeader(), "Content-Type": "application/json" },
    });
}

// ✅ คืนอุปกรณ์
export async function returnEquipment(equipmentId) {
    return await axios.post(`${API_URL}/borrow/return/${equipmentId}`, {}, {
        headers: getAuthHeader(),
    });
}















export async function deleteUser(id) {
    const response = await axios.delete(`${API_URL}/users/${id}`);
    return response.data;
}

export async function updateUser(id, userData) {
    const response = await axios.put(`${API_URL}/users/${id}`, userData);
    return response.data;
}

//อุปกรณ์

export async function getEquipment() {
    return await axios.get(`${API_URL}/equipment`);
}



export async function updateEquipmentQuantity(id, change) {
    return await axios.patch(`${API_URL}/equipment/${id}/quantity`, { change }, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
        },
    });
}

export async function approveLoan(id) {
    // ตัวอย่างการเรียก API เพื่ออนุมัติการยืม
    console.log(`Approving loan with ID: ${id}`);
    return {
        success: true,
        message: 'Loan approved successfully',
    };
}

export async function rejectLoan(id) {
    // ตัวอย่างการเรียก API เพื่อปฏิเสธการยืม
    console.log(`Rejecting loan with ID: ${id}`);
    return {
        success: true,
        message: 'Loan rejected successfully',
    };
}



export async function confirmReturn(id) {
    // ตัวอย่างการเรียก API เพื่อยืนยันการคืนอุปกรณ์
    console.log(`Confirming return of equipment with ID: ${id}`);
    return {
        success: true,
        message: 'Equipment returned successfully',
    };
}



export async function addMaintenanceLog(log) {
    // ตัวอย่างการเรียก API เพื่อเพิ่มข้อมูลการซ่อมบำรุง
    console.log(`Adding maintenance log: ${JSON.stringify(log)}`);
    return {
        success: true,
        message: 'Maintenance log added successfully',
    };
}

export async function getEquipmentList() {
    return await axios.get(`${API_URL}/equipment`);
}





export async function addCategory(categoryData) {
    return await axios.post(`${API_URL}/categories`, categoryData, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // ✅ ต้องมี Header นี้
            "Content-Type": "application/json"
        },
    });
}


export async function updateCategory(id, categoryData) {
    return await axios.put(`${API_URL}/categories/${id}`, categoryData);
}

export async function deleteCategory(id) {
    return await axios.delete(`${API_URL}/categories/${id}`);
}




export async function getNotifications() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการแจ้งเตือน
    return [
        { id: 1, title: 'New Loan Request', message: 'You have a new loan request from John Doe' },
        { id: 2, title: 'Equipment Returned', message: 'Jane Smith has returned the projector' },
    ];
}

export async function markNotificationAsRead(id) {
    // ตัวอย่างการเรียก API เพื่อทำเครื่องหมายการแจ้งเตือนว่าอ่านแล้ว
    console.log(`Marking notification with ID: ${id} as read`);
    return {
        success: true,
        message: 'Notification marked as read',
    };
}

export async function getMaintenanceLogs() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการซ่อมบำรุง
    return [
        { id: 1, equipment_name: 'Laptop', maintenance_date: '2025-01-15', type: 'Routine', description: 'Routine check', cost: 100 },
        { id: 2, equipment_name: 'Projector', maintenance_date: '2025-01-20', type: 'Repair', description: 'Repaired lens', cost: 200 },
    ];
}

export async function getBorrowedLoans() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการยืมที่ยังไม่ได้คืน
    return [
        { id: 1, equipment_name: 'Laptop', borrower_name: 'John Doe', borrow_date: '2025-02-01', status: 'Borrowed' },
        { id: 2, equipment_name: 'Projector', borrower_name: 'Jane Smith', borrow_date: '2025-02-05', status: 'Borrowed' },
    ];
}

export async function getDashboardStats() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลสถิติ
    return {
        totalEquipment: 100,
        borrowed: 30,
        available: 70,
    };
}

export async function getBorrowedEquipment() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลอุปกรณ์ที่ถูกยืม
    return [
        { id: 1, equipment_name: 'Laptop', borrower_name: 'John Doe', borrow_date: '2025-02-01' },
        { id: 2, equipment_name: 'Projector', borrower_name: 'Jane Smith', borrow_date: '2025-02-05' },
    ];
}



export async function getUserLoans(userId) {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการยืมของผู้ใช้
    return [
        { id: 1, equipment_name: 'Laptop', loan_date: '2025-02-01', return_date: null, user_id: userId },
        { id: 2, equipment_name: 'Projector', loan_date: '2025-02-05', return_date: '2025-02-10', user_id: userId },
    ];
}

export async function getPendingLoans() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการยืมที่ยังไม่ได้รับการอนุมัติ
    return [
        { id: 1, equipment_name: 'Laptop', borrower_name: 'John Doe', request_date: '2025-02-01', status: 'Pending' },
        { id: 2, equipment_name: 'Projector', borrower_name: 'Jane Smith', request_date: '2025-02-05', status: 'Pending' },
    ];
}