const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ✅ API ดึงรายการอุปกรณ์ที่สามารถยืมได้
router.get("/equipment", (req, res) => {
    db.query(
        "SELECT id, name, quantity, status, image_url FROM equipment WHERE status = 'available'",
        (err, results) => {
            if (err) {
                console.error("❌ Database Query Error:", err);
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
});

// ✅ API ยืมอุปกรณ์
router.post("/loans/borrow", authMiddleware(["admin", "staff", "user"]), (req, res) => {
    const { userId, equipmentId } = req.body;

    if (!userId || !equipmentId) {
        return res.status(400).json({ message: "❌ ข้อมูลไม่ครบถ้วน" });
    }

    db.query(
        `UPDATE equipment SET quantity = quantity - 1, status = IF(quantity = 1, 'borrowed', 'available') WHERE id = ? AND quantity > 0`,
        [equipmentId],
        (err, result) => {
            if (err) {
                console.error("❌ Database Query Error:", err);
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "❌ อุปกรณ์หมด หรือ ไม่สามารถยืมได้" });
            }

            db.query(
                "INSERT INTO loans (user_id, equipment_id, borrow_date, status) VALUES (?, ?, NOW(), 'borrowed')",
                [userId, equipmentId],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: "✅ ยืมอุปกรณ์สำเร็จ!" });
                }
            );
        }
    );
});

// ✅ API ดึงคำขอยืมที่รออนุมัติ
router.get("/loans/pending", authMiddleware(["admin", "staff"]), (req, res) => {
    const query = `
        SELECT loans.id, equipment.name AS equipment_name, users.username AS borrower_name,
               loans.borrow_date, loans.status
        FROM loans
        JOIN users ON loans.user_id = users.id
        JOIN equipment ON loans.equipment_id = equipment.id
        WHERE loans.status = 'pending'
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("❌ Database Query Error:", err);
            return res.status(500).json({ error: err.message });
        }
        console.log("✅ Query Result:", results); // ✅ Debug Data
        res.json(results);
    });
});


// ✅ API ดึงรายการอุปกรณ์ที่ผู้ใช้ยืมไป (`status = "borrowed"`)
router.get("/loans/borrowed/:userId", authMiddleware(["admin", "staff", "user"]), (req, res) => {
    const { userId } = req.params;

    db.query(
        `SELECT loans.id, equipment.name AS equipment_name, loans.borrow_date, loans.status
         FROM loans 
         JOIN equipment ON loans.equipment_id = equipment.id
         WHERE loans.user_id = ? AND loans.status = 'borrowed'`,
        [userId],
        (err, results) => {
            if (err) {
                console.error("❌ Database Query Error:", err);
                return res.status(500).json({ error: err.message });
            }
            res.json(results);
        }
    );
});

// ✅ API คืนอุปกรณ์ (เปลี่ยน `status` เป็น `"returned"`)
router.put("/loans/return/:loanId", authMiddleware(["admin", "staff", "user"]), (req, res) => {
    const loanId = req.params.id;

    const updateLoanQuery = `
        UPDATE loans 
        SET status = 'returned', return_date = NOW() 
        WHERE id = ?
    `;

    db.query(updateLoanQuery, [loanId], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // ✅ คืนของ → เปลี่ยน equipment เป็น available
        const updateEquipmentQuery = `
            UPDATE equipment 
            SET status = 'available' 
            WHERE id = (SELECT equipment_id FROM loans WHERE id = ?)
        `;

        db.query(updateEquipmentQuery, [loanId], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "✅ อุปกรณ์ถูกคืนแล้ว!" });
        });
    });
});

router.post("/loans/borrow", authMiddleware(["admin", "staff", "user"]), (req, res) => {
    const { userId, equipmentId } = req.body;

    if (!userId || !equipmentId) {
        return res.status(400).json({ message: "❌ ข้อมูลไม่ครบถ้วน" });
    }

    db.query(
        `UPDATE equipment 
         SET quantity = quantity - 1, 
             status = IF(quantity - 1 > 0, 'available', 'borrowed') 
         WHERE id = ? AND quantity > 0`,
        [equipmentId],
        (err, result) => {
            if (err) {
                console.error("❌ Database Query Error:", err);
                return res.status(500).json({ error: err.message });
            }
            if (result.affectedRows === 0) {
                return res.status(400).json({ message: "❌ อุปกรณ์หมด หรือ ไม่สามารถยืมได้" });
            }

            db.query(
                "INSERT INTO loans (user_id, equipment_id, borrow_date, status) VALUES (?, ?, NOW(), 'borrowed')",
                [userId, equipmentId],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });
                    res.json({ message: "✅ ยืมอุปกรณ์สำเร็จ!" });
                }
            );
        }
    );
});

module.exports = router;
