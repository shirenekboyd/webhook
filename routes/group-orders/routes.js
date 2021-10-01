async function routes(fastify, options){
    fastify.post('/subscribe-to-availability', async function(request, reply) {
         return {email: request.body.email, productSKU: request.body.productSKU};
    });
}

module.exports = routes;
