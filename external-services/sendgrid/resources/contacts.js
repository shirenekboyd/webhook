const sendGrid = require('../sendgrid-client-proxy');

function createContact(email) {
    return sendGrid.request({
        method: ''
    })
}

function getContactByEmail(email) {
    return sendGrid.request({
        method: 'POST',
        url: '/marketing/contacts/search/emails',
        body: {
            email
        }
    }).then(([response, body]) => {
        if (response.statusCode === 404) {
            return;
        } else if (response.statusCode === 200) {
            return body.result[email].contact;
        } else {
            throw new Error('Search Emails request failed!');
        }
    });
}

module.exports = {
    getContactByEmail
}
