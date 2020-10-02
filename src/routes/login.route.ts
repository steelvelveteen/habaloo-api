import express, { Router } from 'express';
import * as loginController from '../controllers/login.controller';

const router: Router = express.Router();

router.post('/', loginController.login);

export default router;