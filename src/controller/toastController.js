const https = require('https');

// TODO: Need to dynamically generate this.
const tmpXml = "<?xml version=\"1.0\" encoding=\"utf - 8\"?><toast><visual><binding template=\"ToastText01\"><text id=\"1\">Test message</text></binding></visual></toast>"

export function sendPushNotification(channelUri, bearerToken) {
    // TODO: dynamically create and format. (This is low priority for the demo 'Nice to have').
    console.log(channelUri);
    console.log(bearerToken);
    const data = tmpXml;
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