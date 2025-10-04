import express from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// <-- Add logging middleware here
app.use((req, res, next) => {
    console.log('--- Request Start ---');
    console.log('Time:', new Date().toISOString());
    console.log('Method:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('Query Params:', req.query);
    console.log('--- Request End ---\n');
    next();
});

app.get('/', (req, res) => {
    res.send('api is running');
});

import router from './routes.js';
app.use('/todos', router);

const PORT = process.env.PORT || 8000;

connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
