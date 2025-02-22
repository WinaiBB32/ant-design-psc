const db = require("../config/db");

// ดึงรายการการยืมทั้งหมด
exports.getAllLoans = (req, res) => {
    const sql = "SELECT * FROM loans";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ดึงข้อมูลการยืมตาม ID
exports.getLoanById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM loans WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Loan not found" });
        res.json(results[0]);
    });
};

// เพิ่มข้อมูลการยืม
exports.addLoan = (req, res) => {
    const { user_id, equipment_id, borrow_date, return_date, approved_by, status } = req.body;
    const sql = "INSERT INTO loans (user_id, equipment_id, borrow_date, return_date, approved_by, status) VALUES (?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [user_id, equipment_id, borrow_date, return_date, approved_by, status], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Loan record added successfully" });
    });
};

// อัปเดตข้อมูลการยืม
exports.updateLoan = (req, res) => {
    const { id } = req.params;
    const { user_id, equipment_id, borrow_date, return_date, approved_by, status } = req.body;
    const sql = "UPDATE loans SET user_id=?, equipment_id=?, borrow_date=?, return_date=?, approved_by=?, status=? WHERE id=?";
    
    db.query(sql, [user_id, equipment_id, borrow_date, return_date, approved_by, status, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Loan record updated successfully" });
    });
};

// ลบข้อมูลการยืม
exports.deleteLoan = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM loans WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Loan record deleted successfully" });
    });
};
