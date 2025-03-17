import express, { urlencoded } from "express";
import cors from 'cors';
import morgan from "morgan";
import connectDB from './database/connection.js';
import mongoSanitize from "express-mongo-sanitize";
import userRoutes from './routes/user/userRoutes.js';
import adminRoutes from './routes/admin/adminRoutes.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(urlencoded({extended : true}));
app.use(mongoSanitize());

app.use('/api/user' , userRoutes);
app.use('/api/admin' , adminRoutes);

connectDB();       //establishing db connection

app.listen(4000 , () => {
    console.log('Server running!')
})