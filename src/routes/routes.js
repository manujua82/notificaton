import { roboxTest } from '../controller/testController';

export function routes(app) {
    app.route('/test')
    .get(roboxTest)
}
