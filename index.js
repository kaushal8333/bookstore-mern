import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { createRequire } from 'node:module';
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url);
const app = express();

import { router } from "./routes/booksRoutes.js";
//json middleware for parsing input data
app.use(express.json())

var cors=require('cors');
//cors middleware
app.use(cors())

//server check
app.get('/', (req, res) => {
    res.status(200).send('<h1>Get response</h1>');
})

app.use('/books',router)
app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/dist/index.html'))
})
//connecting to dB using the connection string
mongoose.connect(mongoDBURL)
    .then(() => {
        console.log('Connected to DB');
        app.listen(PORT, () => {
            console.log(`App listening on port:${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })