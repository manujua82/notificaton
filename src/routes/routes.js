import { roboxTest, notification } from '../controller/testController';

export function routes(app) {
    app.route('/test')
    .get(roboxTest)

    app.route('/notification')
    .post(notification);
}
