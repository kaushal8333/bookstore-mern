import express  from 'express'
import {createBook,getAllBooks,getBookbyId,updateBook,deleteBook} from "../controllers/booksControllers.js" 
// import { Book } from '../models/bookModel.js';
export const router = express.Router();


router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').put(updateBook).delete(deleteBook).get(getBookbyId)


