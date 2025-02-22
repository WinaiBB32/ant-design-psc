const db = require("../config/db");

const UserModel = {
    getAll: (callback) => {
        db.query("SELECT id, username, name, email, phone, role, department FROM users", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT id, username, name, email, phone, role, department FROM users WHERE id = ?", [id], callback);
    },

    add: (data, callback) => {
        const { username, password, name, email, phone, role, department } = data;
        db.query(
            "INSERT INTO users (username, password, name, email, phone, role, department) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [username, password, name, email, phone, role, department],
            callback
        );
    },

    update: (id, data, callback) => {
        const { username, name, email, phone, role, department } = data;
        db.query(
            "UPDATE users SET username=?, name=?, email=?, phone=?, role=?, department=? WHERE id=?",
            [username, name, email, phone, role, department, id],
            callback
        );
    },

    delete: (id, callback) => {
        db.query("DELETE FROM users WHERE id = ?", [id], callback);
    }
};

module.exports = UserModel;
