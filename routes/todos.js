import Todo from "../models/Todo";
export default async function todos(ctx) {
  const { body } = ctx.request;
  ctx.response.set("Content-Type", "application/json");
  const todos = await Todo.query();

  ctx.response.body = todos;
}
