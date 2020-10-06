import Account from '../models/account.model';
import User from '../models/user.model';

// import mongoose from 'mongoose';
import { Request, Response } from 'express';

const createaccount = async (req: Request, res: Response) => {
    const user = await getUserByEmail(req.body.email);
    console.log(user);
    const account = new Account({
        email: req.body.email,
        username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country
    });
    console.log('Account: ' + account);

    const result = await account.save();
    res.status(201).json({
        message: 'Account successfully created.',
        userAccount: {
            email: result.email,
            username: result.username,
            firstname: result.firstname,
            lastname: result.lastname,
            country: result.country
        }
    });
}

const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ email: email });
    return user;
}

export { createaccount };