import 'babel-polyfill'
import express, { response } from 'express';
import { routes } from './routes/routes';
import { getWNSBearerToken } from './services/wnsService';
import path from 'path';
import cors from 'cors';
const admin = require('firebase-admin');
// TODO store in env variable.
const serviceAccount = require('D:/Projects/Work/hackathon/notificaton/src/robox-8fa7c-4a8bb587e43c.json')
const appConfig = require('./models/appConfig');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(cors());

routes(app);

// app.set("port", port)
app.listen( port, '0.0.0.0', () => {
    console.log(`your server is running on port ${port}`);
    // getWNSBearerToken();
});

initializeFirebase();


function initializeFirebase() {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = admin.firestore();

    // test:
    const docRef = db.collection('settings').doc('applicationSettings');

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