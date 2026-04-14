import express from 'express';
import { searchBooks } from '../controller/bookController.js';

const router = express.Router();

router.get('/search', searchBooks);
router.get('/category', searchBooks);
export default router;