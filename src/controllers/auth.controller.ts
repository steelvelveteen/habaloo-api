import User from '../models/user.model';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
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
                user_id: user._id,
                email: user.email,
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

const signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422).json({
            error: errors.array()
        });

        return;
    }

    try {
        if (await validateEmailExists(req.body.email)) {
            res.status(409).json({
                message: 'Email already exists'
            });
        } else {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hashedPassword
            });

            const result = await user.save();
            res.status(201).json({
                message: 'User successfully created',
                user: {
                    user_id: result._id,
                    email: result.email,
                    // password: result.password
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'User could not be created',
            error
        });
    }
};


const validateEmailExists = async (useremail: string) => {
    let user = null;
    user = await User.findOne({ email: useremail }).exec();

    return user;
};

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

export { login, signup };