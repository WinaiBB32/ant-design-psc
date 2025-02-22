const express = require("express");
const router = express.Router();
const { getAllLoans, getLoanById, addLoan, updateLoan, deleteLoan } = require("../controllers/loanController");
const { verifyToken, isAdminOrStaff } = require("../middleware/authMiddleware");

// ดึงรายการการยืมทั้งหมด
router.get("/", verifyToken, getAllLoans);

// ดึงข้อมูลการยืมตาม ID
router.get("/:id", verifyToken, getLoanById);

// เพิ่มข้อมูลการยืม (เฉพาะ Admin หรือ Staff เท่านั้น)
router.post("/", verifyToken, isAdminOrStaff, addLoan);

// อัปเดตข้อมูลการยืม (เฉพาะ Admin หรือ Staff เท่านั้น)
router.put("/:id", verifyToken, isAdminOrStaff, updateLoan);

// ลบข้อมูลการยืม (เฉพาะ Admin เท่านั้น)
router.delete("/:id", verifyToken, isAdminOrStaff, deleteLoan);

module.exports = router;
