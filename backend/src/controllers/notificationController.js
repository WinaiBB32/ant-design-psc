const db = require("../config/db");

// ดึงรายการแจ้งเตือนทั้งหมด
exports.getAllNotifications = (req, res) => {
    const sql = "SELECT * FROM notifications";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ดึงแจ้งเตือนตาม ID
exports.getNotificationById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM notifications WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Notification not found" });
        res.json(results[0]);
    });
};

// เพิ่มแจ้งเตือนใหม่
exports.addNotification = (req, res) => {
    const { user_id, message, is_read } = req.body;
    const sql = "INSERT INTO notifications (user_id, message, is_read) VALUES (?, ?, ?)";
    
    db.query(sql, [user_id, message, is_read || false], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Notification added successfully" });
    });
};

// อัปเดตสถานะการอ่านแจ้งเตือน
exports.markNotificationAsRead = (req, res) => {
    const { id } = req.params;
    const sql = "UPDATE notifications SET is_read = true WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Notification marked as read" });
    });
};

// ลบแจ้งเตือน
exports.deleteNotification = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM notifications WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Notification deleted successfully" });
    });
};
