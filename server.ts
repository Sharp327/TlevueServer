import express, { Application, Request, Response } from 'express';
import dbConnect from './utils/dbConnect';
import deluxeRoutes from './routes/deluxes';
import checkoutRoutes from './routes/checkout';
import menuRoutes from './routes/menu';
import aromaticRoutes from './routes/aromatics';
import steadingRoutes from './routes/steadings';
import userRoutes from './routes/users';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadDir = path.join(__dirname, 'uploads');
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

const app: Application = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   console.log("running");
//   res.send('home!');
// })
app.get('/api/test', (req, res) => {
  console.log("api/test")
  res.send('CORS is working on subdomain!');
});
// Connect to database
dbConnect();


app.post('/api/upload', upload.single('file'), (req: Request, res: Response) => {
  if (req.file) {
      res.json({ url: `/uploads/${req.file.filename}` });
  } else {
      res.status(400).json({ error: 'File upload failed' });
  }
});

app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/deluxe', deluxeRoutes);
app.use('/api/aromatic', aromaticRoutes);
app.use('/api/steading', steadingRoutes);
app.use('/api/webhook', checkoutRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/auth', userRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});