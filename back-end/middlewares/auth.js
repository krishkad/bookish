import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import User from '../models/users.js';

const secretKey = process.env.SECRET_KEY;

const payload = {
    adminEmail: process.env.ADMIN_EMAIL,
    adminPassword : process.env.ADMIN_PASSWORD,
}

export const verifyOrigin = async (req, res, next) => {
    try {
        
        const authHeader = req.headers['authorization'];

        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.json({error: 'Invlid'});
        }

        const decoded = jwt.verify(token , secretKey);

        if(decoded.adminEmail) {

            if(payload.adminEmail === decoded.adminEmail) {
                req.user = decoded.adminEmail
            }
        } else {

            const user = await User.findById(decoded.userId);

            if(!user) {
                return res.json({error : 'User not found'});
            }
            req.user = user;
        }

        next();
        
    } catch (error) {
        console.log(error);
        return res.statusCode(500).json({error: 'Verification failed'});
    }
}