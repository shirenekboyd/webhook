const sendGrid = require('../../external-services/sendgrid');

async function routes(fastify, options) {
    fastify.post('/subscribe-to-availability', async function(request, reply) {
        const email = request.body.email;
        const productSKU = request.body.productSKU;
        const listName = `Group Order Notification - SKU ${productSKU}`;
      console.log('getting contact by email');
        const getContactPromise = sendGrid.getContactByEmail(email);
      console.log('getting list by name');
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
        });
    });
}

module.exports = routes;
