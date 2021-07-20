// Compiles the toast message to send to the user.
const https = require('https');

// TODO: Need to dynamically generate this.
const tmpXml = "<?xml version=\"1.0\" encoding=\"utf-8\"?><toast><visual><binding template=\"ToastText01\"><text id=\"1\">Test message</text></binding></visual></toast>"

// create a toast notification for the user
export const createGameStartToastMessage = (channelUri, bearerToken) => {
    return new Promise(function(resolve, reject) {
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
            var body = [];
            res.on('data', (chunk) => {
                body.push(chunk);
            });

            res.on('end', () => {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch (e) {
                    reject(e);
                }
                resolve(body);
            });
        });
    
        request.on('error', (e) => {
            reject(e);
        });
    
        request.write(data);
    
        request.end();
    });
}