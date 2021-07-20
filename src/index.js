import express from 'express';
import dotenv from 'dotenv';
import { routes } from './routes/routes';
import path from 'path';
import cors from 'cors';

const result = dotenv.config({path: __dirname + '/.env'});
if (result.error) {
    console.log(result.error)
}

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());

routes(app);

app.listen(port, () => {
    console.log(`your server is running on port ${port}`);
});
