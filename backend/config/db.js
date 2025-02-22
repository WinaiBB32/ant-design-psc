const mysql = require("mysql2");

// 🔹 กำหนดค่าการเชื่อมต่อฐานข้อมูล
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // แก้ไขให้ตรงกับ MySQL ของคุณ
    password: "", // แก้ไขให้ตรงกับ MySQL ของคุณ
    database: "psc", // ใช้ชื่อฐานข้อมูลของคุณ
});




// 🔹 เชื่อมต่อฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed!", err);
        return;
    }
    console.log("✅ เชื่อมต่อ  MySQL Database!");

    // ✅ ตรวจสอบและสร้างตาราง `users` อัตโนมัติ
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(50) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            role ENUM('admin', 'staff', 'user') NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(createUsersTable, (err, result) => {
        if (err) {
            console.error("❌ Error creating users table:", err);
        } else {
            console.log("✅ Users table is ready!");
        }
    });
});

 // ✅ ตรวจสอบและสร้างตาราง `equipment` อัตโนมัติ
 const createEquipmentTable = `
 CREATE TABLE IF NOT EXISTS equipment (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     category VARCHAR(255),
     location VARCHAR(255),
     quantity INT NOT NULL DEFAULT 0,
     image_url TEXT,
     status ENUM('available', 'borrowed', 'maintenance', 'damaged', 'lost') DEFAULT 'available'
 )
`;
db.query(createEquipmentTable, (err) => {
 if (err) {
     console.error("❌ Error creating equipment table:", err);
 } else {
     console.log("✅ Equipment table is ready!");
 }
});

 // ✅ ตรวจสอบและสร้างตาราง `loans` อัตโนมัติ
 const createLoansTable = `
 CREATE TABLE IF NOT EXISTS loans (
     id INT AUTO_INCREMENT PRIMARY KEY,
     user_id INT NOT NULL,
     equipment_id INT NOT NULL,
     quantity INT NOT NULL,
     borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     return_date TIMESTAMP NULL,
     status ENUM('borrowed', 'returned') NOT NULL DEFAULT 'borrowed',
     FOREIGN KEY (user_id) REFERENCES users(id),
     FOREIGN KEY (equipment_id) REFERENCES equipment(id)
 )
`;
db.query(createLoansTable, (err) => {
 if (err) {
     console.error("❌ Error creating loans table:", err);
 } else {
     console.log("✅ Loans table is ready!");
 }
});



// 🔹 เชื่อมต่อฐานข้อมูล
db.connect((err) => {
    if (err) {
        console.error("❌ Database Connection Failed!", err);
        return;
    }
    console.log("✅ Connected to MySQL Database!");

    // ✅ ตรวจสอบและสร้างตาราง `categories` อัตโนมัติ
    const createCategoriesTable = `
        CREATE TABLE IF NOT EXISTS categories (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
    db.query(createCategoriesTable, (err) => {
        if (err) {
            console.error("❌ Error creating categories table:", err);
        } else {
            console.log("✅ Categories table is ready!");
        }
    });

    // ✅ ตรวจสอบและสร้างตาราง `loans` อัตโนมัติ
    const createLoansTable = `
    CREATE TABLE IF NOT EXISTS loans (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        equipment_id INT NOT NULL,
        quantity INT NOT NULL,
        borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        return_date TIMESTAMP NULL,
        status ENUM('borrowed', 'returned') NOT NULL DEFAULT 'borrowed',
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (equipment_id) REFERENCES equipment(id)
    )
`;
    db.query(createLoansTable, (err) => {
        if (err) {
            console.error("❌ Error creating loans table:", err);
        } else {
            console.log("✅ Loans table is ready!");
        }
    });
});





module.exports = db;
