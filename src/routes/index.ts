import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', (_: Request, res: Response) => {
    res.status(200).json({
        message: 'Get index main route'
    });
});

export default router;
