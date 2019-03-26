const { Model } = require("objection");
const Category = require("./Category");

export default class Todo extends Model {
  static tableName = "todos";

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
    categories: {
      relation: Model.ManyToManyRelation,
      modelClass: Category,
      join: {
        from: "todos.id",
        through: {
          from: "todos_categories.todo_id",
          to: "todos_categories.category_id"
        },
        to: "categories.id"
      }
    }
  };
}
