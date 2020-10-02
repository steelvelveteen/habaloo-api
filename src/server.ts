import express, { Request, Response } from 'express';
const app = express()
const PORT: string | number = process.env.PORT || 5000;

app.use("*", (_: Request, res: Response) => {
    res.send("<h1>Welcome to your simple server! Awesome right</h1>");
});

app.listen(PORT, () => console.log(`hosting @${PORT}`));