import Cart from '../../models/cart.js';
import Book from '../../models/books.js'

/*
    path: 'api/user/toggle_cart/:id'
    method: 'PUT'
*/
export const toggleCartItems = async (req, res) => {
    try {
        console.log('inside toggle cart')
        const bookId = req.params.id;
        const {_id} = req.user;

        let existingCart = await Cart.findOne({userRef: _id});


        if(!existingCart) {
            existingCart = new Cart({
                userRef: _id,
                items: []
            });
        }

        const existingBooksIndex = existingCart.items.findIndex((item) => item.bookId.toString() === bookId);

        if(existingBooksIndex !== -1) {

            const book = await Book.findById(bookId);
            if(book) {
                existingCart.total = (existingCart.total || 0) - parseInt(book.price);
            }
            existingCart.items.splice(existingBooksIndex , 1);

        } else {

            const book = await Book.findById(bookId);
            console.log('the finded book' , book)
            if(book) {
                existingCart.items.push({bookId});
                existingCart.total = (existingCart.total || 0) + parseInt(book.price);
            }
        }

        await existingCart.save();

        if(existingBooksIndex !== -1) {
            return res.status(200).json({message: `Item Removed From cart`})
        } else {

            return res.status(200).json({message: 'Item Added to Cart'})
        }

    } catch (error) {
        return res.status(500).json({error: 'Server error'});
    }
}


/*
    path: 'api/user/cart_items'
    method: 'GET'
*/
export const getCartDetails = async (req, res) => {
    try {
        
        const {_id} = req.user;

        const cart = await Cart.findOne({userRef: _id}).populate('items.bookId').exec();
        if(!cart){
            res.status(404).json({error: 'not cart found'});
        }

        return res.status(200).json({message: 'success', cart});


    } catch (error) {
        return res.status(500).json({error: 'Server error'});
    }
}

