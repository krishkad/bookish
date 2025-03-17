import { Router } from "express";
import { adminLogin } from "../../controllers/admin/adminAuth.js";
import { addBook, getBooks, getSingleBook, removeBook, updateBookDetails } from "../../controllers/admin/bookController.js";
import { verifyOrigin } from "../../middlewares/auth.js";
const route = Router();

//ADMIN_AUTH
route.post('/login', adminLogin);


//BOOK-MANAGEMENT
route.post('/add_book' , verifyOrigin ,  addBook);

route.get('/books', verifyOrigin , getBooks);

route.delete('/delete_book/:id' , verifyOrigin , removeBook);

route.put('/edit_book/:id' , verifyOrigin , updateBookDetails);

route.get('/book/:id' , verifyOrigin , getSingleBook);

export default route;