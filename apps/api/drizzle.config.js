"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// 🌸 Load environment variables (so we can use PG_URL safely)
dotenv_1.default.config();
// ⚙️ Drizzle configuration — database setup starts here ✨
exports.default = {
    dialect: "postgresql", // 
    schema: "./src/models/index.ts",
    out: "./drizzle", // 📦 Folder where migrations will be generated
    dbCredentials: { url: process.env.PG_URL }
};
//# sourceMappingURL=drizzle.config.js.map