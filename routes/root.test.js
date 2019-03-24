const request = require("supertest");
const { server } = require("../server.js");

describe("root route", () => {
  test("Route POST /", async done => {
    const body = { name: "Jonathan" };
    const response = await request(server)
      .post("/")
      .send(body)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect(/Jonathan/)
      .then(function(res, err) {
        if (err) return done(err);
        done();
      });
  });
});
