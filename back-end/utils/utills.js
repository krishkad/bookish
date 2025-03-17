import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

export const encodePassword = async (password) => {

    const saltValue = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password , saltValue);

    return encryptedPassword;
}


export const comparePassword = async (plainPassword , hashedPassword) => {

    const result = await bcrypt.compare(plainPassword , hashedPassword );

    return result;
}


export const generateToken = async (payload) => {

    const token = jwt.sign(payload , secretKey , {expiresIn : '2h'});

    return token;
}