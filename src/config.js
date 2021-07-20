const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
};