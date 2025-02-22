require("dotenv").config();
const jwt = require("jsonwebtoken");

function authMiddleware(allowedRoles) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            console.error("❌ No token provided");
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("❌ Invalid Token:", err);
                return res.status(403).json({ message: "Forbidden: Invalid token" });
            }

            console.log("📌 Token Verified:", decoded);
            console.log("📌 User Role:", decoded.role);
            console.log("📌 Allowed Roles in Middleware:", allowedRoles);

            if (!Array.isArray(allowedRoles)) {
                console.error("❌ allowedRoles is not an array:", allowedRoles);
                return res.status(500).json({ message: "Internal Server Error: allowedRoles must be an array" });
            }

            // ✅ Debug: ตรวจสอบว่าค่าของ allowedRoles เป็นอาร์เรย์ที่มีค่า admin หรือไม่
            if (allowedRoles.length > 0) {
                console.log("📌 Checking role:", decoded.role);
                console.log("📌 Allowed Roles List:", allowedRoles);
            }

            if (!allowedRoles.includes(decoded.role)) {
                console.error("❌ Forbidden: Insufficient permissions", decoded.role);
                return res.status(403).json({ message: `Forbidden: Insufficient permissions for role ${decoded.role}` });
            }

            req.user = decoded;
            next();
        });
    };
}

module.exports = authMiddleware;
