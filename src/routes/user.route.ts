import express, { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as loginController from '../controllers/login.controller';
import * as accountController from '../controllers/account.controller';
import { checkAuth } from '../middleware/check-auth.middleware';
import { check } from 'express-validator';
import cors from 'cors';

const router: Router = express.Router();

router.get('/', cors(), checkAuth, userController.getAllUsers);
// router.get('/', cors(), userController.getAllUsers);

router.post(
    '/signup',
    [
        check('email').isEmail().withMessage('Please enter a valid email'),
        check('password').isLength({ min: 8 }).withMessage("Password must be at least 8 characters long.")],
    userController.signup
);

router.post('/login', loginController.login);
router.post('/createaccount', accountController.createaccount);

export default router;
