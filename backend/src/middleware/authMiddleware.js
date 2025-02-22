const jwt = require("jsonwebtoken");

// ตรวจสอบ JWT Token ก่อนเข้าถึง API
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

// ตรวจสอบสิทธิ์ของผู้ใช้ (Admin เท่านั้น)
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
};

// ตรวจสอบสิทธิ์ของผู้ใช้ (Admin หรือ Staff เท่านั้น)
const isAdminOrStaff = (req, res, next) => {
    if (req.user.role !== "admin" && req.user.role !== "staff") {
        return res.status(403).json({ message: "Forbidden: Admins or Staff only" });
    }
    next();
};

module.exports = { verifyToken, isAdmin, isAdminOrStaff };
