const express = require("express");
const router = express.Router();
const { login, register, getUserProfile } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

// เส้นทางเข้าสู่ระบบ
router.post("/login", login);

// เส้นทางลงทะเบียน
router.post("/register", register);

// ดึงข้อมูลผู้ใช้ (ต้องใช้ Token)
router.get("/profile", verifyToken, getUserProfile);

module.exports = router;
