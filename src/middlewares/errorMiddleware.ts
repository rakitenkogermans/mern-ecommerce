import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';
import { StatusCodes } from '../constants/statusCodes';

const notFound = (req: Request, res: Response) => {
    // const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).send(`Not Found - ${req.originalUrl}`);
    // next(error);
};

const errorHandler = (
    err: Error.ValidationError | ErrorRequestHandler | MongoError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const defaultError = {
        // @ts-ignore
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        // @ts-ignore
        msg: err.message || 'Something went wrong, try again later',
    };
    if (err.name === 'ValidationError' && err instanceof Error.ValidationError) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        defaultError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(', ');
    }
    if ((err as MongoError).code === 11000 && err instanceof MongoError) {
        defaultError.statusCode = StatusCodes.BAD_REQUEST;
        // @ts-ignore
        defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
    }
    res.status(defaultError.statusCode).json({ message: defaultError.msg });
};

// const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode);
//     res.json({
//         message: err.message,
//         stack: process.env.NODE_ENV === 'production' ? null : err.stack,
//     });
// };

export { notFound, errorHandler };
