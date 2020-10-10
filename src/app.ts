import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import indexRouter from './routes/index';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';


export const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Imported routes */
app.use(morgan('dev'));
app.use('/', indexRouter); // This is here for testing alone
app.use('/auth', authRouter); //login and signup
app.use('/user', userRouter); // getall users and create account

/** Error handling */
interface ResponseError extends Error {
    /** So I can add the status property to the Error object. */
    status?: number;
}

app.use((_: Request, res: Response, next: NextFunction) => {
    const error: ResponseError = new Error('Page not found');
    error.status = 404;
    res.status(error.status);
    next(error);
})

app.use((error: ResponseError, _: Request, res: Response) => {
    res.status(error.status || 500);
    res.json({ message: error.message });
})

