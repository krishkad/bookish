import Book from '../../models/books.js';
import Cart from '../../models/cart.js';


/*
path: '/api/user/add_book'
method: POST
*/
export const addBook = async (req, res) => {
    try {
        
        const {bookName , author, bookInfo, price } = req.body.bookData;
        const imageUrl = req.body.image;
        console.log(imageUrl)

        const exisitngBook = await Book.findOne({bookName: bookName});
        if(exisitngBook) {
            return res.status(409).json({error:'Book already exists'});
        }

        await Book.create({
            bookName,
            bookInfo,
            author,
            price,
            image: imageUrl
        });



        return res.status(201).json({message: `Book: ${bookName}, added successfully`});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server Error'});
    }
}


/*
path: '/api/user/books'
method: GET
*/
export const getBooks = async (req, res) => {
    try {

        const page = req.query.page || 1;
        const limit = req.query.limit || 4;

        const skip = (page - 1) * limit;

        const books = await Book.find().sort({createdAt: -1}).skip(skip).limit(limit);

        const totalBooks = await Book.countDocuments();

        if(books.length === 0) {
            return res.status(404).json({error: 'Books not found'});
        }

        return res.status(200).
        json({message: 'success' , books , currentPage: page , totalPages: Math.ceil(totalBooks / limit)});

    } catch (error) {
        return res.status(500).json({error: 'Server Error'});
    }
}

/*
path: '/api/user/book/:id'
method: GET
*/
export const getSingleBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        console.log(req.params.id , '$$')
        const book = await Book.findById(bookId);

        if(!book) {
            return;
        }

        return res.status(200).json({book});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server Error'});
    }
}


/*
path: '/api/user/edit_book/:id'
method: PUT
*/
export const updateBookDetails = async (req, res, next) => {
    try {
        const {bookName , author , bookInfo , price , image} = req.body;

        const bookId = req.params.id;

        const bookDetails = await Book.findByIdAndUpdate(bookId , {
            bookName,
            bookInfo,
            author,
            price,
            image
        } , {new : true});

        if(!bookDetails) {
            return res.status(404).json({error: 'Data not Found'});
        }

        return res.status(200).json({message: `Updated ${bookName}`});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server Error'});
    }
}



/*
path: '/api/user/delete_book/:id'
method: DELETE
*/
export const removeBook = async (req, res, next) => {
    try {
        const bookId = req.params.id;

        const deletedBook = await Book.findByIdAndDelete(bookId).sort({id : -1});

        if(!deletedBook) {
            return res.status(404).json({error:'No data found'});
        }

        await Cart.updateMany(
            {'items.bookId' : bookId} ,
            {$pull: {items: {bookId: bookId}}}
        )

        return res.status(200).json({message: `Removed ${deletedBook?.bookName}!`});

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: 'Server Error'});
    }
} 