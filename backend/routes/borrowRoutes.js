const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();



// ✅ ยืมอุปกรณ์
router.post("/", authMiddleware(["user", "staff"]), async (req, res) => {
    const borrowItems = req.body;
    const userId = req.user?.userId;

    try {
        await db.promise().query("START TRANSACTION");

        for (const item of borrowItems) {
            await db.promise().query(
                `UPDATE equipment SET quantity = quantity - ? WHERE id = ? AND quantity >= ?`,
                [item.quantity, item.equipmentId, item.quantity]
            );
            await db.promise().query(
                `INSERT INTO loans (user_id, equipment_id, quantity, borrow_date, status) VALUES (?, ?, ?, NOW(), 'pending')`,
                [userId, item.equipmentId, item.quantity]
            );
        }

        await db.promise().query("COMMIT");
        res.json({ message: "ยืมอุปกรณ์สำเร็จ" });
    } catch (error) {
        await db.promise().query("ROLLBACK");
        res.status(500).json({ message: "Error processing borrow request" });
    }
});

// ✅ แสดงอุปกรณ์ที่ยืมอยู่
router.get("/my-loans", authMiddleware(["user", "staff"]), async (req, res) => {
    const userId = req.user?.userId;
    const [loans] = await db.promise().query(
        `SELECT l.id, e.name, l.quantity, l.borrow_date, l.equipment_id
         FROM loans l
         JOIN equipment e ON l.equipment_id = e.id
         WHERE l.user_id = ? AND l.status = 'borrowed'`,
        [userId]
    );
    res.json(loans);
});

// ✅ คืนอุปกรณ์
router.post("/return/:id", authMiddleware(["user", "staff"]), async (req, res) => {
    const loanId = req.params.id;

    await db.promise().query(
        `UPDATE loans SET status = 'returned' WHERE id = ?`,
        [loanId]
    );

    await db.promise().query(
        `UPDATE equipment SET quantity = quantity + (SELECT quantity FROM loans WHERE id = ?) WHERE id = (SELECT equipment_id FROM loans WHERE id = ?)`,
        [loanId, loanId]
    );

    res.json({ message: "คืนอุปกรณ์สำเร็จ" });
});



const allowedRoles = ["user", "staff", "admin"];
console.log("📌 Allowed Roles in borrowRoutes:", allowedRoles);

router.post("/borrow", authMiddleware(allowedRoles), (req, res) => {
    console.log("📌 borrowRoutes: User accessing API");

    const { userId, equipmentId } = req.body;

    if (!userId) {
        return res.status(400).json({ message: "❌ ไม่พบ userId กรุณาเข้าสู่ระบบใหม่" });
    }

    db.query(
        "INSERT INTO loans (user_id, equipment_id, borrow_date, status) VALUES (?, ?, NOW(), 'borrowed')",
        [userId, equipmentId],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "✅ ยืมอุปกรณ์สำเร็จ!" });
        }
    );
});


module.exports = router;
