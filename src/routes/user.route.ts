import express, { Router } from 'express';
import * as userController from '../controllers/user.controller';
// import { checkAuth } from '../middleware/check-auth.middleware';
import { check } from 'express-validator';
import cors from 'cors';

const router: Router = express.Router();

// router.get('/', checkAuth, getAllUsers);
// router.get('/', checkAuth, userController.getAllUsers);
router.get('/', cors(), userController.getAllUsers);

router.post(
    '/register',
    [check('email').isEmail(), check('password').isLength({ min: 8 })],
    userController.signup
);

export default router;
