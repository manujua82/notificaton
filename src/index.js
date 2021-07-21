import 'babel-polyfill'
import express, { response } from 'express';
import { routes } from './routes/routes';
import { getWNSBearerToken } from './services/wnsService';
import path from 'path';
import cors from 'cors';
const admin = require('firebase-admin');
const dotenv = require('dotenv');
const appConfig = require('./models/appConfig');

dotenv.config();
const app = express();
const serviceAccount = JSON.parse(process.env.GOOGLE_FIRESTORE);
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());

routes(app);

// app.set("port", port)
app.listen( port, '0.0.0.0', () => {
    console.log(`your server is running on port ${port}`);
    // initializeFirebase();
});


function initializeFirebase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();

    db.collection('settings').doc('applicationSettings').get().then(value => {
        if (!appConfig.channelUri) {
            appConfig.channelUri = value.data().channelUri;
        }

        appConfig.clientId = value.data().clientId;
        appConfig.clientSecret = value.data().clientSecret;
        console.log(appConfig.channelUri);
        getWNSBearerToken();
    });
}