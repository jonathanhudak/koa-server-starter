async function rootHandler(ctx) {
  const { body } = ctx.request;
  ctx.response.set("Content-Type", "application/json");
  ctx.response.body = body;
}

module.exports = {
  rootHandler
};
