// Home for all of the Windows Notification Service functions.
const https = require('https');
import appConfig from '../models/appConfig';

export const getWNSBearerToken = () => {
    var data = "grant_type=client_credentials&client_id=ms-app%3a%2f%2fs-1-15-2-1926007383-1756605508-1937101164-2250816023-2719099306-2147706942-778513962&client_secret=3%2bCj3aDeksSvlDgu4SyM8loSv7p84cQT&scope=notify.windows.com";
    
    const grantType = 'client_credentials';
    const clientId = process.env.clientId;
    const clientSecret = process.env.clientSecret;
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
            appConfig.bearerToken = json.access_token;
        })
    });

    request.on('error', (e) => {
        console.error(e);
    });
    request.write(body);
    request.end();
}