import { roboxTest, notification, sendNotification } from '../controller/testController';

export function routes(app) {
    app.route('/test')
    .get(roboxTest)

    app.route('/sendnotification')
    .post(sendNotification);

    app.route('/notification')
    .post(notification);
}
