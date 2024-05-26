"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    console.log("running");
    res.send('home!');
});
app.get('/api/test', (req, res) => {
    console.log("api/test");
    res.send('CORS is working on subdomain!');
});
// Connect to database
// dbConnect();
// Routes
// app.use('/api/deluxe', deluxeRoutes);
// app.use('/api/aromatic', aromaticRoutes);
// app.use('/api/steading', steadingRoutes);
// app.use('/api/webhook', checkoutRoutes);
// app.use('/api', menuRoutes);
// app.use('/api/auth', userRoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
