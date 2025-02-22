const jwt = require("jsonwebtoken");
const db = require("../config/db");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function login(req, res) {
    const { username, password } = req.body;

    try {
        console.log("🔍 [LOGIN ATTEMPT]:", username);

        const [users] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
        
        console.log("✅ [DB QUERY SUCCESS]:", users);

        if (users.length === 0) {
            console.log("❌ [LOGIN ERROR]: ไม่พบชื่อผู้ใช้");
            return res.status(401).json({ message: "ไม่พบชื่อผู้ใช้งานนี้" });
        }

        const user = users[0];

        console.log("🔑 [PASSWORD CHECK]:", user.password);

        if (!bcrypt.compareSync(password, user.password)) {
            console.log("❌ [LOGIN ERROR]: รหัสผ่านไม่ถูกต้อง");
            return res.status(401).json({ message: "รหัสผ่านไม่ถูกต้อง" });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" });

        console.log("✅ [LOGIN SUCCESS]:", user.username);
        res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
        console.error("❌ [LOGIN ERROR]:", error);
        res.status(500).json({ message: "เกิดข้อผิดพลาดในระบบ", error: error.message });
    }
}

module.exports = { login };
