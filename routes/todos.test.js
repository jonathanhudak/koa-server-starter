import request from "supertest";
import { server, knex } from "../server.js";

require("events").EventEmitter.defaultMaxListeners = 15;

let app;

beforeAll(() => {
  app = request(server);
});

beforeEach(() => knex.migrate.latest());

afterEach(() => knex.migrate.rollback());

afterAll(() => {
  app = undefined;
});

test("Route GET /todos", async () => {
  await app
    .get("/todos")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect(res => {
      expect(Array.isArray(res.body)).toBeTruthy();
    });
});

test("Route GET /todos/:id", async () => {
  await app.post("/todos").send({ name: "foo" });
  await app
    .get("/todos/1")
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);
});

test("Route POST /todos", async () => {
  const todo = { name: "Meditate" };
  await app
    .post("/todos")
    .send(todo)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect(new RegExp(todo.name));
});

test("Route POST /todos/:id", async () => {
  const { body: todo } = await app.post("/todos").send({ name: "foo" });

  await app
    .post(`/todos/${todo.id}`)
    .send({ name: "bar" })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200)
    .expect(/bar/);
});

test("Route DELETE /todos/:id", async () => {
  const todo = { name: "foo" };
  const { body: savedTodo } = await app.post("/todos").send(todo);

  await app.get("/todos").expect(({ body: todos }) => {
    expect(todos[0]).toHaveProperty("name", todo.name);
  });

  await app.delete(`/todos/${savedTodo.id}`).expect(200);

  await app.get("/todos").expect(({ body: todos }) => {
    expect(todos).toEqual([]);
  });
});
