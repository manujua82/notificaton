import { roboxTest, notification, sendNotification } from '../controller/testController';

export function routes(app) {
    app.route('/test')
    .get(roboxTest)

    app.route('/notification')
    .post(notification);

    app.route('/sendnotification')
    .post(sendNotification);
}
