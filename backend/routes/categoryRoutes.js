const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ ดึงรายการหมวดหมู่ทั้งหมด
router.get("/", (req, res) => {
    db.query("SELECT * FROM categories", (err, results) => {
        if (err) {
            console.error("❌ Error fetching categories:", err);
            return res.status(500).json({ message: "Error fetching categories" });
        }
        res.json(results);
    });
});

// ✅ เพิ่มหมวดหมู่ใหม่ (เฉพาะ admin, staff)
router.post("/", authMiddleware(["admin", "staff"]), (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: "กรุณากรอกชื่อหมวดหมู่" });
    }

    const sql = "INSERT INTO categories (name, description) VALUES (?, ?)";
    db.query(sql, [name, description], (err, result) => {
        if (err) {
            console.error("❌ Error adding category:", err);
            return res.status(500).json({ message: "Error adding category" });
        }
        res.status(201).json({ message: "เพิ่มหมวดหมู่สำเร็จ", categoryId: result.insertId });
    });
});

// ✅ อัปเดตข้อมูลหมวดหมู่ (เฉพาะ admin, staff)
router.put("/:id", authMiddleware(["admin", "staff"]), (req, res) => {
    const { name, description } = req.body;
    if (!name) {
        return res.status(400).json({ message: "กรุณากรอกชื่อหมวดหมู่" });
    }

    const sql = "UPDATE categories SET name = ?, description = ? WHERE id = ?";
    db.query(sql, [name, description, req.params.id], (err) => {
        if (err) {
            console.error("❌ Error updating category:", err);
            return res.status(500).json({ message: "Error updating category" });
        }
        res.json({ message: "อัปเดตหมวดหมู่สำเร็จ" });
    });
});

// ✅ ลบหมวดหมู่ (เฉพาะ admin)
router.delete("/:id", authMiddleware(["admin"]), (req, res) => {
    db.query("DELETE FROM categories WHERE id = ?", [req.params.id], (err) => {
        if (err) {
            console.error("❌ Error deleting category:", err);
            return res.status(500).json({ message: "Error deleting category" });
        }
        res.json({ message: "ลบหมวดหมู่สำเร็จ" });
    });
});

module.exports = router;
