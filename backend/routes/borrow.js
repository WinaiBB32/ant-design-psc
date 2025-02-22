const express = require("express");
const router = express.Router();
const db = require("../db");

// ยืมอุปกรณ์
router.post("/borrow", (req, res) => {
  const { userId, equipmentId } = req.body;

  db.query("SELECT quantity FROM equipment WHERE id = ?", [equipmentId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results[0].quantity <= 0) {
      return res.status(400).json({ message: "อุปกรณ์หมด ไม่สามารถยืมได้" });
    }

    // ลดจำนวนอุปกรณ์ลง 1
    db.query("UPDATE equipment SET quantity = quantity - 1 WHERE id = ?", [equipmentId], (err) => {
      if (err) return res.status(500).json({ error: err.message });

      // เพิ่มข้อมูลการยืม
      db.query(
        "INSERT INTO loans (user_id, equipment_id, borrow_date, status) VALUES (?, ?, NOW(), 'borrowed')",
        [userId, equipmentId],
        (err) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json({ message: "ยืมอุปกรณ์สำเร็จ!" });
        }
      );
    });
  });
});

module.exports = router;
