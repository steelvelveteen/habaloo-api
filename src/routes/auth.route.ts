import express, { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { check } from 'express-validator';

const router: Router = express.Router();

router.post(
    '/signup',
    [
        check('email').isEmail().withMessage('Please enter a valid email'),
        check('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")],
    authController.signup
);

router.post('/login', authController.login);
router.post('/resetPassword', authController.resetPassword);

export default router;
