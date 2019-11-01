import express from 'express';
import { middlewares } from './middlewares';

const app = express();
const port = 3001;

middlewares(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
