import express from 'express';
import { searchBooks, getBooksBySubject, getTrending, getBookById } from '../controller/bookController.js';

const router = express.Router();

router.get('/search', searchBooks);               // ?q=harry+potter&sort=rating&language=eng
router.get('/subject/:subject', getBooksBySubject); // /subject/fantasy?limit=20
router.get('/trending', getTrending);              // popular fiction
router.get('/work/:id', getBookById);              // single book by OL work id

export default router;
