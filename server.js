//added the npm axios package
const axios = require("axios");

const fastify = require("fastify")({
  logger: true,
});

//allows the use of curl
fastify.register(require("fastify-formbody"));

//validation for missing properties edge cases
function hasInvalidProperties(body) {
  let data = body.data;
  if (!data) return "Missing data parameter. ";
  console.log(typeof (data.items, data));
  data = JSON.parse(body.data);

  if (!Array.isArray(data.items))
    return "Expecting items key in data and for items to be an array. ";

  if (!data.visitor) return "Expecting visitor key in data. ";
  const visitorProp = ["emailAddress", "phoneNumber", "city"];
  const errorMess = visitorProp.reduce((accum, prop) => {
    if (data.visitor[prop] === undefined) {
      console.log(data.visitor[prop]);
      accum += `Expecting ${prop} key in visitor. `;
    } else if (typeof data.visitor[prop] !== "string") {
      accum += `Expecting ${prop} key in visitor to be a string. `;
    }
    return accum;
  }, "");
  return errorMess;
}

fastify.route({
  method: "POST",
  url: "/olark",
  handler: async function (request, reply) {
    /* your code here */

    const errors = hasInvalidProperties(request.body);
    if (errors) {
      return { errors, integrationUrl: undefined };
    }

    const reqData = JSON.parse(request.body.data);

    const messageHasPizza = reqData.items.some((message) =>
      message.body.includes("pizza")
    );

    const userInNewYorkCity = reqData.visitor.city.includes("New York");

    if (userInNewYorkCity && messageHasPizza) {
      const { emailAddress, phoneNumber } = reqData.visitor;
      const pizzaOrder = {
        email: emailAddress,
        phone: phoneNumber,
        "pizza-size": "small",
        topping: "cheese",
      };

      //WebHook API request for a pizza delivery ONLY when the if statement, if (userInNewYorkCity && messageHasPizza), is truthy; else the handler will return 'satus: "no pizza"'
      return axios
        .post("https://young-robust-angolatitan.glitch.me/olark", pizzaOrder)
        .then(() => ({ status: "pizza", integrationUrl: undefined }))
        .catch(() => ({
          status: "Pizza server down try again later",
          integrationUrl: undefined,
        }));
    }
    return { status: "no pizza", integrationUrl: undefined };
  },
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
