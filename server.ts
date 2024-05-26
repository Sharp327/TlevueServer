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

dotenv.config();

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

// Routes
app.use('/api/deluxe', deluxeRoutes);
app.use('/api/aromatic', aromaticRoutes);
app.use('/api/steading', steadingRoutes);
app.use('/api/webhook', checkoutRoutes);
app.use('/api', menuRoutes);
app.use('/api/auth', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});