require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes"); // ✅ ต้องเพิ่มบรรทัดนี้
const equipmentRoutes = require("./routes/equipmentRoutes"); // ✅ ต้องมี
const categoryRoutes = require("./routes/categoryRoutes"); // ✅ เพิ่มบรรทัดนี้
const borrowRoutes = require("./routes/borrowRoutes");
const returnRoutes = require("./routes/returnRoutes");
const loanRoutes = require("./routes/loanRoutes"); // ✅ เชื่อมต่อเส้นทางใหม่


const app = express();
const PORT = process.env.PORT || 3307;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ รองรับ x-www-form-urlencoded


// ใช้งาน API Login
app.use("/api/auth", authRoutes);
// ✅ ใช้งาน API จัดการผู้ใช้
app.use("/api", userRoutes); // ✅ ตรวจสอบว่าใช้ "/api" ไม่ใช่ "/users"

// ✅ ใช้งาน API
app.use("/api", equipmentRoutes);
app.use("/api", loanRoutes); // ✅ ตรวจสอบว่าถูกใช้กับ "/api"
const borrowRoute = require("./routes/borrowRoutes");
app.use("/api", borrowRoute); // ✅ ตรวจสอบว่า middleware ถูกใช้ที่เส้นทาง API ที่ถูกต้อง
app.use("/api/return", returnRoutes);


// ✅ ใช้งาน API หมวดหมู่
app.use("/api/categories", categoryRoutes);

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`🔑 SECRET_KEY: ${process.env.SECRET_KEY ? "Loaded" : "Not Found"}`);
});
