const client = require('@sendgrid/client');
client.setApiKey(process.env.SENDGRID_API_KEY);
const request = {
  method: 'GET',
  url: '/v3/api_keys'
};
client.request(request)
.then(([response, body]) => {
  console.log(response.statusCode);
  console.log(body);
})

async function routes(fastify, options){
    fastify.post('/subscribe-to-availability', async function(request, reply) {
         return {email: request.body.email, productSKU: request.body.productSKU};
    });
}

module.exports = routes;
