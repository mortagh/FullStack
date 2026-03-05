const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  const start = new Date();
  const dateIso = start.toISOString();

  res.on('finish', () => {
    const duration = new Date() - start;
    const statusMsg = res.statusMessage ? ` - ${res.statusMessage}` : '';
    console.log(`[${dateIso}] ${req.method} ${req.originalUrl} - ${res.statusCode}${statusMsg} - time: ${duration}ms`);
  });
  next();
});

const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');

app.use('/api/movies', movieRoutes);

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`VAMOS http://localhost:${port}`);
});