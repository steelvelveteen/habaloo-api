import express, { Router } from 'express';
import * as accountController from '../controllers/account.controller';
// import cors from 'cors';

const router: Router = express.Router();

router.post('/createaccount', accountController.createaccount);

export default router;