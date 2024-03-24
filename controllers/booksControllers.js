import { Book } from "../models/bookModel.js"

//creating a new book doc
export const createBook=async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Must fill all the fields" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message })
    }
}

export const getAllBooks=async (req, res) => {
    try {
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books,
        });

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message })
    }
}

export const getBookbyId = async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id);
        return res.status(200).json(
            book,
        );

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message })
    }
}

export const updateBook = async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({ message: "Must fill all the fields" })
        }
        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).send({ message: 'No book with given id' });
        }
        return res.status(200).json({
            message: "Book created",
            data: result,
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);
        return res.status(200).json({message:"deleted successfully",
    data:result})

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message })
    }
}

