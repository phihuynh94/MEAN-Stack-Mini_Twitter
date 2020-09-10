module.exports = {
    port: process.env.PORT || 3000,
    database: process.env.MONGODB_URI || "mongodb://localhost:27017/MiniTwitterDB",
    jwt_secrect: process.env.JWT_SECRET || "SECRET#123",
    jwt_exp: process.env.JWT_EXP || "2h" 
}