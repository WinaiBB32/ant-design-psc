const db = require("../config/db");

// ดึงรายการอุปกรณ์ทั้งหมด
exports.getAllEquipment = (req, res) => {
    const sql = "SELECT * FROM equipment";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// ดึงรายละเอียดอุปกรณ์ตาม ID
exports.getEquipmentById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM equipment WHERE id = ?";
    db.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Equipment not found" });
        res.json(results[0]);
    });
};

// เพิ่มอุปกรณ์ใหม่
exports.addEquipment = (req, res) => {
    const { category_id, unique_code, name, status, purchase_date, price, storage_location } = req.body;
    const sql = "INSERT INTO equipment (category_id, unique_code, name, status, purchase_date, price, storage_location) VALUES (?, ?, ?, ?, ?, ?, ?)";
    
    db.query(sql, [category_id, unique_code, name, status, purchase_date, price, storage_location], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "Equipment added successfully" });
    });
};

// อัปเดตข้อมูลอุปกรณ์
exports.updateEquipment = (req, res) => {
    const { id } = req.params;
    const { category_id, unique_code, name, status, purchase_date, price, storage_location } = req.body;
    const sql = "UPDATE equipment SET category_id=?, unique_code=?, name=?, status=?, purchase_date=?, price=?, storage_location=? WHERE id=?";
    
    db.query(sql, [category_id, unique_code, name, status, purchase_date, price, storage_location, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Equipment updated successfully" });
    });
};

// ลบอุปกรณ์
exports.deleteEquipment = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM equipment WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Equipment deleted successfully" });
    });
};
