import Todo from "../models/Todo";
export async function listTodos(ctx) {
  const { body } = ctx.request;
  ctx.response.set("Content-Type", "application/json");
  const todos = await Todo.query();

  ctx.response.body = todos;
}

export async function getTodo(ctx) {
  const { id } = ctx.params;
  const todo = await Todo.query().findById(id);

  ctx.response.set("Content-Type", "application/json");
  ctx.response.body = todo;
}

export async function createTodo(ctx) {
  const { body } = ctx.request;
  const { name } = body;
  const newTodo = await Todo.query().insert({ name });

  ctx.response.set("Content-Type", "application/json");
  ctx.response.body = newTodo;
}

export async function updateTodo(ctx) {
  const { body } = ctx.request;
  const { id } = ctx.params;
  const { name } = body;
  const update = await Todo.query().updateAndFetchById(id, { name });

  ctx.response.set("Content-Type", "application/json");
  ctx.response.body = update;
}

export async function deleteTodo(ctx) {
  const { id } = ctx.params;
  const rows = await Todo.query().deleteById(id);

  ctx.response.set("Content-Type", "application/json");
  ctx.response.body = { message: `Deleted ${rows} todo` };
}
