const sendGrid = require('../sendgrid-client-proxy');

function upsertContact(contact) {
    return upsertContacts([contact], contact.list_ids);
}

function upsertContacts(contacts, listIDs) {
    return sendGrid.request({
        method: 'PUT',
        url: '/marketing/contacts',
        body: {
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
    }).then((result) => {
        if (!result) {
            return;
        } else {
            const body = result[1];

            return body.result[email].contact;
        }
    });
}

module.exports = {
    upsertContact,
    getContactByEmail
};
