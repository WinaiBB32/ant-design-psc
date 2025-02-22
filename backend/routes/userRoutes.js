const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

// 🔹 ดึงข้อมูลผู้ใช้ทั้งหมด (เฉพาะ admin)
router.get("/", authMiddleware(["admin"]), (req, res) => {
    db.query("SELECT id, username, role, email FROM users", (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching users" });
        res.json(results);
    });
});
// ✅ API ดึงข้อมูลผู้ใช้ทั้งหมด
router.get("/users", (req, res) => {
    db.query("SELECT id, username, email, role FROM users", (err, results) => {
        if (err) {
            console.error("❌ Database Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// ✅ API เพิ่มผู้ใช้ใหม่
router.post("/users", async (req, res) => {
    const { username, password, email, role } = req.body;

    // 🔹 ตรวจสอบค่าที่ส่งมาว่าครบหรือไม่
    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: "❌ ต้องระบุข้อมูลให้ครบถ้วน" });
    }

    try {
        // 🔹 เข้ารหัสรหัสผ่าน
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
            INSERT INTO users (username, password, email, role) 
            VALUES (?, ?, ?, ?)
        `;

        db.query(query, [username, hashedPassword, email, role], (err, result) => {
            if (err) {
                console.error("❌ Database Query Error:", err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "✅ เพิ่มผู้ใช้สำเร็จ!", userId: result.insertId });
        });
    } catch (error) {
        res.status(500).json({ message: "❌ เกิดข้อผิดพลาดในการเพิ่มผู้ใช้" });
    }
});


// 🔹 อัปเดตข้อมูลผู้ใช้ (เฉพาะ admin)
router.put("/:id", authMiddleware(["admin"]), async (req, res) => {
    const { username, role, email } = req.body;
    const sql = "UPDATE users SET username = ?, role = ?, email = ? WHERE id = ?";
    db.query(sql, [username, role, email, req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Error updating user" });
        res.json({ message: "User updated successfully" });
    });
});

// 🔹 ลบผู้ใช้ (เฉพาะ admin)
router.delete("/:id", authMiddleware(["admin"]), (req, res) => {
    db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err) => {
        if (err) return res.status(500).json({ message: "Error deleting user" });
        res.json({ message: "User deleted successfully" });
    });
});

module.exports = router;
