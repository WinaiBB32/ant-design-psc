const express = require("express");
const router = express.Router();
const { getAllMaintenanceRecords, getMaintenanceById, addMaintenanceRecord, updateMaintenanceRecord, deleteMaintenanceRecord } = require("../controllers/maintenanceController");
const { verifyToken, isAdminOrStaff } = require("../middleware/authMiddleware");

// ดึงรายการบำรุงรักษาทั้งหมด
router.get("/", verifyToken, getAllMaintenanceRecords);

// ดึงข้อมูลการบำรุงรักษาตาม ID
router.get("/:id", verifyToken, getMaintenanceById);

// เพิ่มข้อมูลการบำรุงรักษา (เฉพาะ Admin หรือ Staff เท่านั้น)
router.post("/", verifyToken, isAdminOrStaff, addMaintenanceRecord);

// อัปเดตข้อมูลการบำรุงรักษา (เฉพาะ Admin หรือ Staff เท่านั้น)
router.put("/:id", verifyToken, isAdminOrStaff, updateMaintenanceRecord);

// ลบข้อมูลการบำรุงรักษา (เฉพาะ Admin เท่านั้น)
router.delete("/:id", verifyToken, isAdminOrStaff, deleteMaintenanceRecord);

module.exports = router;
