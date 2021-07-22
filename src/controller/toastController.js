const https = require('https');
const admin = require('firebase-admin');
const appConfig = require('../models/appConfig');


// TODO: Need to dynamically generate this.
const tmpXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><toast><visual><binding template=\"ToastText01\"><text id=\"1\">Test message</text></binding></visual></toast>"

const messageType = {
    FAVORITE: 'Favorite',
    FOLLOWING: 'Following',
}

function createTemplateMessage(options) {
    const { message, time, imageUrl}  = options;
    return `<?xml version=\"1.0\" encoding=\"utf-8\"?><toast duration=\"long\"><visual><binding template=\"ToastGeneric\"><text id=\"1\">${message}</text><text>${time}</text><image placement=\"appLogoOverride\" src=\"${imageUrl}\"/></binding></visual></toast>`;
}

function getToastMessage(type){
    switch (type) {
        case messageType.FAVORITE:
            return createTemplateMessage({
                message: "The Rockies Game is About to Start!", 
                time: "11:00 PM",
                imageUrl: "https://cd-images.mlbstatic.com/common/team-logos/fhd/76/light/115.png"     
            });
        case messageType.FOLLOWING:
            return createTemplateMessage({
                message: "Following team is doing something", 
                imageUrl: "https://cd-images.mlbstatic.com/common/team-logos/fhd/76/light/136.png"     
            });
        default:
            return createTemplateMessage({
                message: "Big Inning is About to Start!", 
                time: "7:00 PM"
            });
    }
}

export function sendPushNotification(channelUri, bearerToken, type = "") {
    // TODO: dynamically create and format. (This is low priority for the demo 'Nice to have').
    console.log(channelUri);
    console.log(bearerToken);
    const data = getToastMessage(type);
    console.log(data);
    const notificationType = 'wns/toast';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'text/xml',
            'Content-Length': data.length,
            'X-WNS-Type': notificationType,
            'Authorization': bearerToken
        }
    };

    const request = https.request(channelUri, options, (res) => {
        console.log('WNS Status Code: ', res.statusCode);
    });

    request.on('error', (e) => {
        console.error(e);
    });

    request.write(data);

    request.end();
}