import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import bookRoutes from './routes/booksRoute.js';
import authRoutes from './routes/authRoute.js';
import shelfRoutes from './routes/shelfRoute.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { disconnectDB } from './config/db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', PORT);

const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, 'http://localhost:5173']
  : ['http://localhost:5173'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check — just confirms the server is up
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/shelf', shelfRoutes);

// Serve frontend — always try, regardless of NODE_ENV
const distPath = path.join(__dirname, '../dist');
const indexPath = path.join(distPath, 'index.html');

console.log('dist path:', distPath);
console.log('index.html exists:', fs.existsSync(indexPath));

if (fs.existsSync(indexPath)) {
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('sendFile error:', err);
        res.status(500).send('Server error');
      }
    });
  });
} else {
  console.warn('dist/index.html not found — running API only');
  app.use(notFound);
  app.use(errorHandler);
}

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

// Log unhandled rejections but don't crash the server
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
