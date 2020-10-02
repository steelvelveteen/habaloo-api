import User from '../models/user.model';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

const getAllUsers = async (_: Request, res: Response) => {
    try {
        const users = await User.find().select('_id email password').
            exec();

        res.status(200).json({
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json(error);
    }
};

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
                    id: result._id,
                    email: result.email,
                    password: result.password
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



export { getAllUsers, signup };