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

export async function getAvailableEquipment() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลอุปกรณ์ที่พร้อมใช้งาน
    return [
        { id: 1, equipment_name: 'Laptop', available: true },
        { id: 2, equipment_name: 'Projector', available: true },
    ];
}

export async function getUserLoans(userId) {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการยืมของผู้ใช้
    return [
        { id: 1, equipment_name: 'Laptop', loan_date: '2025-02-01', return_date: null, user_id: userId },
        { id: 2, equipment_name: 'Projector', loan_date: '2025-02-05', return_date: '2025-02-10', user_id: userId },
    ];
}

export async function requestBorrow(equipmentId) {
    // ตัวอย่างการเรียก API เพื่อขอยืมอุปกรณ์
    console.log(`Requesting to borrow equipment with ID: ${equipmentId}`);
    return {
        success: true,
        message: 'Borrow request submitted successfully',
    };
}

export async function getPendingLoans() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการยืมที่ยังไม่ได้รับการอนุมัติ
    return [
        { id: 1, equipment_name: 'Laptop', borrower_name: 'John Doe', request_date: '2025-02-01', status: 'Pending' },
        { id: 2, equipment_name: 'Projector', borrower_name: 'Jane Smith', request_date: '2025-02-05', status: 'Pending' },
    ];
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

export async function getBorrowedLoans() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการยืมที่ยังไม่ได้คืน
    return [
        { id: 1, equipment_name: 'Laptop', borrower_name: 'John Doe', borrow_date: '2025-02-01', status: 'Borrowed' },
        { id: 2, equipment_name: 'Projector', borrower_name: 'Jane Smith', borrow_date: '2025-02-05', status: 'Borrowed' },
    ];
}

export async function confirmReturn(id) {
    // ตัวอย่างการเรียก API เพื่อยืนยันการคืนอุปกรณ์
    console.log(`Confirming return of equipment with ID: ${id}`);
    return {
        success: true,
        message: 'Equipment returned successfully',
    };
}

export async function getMaintenanceLogs() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลการซ่อมบำรุง
    return [
        { id: 1, equipment_name: 'Laptop', maintenance_date: '2025-01-15', type: 'Routine', description: 'Routine check', cost: 100 },
        { id: 2, equipment_name: 'Projector', maintenance_date: '2025-01-20', type: 'Repair', description: 'Repaired lens', cost: 200 },
    ];
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
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลรายการอุปกรณ์
    return [
        { id: 1, name: 'Laptop' },
        { id: 2, name: 'Projector' },
    ];
}

export async function getUsers() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลผู้ใช้
    return [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'staff' },
    ];
}

export async function addUser(user) {
    // ตัวอย่างการเรียก API เพื่อเพิ่มผู้ใช้
    console.log(`Adding user: ${JSON.stringify(user)}`);
    return {
        success: true,
        message: 'User added successfully',
    };
}

export async function updateUser(id, user) {
    // ตัวอย่างการเรียก API เพื่ออัปเดตข้อมูลผู้ใช้
    console.log(`Updating user with ID: ${id}, data: ${JSON.stringify(user)}`);
    return {
        success: true,
        message: 'User updated successfully',
    };
}

export async function deleteUser(id) {
    // ตัวอย่างการเรียก API เพื่อลบผู้ใช้
    console.log(`Deleting user with ID: ${id}`);
    return {
        success: true,
        message: 'User deleted successfully',
    };
}

export async function getEquipment() {
    // ตัวอย่างการเรียก API เพื่อดึงข้อมูลอุปกรณ์
    return [
        { id: 1, name: 'Laptop', category: 'Electronics', status: 'Available', location: 'Room 101' },
        { id: 2, name: 'Projector', category: 'Electronics', status: 'Borrowed', location: 'Room 102' },
    ];
}

export async function addEquipment(equipment) {
    // ตัวอย่างการเรียก API เพื่อเพิ่มอุปกรณ์
    console.log(`Adding equipment: ${JSON.stringify(equipment)}`);
    return {
        success: true,
        message: 'Equipment added successfully',
    };
}

export async function updateEquipment(id, equipment) {
    // ตัวอย่างการเรียก API เพื่ออัปเดตข้อมูลอุปกรณ์
    console.log(`Updating equipment with ID: ${id}, data: ${JSON.stringify(equipment)}`);
    return {
        success: true,
        message: 'Equipment updated successfully',
    };
}

export async function deleteEquipment(id) {
    // ตัวอย่างการเรียก API เพื่อลบอุปกรณ์
    console.log(`Deleting equipment with ID: ${id}`);
    return {
        success: true,
        message: 'Equipment deleted successfully',
    };
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