import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/booksRoute.js';
import { connectDB, disconnectDB } from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5000;




app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/books', bookRoutes);

// Routes go here
// import bookRoutes from './routes/books.js';
// app.use('/api/books', bookRoutes);

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
