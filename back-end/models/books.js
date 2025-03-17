import mongoose from "mongoose";


const bookSchema = mongoose.Schema({

    bookName: {
        type: String,
        reuqired: true
    },

    author: {
        type: String,
        required: true
    },

    bookInfo: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    image: {
        type: String,
    },

    pusblishedBy: {
        type: String
    },

    genre: {
        type: String,
    },

    tags: {
        type: [String]
    }

    
} , {timestamps:true});


const bookModel = mongoose.model('books' , bookSchema);

export default bookModel;