const express = require("express");
const router = express.Router();
const { getAllEquipment, getEquipmentById, addEquipment, updateEquipment, deleteEquipment } = require("../controllers/equipmentController");
const { verifyToken, isAdminOrStaff } = require("../middleware/authMiddleware");

// ดึงรายการอุปกรณ์ทั้งหมด
router.get("/", verifyToken, getAllEquipment);

// ดึงรายละเอียดอุปกรณ์ตาม ID
router.get("/:id", verifyToken, getEquipmentById);

// เพิ่มอุปกรณ์ใหม่ (เฉพาะ Admin หรือ Staff เท่านั้น)
router.post("/", verifyToken, isAdminOrStaff, addEquipment);

// อัปเดตข้อมูลอุปกรณ์ (เฉพาะ Admin หรือ Staff เท่านั้น)
router.put("/:id", verifyToken, isAdminOrStaff, updateEquipment);

// ลบอุปกรณ์ (เฉพาะ Admin เท่านั้น)
router.delete("/:id", verifyToken, isAdminOrStaff, deleteEquipment);

module.exports = router;
