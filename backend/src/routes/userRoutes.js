const express = require("express");
const router = express.Router();
const { getAllUsers, getUserById, addUser, updateUser, deleteUser } = require("../controllers/userController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// ดึงรายการผู้ใช้ทั้งหมด (เฉพาะ Admin เท่านั้น)
router.get("/", verifyToken, isAdmin, getAllUsers);

// ดึงข้อมูลผู้ใช้ตาม ID (ต้องใช้ Token)
router.get("/:id", verifyToken, getUserById);

// เพิ่มผู้ใช้ใหม่ (เฉพาะ Admin เท่านั้น)
router.post("/", verifyToken, isAdmin, addUser);

// อัปเดตข้อมูลผู้ใช้ (เฉพาะ Admin เท่านั้น)
router.put("/:id", verifyToken, isAdmin, updateUser);

// ลบผู้ใช้ (เฉพาะ Admin เท่านั้น)
router.delete("/:id", verifyToken, isAdmin, deleteUser);

module.exports = router;
