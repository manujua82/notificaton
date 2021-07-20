import express from 'express';
import { routes } from './routes/routes';
import { getWNSBearerToken } from './services/wnsService';
import path from 'path';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());

routes(app);

// app.set("port", port)
app.listen( port, '0.0.0.0', () => {
    console.log(`your server is running on port ${port}`);
});

getWNSBearerToken();
