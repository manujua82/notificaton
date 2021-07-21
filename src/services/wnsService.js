// Home for all of the Windows Notification Service functions.
const https = require('https');
import appConfig from '../models/appConfig';

export const getWNSBearerToken = () => {
    const grantType = 'client_credentials';
    const clientId = appConfig.clientId;
    const clientSecret = appConfig.clientSecret;
    const scope = 'notify.windows.com'
    var body = `${encodeURIComponent('grant_type')}=${encodeURIComponent(grantType)}&${encodeURIComponent('client_id')}=${encodeURIComponent(clientId)}&${encodeURIComponent('client_secret')}=${encodeURIComponent(clientSecret)}&${encodeURIComponent('scope')}=${encodeURIComponent(scope)}`;
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': body.length
        }
    };

    const request = https.request('https://login.live.com/accesstoken.srf', options, (res) => {
        let responseBody = '';
        res.on('data', (chunk) => responseBody = responseBody + chunk);
        res.on('end', () => {
            console.log(res.statusCode);
            var json = JSON.parse(responseBody);
            appConfig.bearerToken =  `Bearer ${json.access_token}`;
        })
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.write(body);
    request.end();
}