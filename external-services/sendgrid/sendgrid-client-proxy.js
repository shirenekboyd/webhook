const sendGridClient = require('@sendgrid/client');
const httpSync = require('http-sync');
sendGridClient.setApiKey(process.env.SENDGRID_API_KEY);

const API_VERSION = 'v3';

const sendGridProxy = {
    request: function request(options) {
      
      options.url = `${API_VERSION}/${options.url}`;

      return sendGridClient.request(options).catch((error) => {
          console.log(error);
      });
    },
    requestSync: function requestSync(options) {
      const path = `${API_VERSION}/${options.url}`;
      
      var request = httpSync.request({
          method: options.method,
          headers: {
            Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
          },
          body: options.body,
          protocol: 'https',
          host: 'api.sendgrid.com',
          port: 80, //443 if protocol = https
          path
      });

      var timedout = false;
      request.setTimeout(10, function() {
          console.log("Request Timedout!");
          timedout = true;
      });
      var response = request.end();

      if (!timedout) {
          console.log(response);
          console.log(response.body.toString());
      }
    }
};

module.exports = sendGridProxy;
