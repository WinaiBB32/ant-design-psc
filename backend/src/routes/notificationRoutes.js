const express = require("express");
const router = express.Router();
const { getAllNotifications, getNotificationById, addNotification, markNotificationAsRead, deleteNotification } = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/authMiddleware");

// ดึงรายการแจ้งเตือนทั้งหมด
router.get("/", verifyToken, getAllNotifications);

// ดึงแจ้งเตือนตาม ID
router.get("/:id", verifyToken, getNotificationById);

// เพิ่มแจ้งเตือนใหม่
router.post("/", verifyToken, addNotification);

// อัปเดตสถานะการอ่านแจ้งเตือน
router.put("/:id/read", verifyToken, markNotificationAsRead);

// ลบแจ้งเตือน
router.delete("/:id", verifyToken, deleteNotification);

module.exports = router;
