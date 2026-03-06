import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movies';
import userRoutes from './routes/users';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';


dotenv.config();
connectDB();

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  const start = new Date();
  const dateIso = start.toISOString();

  res.on('finish', () => {
    const duration = new Date().getTime() - start.getTime();
    const statusMsg = res.statusMessage ? ` - ${res.statusMessage}` : '';
    console.log(`[${dateIso}] ${req.method} ${req.originalUrl} - ${res.statusCode}${statusMsg} - time: ${duration}ms`);
  });
  next();
});


app.use('/api/movies', movieRoutes);

app.use('/api/users', userRoutes);

// DEFAULT ROUTE
app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`VAMOS http://localhost:${port}`);
});