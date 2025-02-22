const bcrypt = require("bcryptjs");

const password = "1234"; // เปลี่ยนรหัสที่ต้องการเข้ารหัส
const hashedPassword = bcrypt.hashSync(password, 10);

console.log(`🔒 Plain Password: ${password}`);
console.log(`🔑 Hashed Password: ${hashedPassword}`);
