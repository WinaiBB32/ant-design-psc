const db = require("../config/db");

const LoanModel = {
    getAll: (callback) => {
        db.query("SELECT * FROM loans", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM loans WHERE id = ?", [id], callback);
    },

    add: (data, callback) => {
        const { user_id, equipment_id, borrow_date, return_date, approved_by, status } = data;
        db.query(
            "INSERT INTO loans (user_id, equipment_id, borrow_date, return_date, approved_by, status) VALUES (?, ?, ?, ?, ?, ?)",
            [user_id, equipment_id, borrow_date, return_date, approved_by, status],
            callback
        );
    },

    update: (id, data, callback) => {
        const { user_id, equipment_id, borrow_date, return_date, approved_by, status } = data;
        db.query(
            "UPDATE loans SET user_id=?, equipment_id=?, borrow_date=?, return_date=?, approved_by=?, status=? WHERE id=?",
            [user_id, equipment_id, borrow_date, return_date, approved_by, status, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query("DELETE FROM loans WHERE id = ?", [id], callback);
    }
};

module.exports = LoanModel;
