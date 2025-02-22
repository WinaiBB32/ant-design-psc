const db = require("../config/db");

const EquipmentModel = {
    getAll: (callback) => {
        db.query("SELECT * FROM equipment", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM equipment WHERE id = ?", [id], callback);
    },

    add: (data, callback) => {
        const { category_id, unique_code, name, status, purchase_date, price, storage_location } = data;
        db.query(
            "INSERT INTO equipment (category_id, unique_code, name, status, purchase_date, price, storage_location) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [category_id, unique_code, name, status, purchase_date, price, storage_location],
            callback
        );
    },

    update: (id, data, callback) => {
        const { category_id, unique_code, name, status, purchase_date, price, storage_location } = data;
        db.query(
            "UPDATE equipment SET category_id=?, unique_code=?, name=?, status=?, purchase_date=?, price=?, storage_location=? WHERE id=?",
            [category_id, unique_code, name, status, purchase_date, price, storage_location, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query("DELETE FROM equipment WHERE id = ?", [id], callback);
    }
};

module.exports = EquipmentModel;
