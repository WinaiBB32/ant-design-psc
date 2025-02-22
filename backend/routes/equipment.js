const express = require("express");
const router = express.Router();
const db = require("../db");

// ดึงรายการอุปกรณ์ทั้งหมด
router.get("/equipment", (req, res) => {
  db.query("SELECT * FROM equipment", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;
