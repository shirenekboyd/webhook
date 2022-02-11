const path = require("path");;
const autoload = require('fastify-autoload');
const cors = require("fastify-cors");
const fastify = require("fastify")({
  logger: true
});


fastify.route({
  method: 'POST',
  url: '/olark',
  schema: {
    response: {
      200: {
        type: 'string'
      }
    }
  },
  
  handler: async (request, reply) => {
    /* your code here */
    return 'pizza time!'
  }
})

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
