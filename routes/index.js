import {
  listTodos,
  createTodo,
  deleteTodo,
  getTodo,
  updateTodo
} from "./todos";

export default async function createApi(router) {
  router
    .get("/todos", listTodos)
    .get("/todos/:id", getTodo)
    .post("/todos", createTodo)
    .post("/todos/:id", updateTodo)
    .delete("/todos/:id", deleteTodo);
}
