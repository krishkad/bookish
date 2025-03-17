import { Router } from "express";
import { getBooks, userLogin, userSignup } from "../../controllers/user/userAuth.js";
import { verifyOrigin } from "../../middlewares/auth.js";
import { getCartDetails, toggleCartItems } from "../../controllers/user/cartController.js";
const route = Router();

//USER-AUTH ROUTES
route.post('/signup' , userSignup);

route.post('/login', userLogin);


// USER-OTHERS
route.get('/books' , verifyOrigin, getBooks)


// USER-CART MANAGEMENT
route.put('/toggle_cart/:id', verifyOrigin , toggleCartItems);

route.get('/cart_items' , verifyOrigin , getCartDetails);


export default route;