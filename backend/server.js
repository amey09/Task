import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import express from "express";
import candidateRoutes from "./routes/candidateRoutes.js";
import cors from "cors";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/candidates', candidateRoutes)

app.get('/', (req, res) => {
    res.send('API is running....');
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));