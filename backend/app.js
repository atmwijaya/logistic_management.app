import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import katalogRoutes from './routes/katalogRoute.js';
import { errorHandler } from './middleware/errorHandler.js';


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

await connectDB();

app.use(cors({

}));

//routes
app.use('/api/katalog', katalogRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Katalog API is running!',
    version: '1.0.0'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID tidak valid'
    });
  }

  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', ')
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.use(errorHandler);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

export default app;