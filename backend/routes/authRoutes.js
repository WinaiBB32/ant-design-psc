const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db");
require("dotenv").config(); // ✅ โหลดตัวแปรจาก .env

const router = express.Router();

// ✅ ล็อกอิน
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    console.log("📌 Login Request:", { username, password });

    db.query("SELECT * FROM users WHERE username = ?", [username], async (err, results) => {
        if (err) {
            console.error("❌ Database Error:", err);
            return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
            console.error("❌ No user found with this username");
            return res.status(401).json({ message: "Username or password incorrect" });
        }

        const user = results[0];

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            console.error("❌ Incorrect password for:", username);
            return res.status(401).json({ message: "Username or password incorrect" });
        }

        console.log("✅ User authenticated:", user);

        // ✅ ตรวจสอบว่า SECRET_KEY ถูกต้องหรือไม่
        if (!process.env.SECRET_KEY) {
            console.error("❌ SECRET_KEY is not defined in .env");
            return res.status(500).json({ message: "Internal Server Error: SECRET_KEY is missing" });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, user });
    });
});

module.exports = router;
