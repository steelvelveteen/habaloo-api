import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import indexRouter from './routes/index';
import userRouter from './routes/user.route';
import loginRouter from './routes/login.route';
import accountRouter from './routes/account.route';

export const app: Express = express();
// export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/** Imported routes */

app.use(morgan('dev'));
app.use('/', indexRouter); // This is here for testing alone
app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/accounts', accountRouter);

/** Error handling */
interface ResponseError extends Error {
    status?: number; /** So I can add the status property to the Error object. */
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

