const express = require("express");
const db = require("../config/db");

const router = express.Router();

// ✅ API เพิ่มอุปกรณ์ใหม่
router.post("/equipment", (req, res) => {
    console.log("📌 Debug Request Body:", req.body); // ✅ ตรวจสอบค่าที่รับจาก Frontend

    const { name, category, location, quantity, image_url, status } = req.body;

    // 🔹 ตรวจสอบค่าที่ส่งมาว่าครบหรือไม่
    if (!name || quantity === undefined) {
        return res.status(400).json({ message: "❌ ต้องระบุชื่ออุปกรณ์ และจำนวน" });
    }

    const query = `
        INSERT INTO equipment (name, category, location, quantity, image_url, status) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(query, [name, category || "", location || "", quantity, image_url || "", status || "available"], (err, result) => {
        if (err) {
            console.error("❌ Database Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "✅ เพิ่มอุปกรณ์สำเร็จ!", equipmentId: result.insertId });
    });
});

module.exports = router;
