const sendGrid = require('../../external-services/sendgrid');

async function routes(fastify, options) {
    fastify.post('/subscribe-to-availability', async function(request, reply) {
        const email = request.body.email;
        const productSKU = request.body.productSKU;
        const listName = `Group Order Notification - SKU ${productSKU}`;
        const getContactPromise = sendGrid.getContactByEmail(email);
        const getListPromise = sendGrid.getListByName(listName).then((list) => {
            return list || sendGrid.createList(listName);
        });

        Promise.all([getContactPromise, getListPromise]).then(([contact, list]) => {
            if (list.id && contact) {
                if (contact.list_ids.find((id) => id === list.id)) {
                    return;
                }
            }

            if (!contact) {
                contact = {
                    email,
                    list_ids: []
                };
            }

            contact.list_ids.push(list.id);
            sendGrid.upsertContact(contact);
        }).catch((reason) => console.log('SendGrid requests failed.', reason));
    });
}

module.exports = routes;
