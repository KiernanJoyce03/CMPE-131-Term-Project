import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import bookRoutes from './routes/booksRoute.js';
import authRoutes from './routes/authRoute.js';
import shelfRoutes from './routes/shelfRoute.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { connectDB, disconnectDB } from './config/db.js';

await connectDB();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL]
  : ['http://localhost:5173'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check — Railway pings this to confirm the app is up
app.get('/health', (_req, res) => res.status(200).json({ status: 'ok' }));

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shelf', shelfRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'), (err) => {
      if (err) {
        console.error('Failed to send index.html:', err);
        res.status(500).send('Server error');
      }
    });
  });
} else {
  app.use(notFound);
  app.use(errorHandler);
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
