import User from '../models/user.model';
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

export { getAllUsers };