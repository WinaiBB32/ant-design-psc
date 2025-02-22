const db = require("../config/db");

// ดึงรายการบำรุงรักษาทั้งหมด
exports.getAllMaintenanceRecords = (req, res) => {
    const sql = "SELECT * FROM maintenance_records";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ดึงข้อมูลการบำรุงรักษาตาม ID
exports.getMaintenanceById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM maintenance_records WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Maintenance record not found" });
        res.json(results[0]);
    });
};

// เพิ่มข้อมูลการบำรุงรักษา
exports.addMaintenanceRecord = (req, res) => {
    const { equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance } = req.body;
    const sql = "INSERT INTO maintenance_records (equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Maintenance record added successfully" });
    });
};

// อัปเดตข้อมูลการบำรุงรักษา
exports.updateMaintenanceRecord = (req, res) => {
    const { id } = req.params;
    const { equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance } = req.body;
    const sql = "UPDATE maintenance_records SET equipment_id=?, maintenance_date=?, type=?, description=?, cost=?, operator=?, next_scheduled_maintenance=? WHERE id=?";
    
    db.query(sql, [equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Maintenance record updated successfully" });
    });
};

// ลบข้อมูลการบำรุงรักษา
exports.deleteMaintenanceRecord = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM maintenance_records WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Maintenance record deleted successfully" });
    });
};
