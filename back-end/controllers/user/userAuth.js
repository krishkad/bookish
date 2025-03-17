import User from '../../models/users.js';
import Book from '../../models/books.js'
import { comparePassword, encodePassword, generateToken } from '../../utils/utills.js';


/*
path: '/api/user/signup'
method: POST
*/
export const userSignup = async (req, res, next) => {
    try {
        const{username , email , password} = req.body;

        console.log(req.body);

        const exisitngUser = await User.findOne({email: email});
        if(exisitngUser) {
            return res.status(409).json({error: 'User already Exists'});
        }

        const encryptedPassword = await encodePassword(password);
        await User.create({
            username,
            email,
            password: encryptedPassword
        })

        return res.status(201).json({message: 'Account Created'});

    } catch (error) {
        return res.status(500).json({error: 'Server Error'});
    }
}


/*
path: '/api/user/login'
method: POST
*/
export const userLogin = async (req, res, next) => {
    try {
        const {email , password} = req.body;

        const isExisitngUser = await User.findOne({email: email});

        if(!isExisitngUser) {
            return res.status(404).json({error: 'User not found'});
        }

        const isPasswordCorrect = await comparePassword(password , isExisitngUser?.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({error: 'Password do not match'});
        }

        const payload = {
            username: isExisitngUser?.username,
            userId: isExisitngUser?._id,
            email: isExisitngUser?.email
        }

        const token = await generateToken(payload);
        console.log(token);

        if(!token) {
            return res.status(500).json({error: 'Server error'});
        }

        // res.setHeader('Authorization' , `Bearer ${token}`);
        return res.status(200).json({message: 'Login Successfull, Welcome' , token , payload});

    } catch (error) {
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