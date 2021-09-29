/**
 * This is the main Node.js server script for your project
 * Check out the two endpoints this back-end API provides in fastify.get and fastify.post below
 */

const path = require("path");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // Set this to true for detailed logging:
  logger: true
});

// ADD FAVORITES ARRAY VARIABLE FROM TODO HERE

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));


fastify.register(require("fastify-cors"), {
  origin: /^.*?\.silashop\.(com|co\.il)$/,
  methods: ["GET"]
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
