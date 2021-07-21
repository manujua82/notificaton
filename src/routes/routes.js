import { roboxTest, notification, sendNotification } from '../controller/testController';
import path from 'path';


export function routes(app) {
    app.route('/').get(function(req,res){
        console.log(`__dirname: ${__dirname}`);
        res.sendFile(path.join(__dirname+'/UI/index.html'));
    });

    app.route('/test')
    .get(roboxTest)

    app.route('/sendnotification')
    .post(sendNotification);

    app.route('/notification')
    .post(notification);
}
