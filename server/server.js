import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB, disconnectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes go here
// import bookRoutes from './routes/books.js';
// app.use('/api/books', bookRoutes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
