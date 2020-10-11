import express, { Router } from 'express';
import * as userController from '../controllers/user.controller';
import * as accountController from '../controllers/account.controller';
import { checkAuth } from '../middleware/check-auth.middleware';
import cors from 'cors';

const router: Router = express.Router();

router.get('/', cors(), checkAuth, userController.getAllUsers);
// router.get('/', cors(), userController.getAllUsers);

router.post('/createaccount', accountController.createaccount);

export default router;
