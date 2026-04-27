import express from 'express';
import { searchBooks, getBooksBySubject, getTrending } from '../controller/bookController.js';

const router = express.Router();

router.get('/search', searchBooks);               // ?q=harry+potter&sort=rating&language=eng
router.get('/subject/:subject', getBooksBySubject); // /subject/fantasy?limit=20
router.get('/trending', getTrending);              // popular fiction

export default router;
