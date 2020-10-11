import { NextFunction, Request, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
require('dotenv/config');

const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {
        // const token = req.headers.authorization?.split(' ')[1];
        const auth = req.headers['authorization'];
        if (auth) {
            const token = auth.split(' ')[1];
            const KEY = process.env.ACCESS_TOKEN_SECRET;
            jwt.verify(token!, KEY as Secret);
        }

    } catch (error) {
        res.status(403).json({
            message: 'Unauthorized',
            error
        });
    }
    next();

};

export { checkAuth };