import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { Request, Response } from 'express';

const login = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            const token = generateToken(req.body.email);
            res.status(202).json({
                message: 'Login successful',
                token
            })
        } else {
            res.status(401).json({
                message: 'Unauthorized. Username or email is wrong.'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'There was a problem logging in. Try again later.',
            error
        })
    }
}

const generateToken = (useremail: string) => {
    const KEY = process.env.ACCESS_TOKEN_SECRET
    try {
        const token = jwt.sign(useremail, KEY as Secret);

        return token;
    } catch (error) {
        console.log(`Failed to generate token${error}`);

        return error;
    }
};

export { login };