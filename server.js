
const path = require("path");

const fastify = require("fastify")({
  logger: true
});

fastify.register(require("fastify-formbody"));

fastify.register(require("fastify-cors"), {
  origin: /^.*?\.silashop\.(com|co\.il)$/
});

fastify.get("/hello", function(request, reply) {
  reply.send({ hello: 'world' });
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
