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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
// Set up storage engine for multer
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path_1.default.join(__dirname, 'uploads');
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
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
    console.log("api/test");
    res.send('CORS is working on subdomain!');
});
// Connect to database
(0, dbConnect_1.default)();
// Routes
app.use('/api/deluxe', deluxes_1.default);
app.use('/api/aromatic', aromatics_1.default);
app.use('/api/steading', steadings_1.default);
app.use('/api/webhook', checkout_1.default);
app.use('/api/menu', menu_1.default);
app.use('/api/auth', users_1.default);
app.post('/api/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        res.json({ url: `/uploads/${req.file.filename}` });
    }
    else {
        res.status(400).json({ error: 'File upload failed' });
    }
});
app.use('/api/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
