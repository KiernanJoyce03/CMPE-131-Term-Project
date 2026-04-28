import express from 'express'
import { addBookToShelf, removeBookFromShelf, updateShelfEntry, getMyShelf } from '../controller/shelfController.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

// All shelf routes require login
router.use(protect)

router.get('/',            getMyShelf)
router.post('/',           addBookToShelf)
router.patch('/:bookId',   updateShelfEntry)
router.delete('/:bookId',  removeBookFromShelf)

export default router
