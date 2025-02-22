const db = require("../config/db");

const NotificationModel = {
    getAll: (callback) => {
        db.query("SELECT * FROM notifications", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM notifications WHERE id = ?", [id], callback);
    },

    add: (data, callback) => {
        const { user_id, message, is_read } = data;
        db.query(
            "INSERT INTO notifications (user_id, message, is_read) VALUES (?, ?, ?)",
            [user_id, message, is_read || false],
            callback
        );
    },

    markAsRead: (id, callback) => {
        db.query("UPDATE notifications SET is_read = true WHERE id = ?", [id], callback);
    },

    delete: (id, callback) => {
        db.query("DELETE FROM notifications WHERE id = ?", [id], callback);
    }
};

module.exports = NotificationModel;
