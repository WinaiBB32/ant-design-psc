const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

// ฟังก์ชันสำหรับเข้าสู่ระบบ
exports.login = (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ?";
    
    db.query(sql, [username], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: "User not found" });

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user });
    });
};

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้ใหม่
exports.register = (req, res) => {
    const { username, password, name, email, role } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    
    const sql = "INSERT INTO users (username, password, name, email, role) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [username, hashedPassword, name, email, role], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User registered successfully" });
    });
};

// ฟังก์ชันสำหรับตรวจสอบข้อมูลผู้ใช้
exports.getUserProfile = (req, res) => {
    const userId = req.user.id;
    const sql = "SELECT id, username, name, email, role FROM users WHERE id = ?";
    
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};
