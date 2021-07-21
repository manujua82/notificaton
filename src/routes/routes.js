import { roboxTest, notification, sendNotification, updateUserPrefrences, getUserPrefrences } from '../controller/testController';

export function routes(app) {
    app.route('/test')
    .get(roboxTest)

    app.route('/sendnotification')
    .post(sendNotification);

    app.route('/notification')
    .post(notification);

    app.route('/updateUserSettings')
    .post(updateUserPrefrences);

    app.route('/getUserSettings')
    .get(getUserPrefrences);
}
