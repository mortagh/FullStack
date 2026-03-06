import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movies';
import userRoutes from './routes/users';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { errorHandler } from './middlewares/errorHandler';
import { logHandler } from './middlewares/logHandler';


dotenv.config();
connectDB();

const app = express()
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Middleware de logging
app.use(logHandler);

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