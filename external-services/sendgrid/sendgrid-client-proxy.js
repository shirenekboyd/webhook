const sendGridClient = require('@sendgrid/client');
sendGridClient.setApiKey(process.env.SENDGRID_API_KEY);

const API_VERSION = '/v3';

const sendGridProxy = {
    request: function request(options) {
        options.url = `${API_VERSION}${options.url}`;

        return sendGridClient.request(options);
    }
}

module.exports = sendGridProxy;
