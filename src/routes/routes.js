import path from 'path';
import { roboxTest, notification, sendNotification, updateUserPrefrences, getUserPrefrences } from '../controller/testController';

export function routes(app) {
    app.route('/').get(function(req,res){
        console.log(`__dirname: ${__dirname}`);
        res.sendFile(path.join(__dirname+'/UI/index.html'));
    });

    app.route('/test')
    .get(roboxTest)

    app.route('/sendNotification')
    .post(sendNotification);

    app.route('/notification')
    .post(notification);

    app.route('/updateUserSettings')
    .post(updateUserPrefrences);

    app.route('/getUserSettings')
    .get(getUserPrefrences);
}
