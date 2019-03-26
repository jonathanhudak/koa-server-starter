const { Model } = require("objection");
const Todo = require("./Todo");

export default class Category extends Model {
  static tableName = "categories";

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 }
      }
    };
  }

  static relationMappings = {
    todos: {
      relation: Model.ManyToManyRelation,
      modelClass: Todo,
      join: {
        from: "categories.id",
        through: {
          from: "todos_categories.category_id",
          to: "todos_categories.todo_id"
        },
        to: "todos.id"
      }
    }
  };
}
