module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "koa_server_starter"
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  test: {
    client: "postgresql",
    connection: {
      database: "koa_server_starter_test"
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
