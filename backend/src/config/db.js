// db.js - ไฟล์สำหรับการเชื่อมต่อฐานข้อมูลและสร้างตาราง
const mysql = require("mysql2");
require("dotenv").config();

// สร้างการเชื่อมต่อกับฐานข้อมูล MySQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'equipment_management',
    connectTimeout: 30000
});

// เชื่อมต่อกับฐานข้อมูล
connection.connect((err) => {
    if (err) {
        console.error("การเชื่อมต่อฐานข้อมูลล้มเหลว: " + err.message);
        return;
    }
    console.log("เชื่อมต่อกับ MySQL server สำเร็จ");
    createTables();
});

// ฟังก์ชันสำหรับสร้างตารางทั้งหมด
const createTables = () => {
    const queries = [
        `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            phone VARCHAR(20),
            role ENUM('admin', 'staff', 'user') NOT NULL DEFAULT 'user',
            department VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS equipment_categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_name VARCHAR(100) UNIQUE NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL
        );`,

        `CREATE TABLE IF NOT EXISTS equipment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            category_id INT NOT NULL,
            unique_code VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(100) NOT NULL,
            status ENUM('available', 'borrowed', 'maintenance', 'damaged', 'lost') DEFAULT 'available',
            purchase_date DATE,
            price DECIMAL(10,2),
            storage_location VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (category_id) REFERENCES equipment_categories(id) ON DELETE CASCADE
        );`,

        `CREATE TABLE IF NOT EXISTS loans (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            equipment_id INT NOT NULL,
            borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expected_return_date TIMESTAMP NOT NULL,
            return_date TIMESTAMP NULL,
            approved_by INT,
            status ENUM('pending', 'approved', 'borrowed', 'returned', 'overdue', 'cancelled') DEFAULT 'pending',
            notes TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE,
            FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL
        );`,

        `CREATE TABLE IF NOT EXISTS maintenance_records (
            id INT AUTO_INCREMENT PRIMARY KEY,
            equipment_id INT NOT NULL,
            maintenance_date DATE NOT NULL,
            type ENUM('routine', 'repair', 'inspection') NOT NULL,
            description TEXT,
            cost DECIMAL(10,2),
            operator VARCHAR(100),
            next_scheduled_maintenance DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE
        );`,

        `CREATE TABLE IF NOT EXISTS notifications (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            type ENUM('info', 'warning', 'alert', 'reminder') DEFAULT 'info',
            is_read BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NULL DEFAULT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`,

        `CREATE TABLE IF NOT EXISTS activity_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            action_type VARCHAR(50) NOT NULL,
            action_description TEXT NOT NULL,
            entity_type VARCHAR(50),
            entity_id INT,
            ip_address VARCHAR(45),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
        );`
    ];

    let completedQueries = 0;
    queries.forEach((query, index) => {
        connection.query(query, (err) => {
            completedQueries++;
            if (err) {
                console.error(`Error creating table ${index + 1}: ${err.message}`);
            } else {
                console.log(`Table ${index + 1} created successfully`);
            }
            if (completedQueries === queries.length) {
                console.log("All tables are checked and ready.");
            }
        });
    });
};

const closeConnection = () => {
    return new Promise((resolve, reject) => {
        connection.end(err => {
            if (err) {
                console.error('Error closing database connection: ', err);
                reject(err);
                return;
            }
            console.log('Database connection closed successfully');
            resolve();
        });
    });
};

module.exports = {
    connection,
    closeConnection
};
