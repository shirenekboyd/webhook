const sendGrid = require('../sendgrid-client-proxy');

function upsertContact(contact) {
    return upsertContacts([contact], contact.list_ids);
}

function upsertContacts(contacts, listIDs) {
    return sendGrid.request({
        method: 'PUT',
        url: '/marketing/contacts',
        data: {
            contacts,
            list_ids: listIDs
        }
    });
}

function getContactByEmail(email) {
    return sendGrid.request({
        method: 'POST',
        url: '/marketing/contacts/search/emails',
        body: {
            emails: [email]
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
    upsertContact,
    getContactByEmail
};
