"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnect_1 = __importDefault(require("./utils/dbConnect"));
const deluxes_1 = __importDefault(require("./routes/deluxes"));
const checkout_1 = __importDefault(require("./routes/checkout"));
const menu_1 = __importDefault(require("./routes/menu"));
const aromatics_1 = __importDefault(require("./routes/aromatics"));
const steadings_1 = __importDefault(require("./routes/steadings"));
const users_1 = __importDefault(require("./routes/users"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// app.get("/", (req, res) => {
//   console.log("running");
//   res.send('home!');
// })
app.get('/api/test', (req, res) => {
    // console.log("api/test");
    res.send('CORS is working on subdomain!');
});
// Connect to database
(0, dbConnect_1.default)();
// Routes
app.use('/api/deluxe', deluxes_1.default);
app.use('/api/aromatic', aromatics_1.default);
app.use('/api/steading', steadings_1.default);
app.use('/api/webhook', checkout_1.default);
app.use('/api', menu_1.default);
app.use('/api/auth', users_1.default);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
