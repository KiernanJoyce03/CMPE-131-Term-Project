import express from 'express';
import { searchBooks } from '../controller/bookController';

const router = express.Router();

router.get('/search', searchBooks);

export default router;