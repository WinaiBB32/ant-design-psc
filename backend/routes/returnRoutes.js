const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ คืนอุปกรณ์
router.post("/", authMiddleware(["user", "staff"]), (req, res) => {
    const { loanId } = req.body;

    const sql = `
        UPDATE loans SET status = 'returned', return_date = NOW() WHERE id = ?;
        UPDATE equipment SET quantity = quantity + 1 WHERE id = (SELECT equipment_id FROM loans WHERE id = ?);
    `;
    db.query(sql, [loanId, loanId], (err) => {
        if (err) return res.status(500).json({ message: "Error returning equipment" });
        res.json({ message: "คืนอุปกรณ์สำเร็จ" });
    });
});

module.exports = router;
