
const appConfig = require('../models/appConfig');

export function roboxTest(request, response) {
    response.json({ name: `Juan`, age: './15' });
    console.log(`channelUri: ${appConfig.channelUri}`);
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
