const db = require("../config/db");

const MaintenanceModel = {
    getAll: (callback) => {
        db.query("SELECT * FROM maintenance_records", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM maintenance_records WHERE id = ?", [id], callback);
    },

    add: (data, callback) => {
        const { equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance } = data;
        db.query(
            "INSERT INTO maintenance_records (equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance],
            callback
        );
    },

    update: (id, data, callback) => {
        const { equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance } = data;
        db.query(
            "UPDATE maintenance_records SET equipment_id=?, maintenance_date=?, type=?, description=?, cost=?, operator=?, next_scheduled_maintenance=? WHERE id=?",
            [equipment_id, maintenance_date, type, description, cost, operator, next_scheduled_maintenance, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query("DELETE FROM maintenance_records WHERE id = ?", [id], callback);
    }
};

module.exports = MaintenanceModel;
