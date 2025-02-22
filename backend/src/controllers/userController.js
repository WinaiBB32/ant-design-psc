const db = require("../config/db");
const bcrypt = require("bcryptjs");

// ดึงรายการผู้ใช้ทั้งหมด
exports.getAllUsers = (req, res) => {
    const sql = "SELECT id, username, name, email, phone, role, department FROM users";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ดึงข้อมูลผู้ใช้ตาม ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT id, username, name, email, phone, role, department FROM users WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};

// เพิ่มผู้ใช้ใหม่
exports.addUser = (req, res) => {
    const { username, password, name, email, phone, role, department } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const sql = "INSERT INTO users (username, password, name, email, phone, role, department) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [username, hashedPassword, name, email, phone, role, department], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User added successfully" });
    });
};

// อัปเดตข้อมูลผู้ใช้
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { username, name, email, phone, role, department } = req.body;
    const sql = "UPDATE users SET username=?, name=?, email=?, phone=?, role=?, department=? WHERE id=?";
    
    db.query(sql, [username, name, email, phone, role, department, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User updated successfully" });
    });
};

// ลบผู้ใช้
exports.deleteUser = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM users WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "User deleted successfully" });
    });
};
