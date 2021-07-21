
import { sendPushNotification } from './toastController'
const appConfig = require('../models/appConfig');
const admin = require('firebase-admin');
import { createGameStartToastMessage } from '../services/toastService';

export function roboxTest(request, response) {
    response.json({ 
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        channelUri: appConfig.channelUri,
        bearerToken: appConfig.bearerToken,
    });
    console.log(`channelUri: ${appConfig.channelUri}`);
    console.log(`bearerToken: ${appConfig.bearerToken}`);
};

export function notification(request, response){
    let body =  request.body;
    console.log(`body.channelUri: ${body.channelUri}`);
    if (body.channelUri){
        if (appConfig.channelUri !==  body.channelUri) {
            appConfig.channelUri =  body.channelUri
            var db = admin.firestore();
            db.collection('settings').doc('applicationSettings').set({
                channelUri: appConfig.channelUri
            }, {merge: true}).then().catch(e => {
                console.log(e);
            });
        }
        sendPushNotification(appConfig.channelUri, appConfig.bearerToken, body.notificationType);
    }
    return response.json({
        channelUri: appConfig.channelUri
    });
}

export function sendNotification(request, response) {
    let body =  request.body;
    sendPushNotification(appConfig.channelUri, appConfig.bearerToken, body.notificationType);
    return response.json();
}

export function updateUserPrefrences(request, response) {
    let body = request.body;
    console.log(`User Settings: ${body}`);
    if (body) {
        var db = admin.firestore();
        db.collection('settings').doc('userSettings').set(body, {merge: true}).then().catch(e => {
            console.log(e);
            return response.json({
                e
            });
        });
    }

    return response.json();
}

export function getUserPrefrences(request, response)
{
    var db = admin.firestore();
    db.collection('settings').doc('userSettings').get().then(value => {
        console.log(value.data());
        response.json(value.data());
    });
}

// export function sendNotification(request, response) {
//     sendPushNotification(appConfig.channelUri, appConfig.bearerToken);
//     return response.json({
//         channelUri: appConfig.channelUri,
//         token: appConfig.bearerToken
//     });
// }
