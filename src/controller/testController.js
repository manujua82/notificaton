
const appConfig = require('../models/appConfig');

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
        }
    }
    return response.json({
        channelUri: appConfig.channelUri
    });
}
