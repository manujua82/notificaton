const https = require('https');
const admin = require('firebase-admin');
const appConfig = require('../models/appConfig');


// TODO: Need to dynamically generate this.
// const tmpXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><toast><visual><binding template=\"ToastText01\"><text id=\"1\">Test message</text></binding></visual></toast>"

const messageType = {
    FAVORITE: 'Favorite',
    FOLLOWING: 'Following',
}

function createTemplateMessage(options) {
    const { message, imageUrl}  = options;

    return `
    <?xml version=\"1.0\" encoding=\"utf-8\"?>
    <toast>
        <visual>
            <binding template=\"ToastText01\">
            <text>${message}</text>
                <image placement="appLogoOverride" src="${imageUrl}"/>
            </binding>
        </visual>
    </toast>`;
}

function getToastMessage(type){
    switch (type) {
        case messageType.FAVORITE:
            return createTemplateMessage({
                message: "Favorite team is doing something", 
                imageUrl: "https://www.mlbstatic.com/team-logos/115.svg"     
            });
        case messageType.FOLLOWING:
            return createTemplateMessage({
                message: "Following team is doing something", 
                imageUrl: "https://www.mlbstatic.com/team-logos/136.svg"     
            });
        default:
            return createTemplateMessage({
                message: "something awesome is happening", 
                imageUrl: ""     
            });
    }
}

export function sendPushNotification(channelUri, bearerToken, type = "") {
    // TODO: dynamically create and format. (This is low priority for the demo 'Nice to have').
    console.log(channelUri);
    console.log(bearerToken);
    const data = getToastMessage(type);
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