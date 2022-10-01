import express, { Express, Request, Response } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './db/connect';
import { productsRouter } from './routes/productsRoutes';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import { userRouter } from './routes/userRoutes';
import { orderRouter } from './routes/orderRoutes';
import { uploadRouter } from './routes/uploadRoutes';
import path from 'path';
import * as fs from 'fs';

config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT || 5000;
const app: Express = express();

app.use(
    morgan('common', {
        stream: fs.createWriteStream(path.resolve(__dirname, 'access.log'), {
            flags: 'a',
        }),
    })
);

if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productsRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client/build')));
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
}

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL || '');
        app.listen(PORT, () => console.log(`App is listening on port: ${PORT}`));
    } catch (err) {
        console.log(err);
    }
};

start();
