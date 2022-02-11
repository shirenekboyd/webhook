const fastify = require("fastify")({
  logger: true
});
fastify.register(require('fastify-formbody'))


fastify.route({
  method: 'POST',
  url: '/olark',
  handler: function (request, reply) {
    /* your code here */
    return 'pizza time!';
  }
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
