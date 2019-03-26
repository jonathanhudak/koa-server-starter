exports.up = knex =>
  knex.schema
    .createTable("todos", table => {
      table.increments("id").primary();
      table.string("name");
    })
    .createTable("categories", table => {
      table.increments("id").primary();
      table.string("name");
    })
    .createTable("todos_categories", table => {
      table.increments("id").primary();
      table.string("category_id");
      table.string("todo_id");
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists("todos")
    .dropTableIfExists("categories")
    .dropTableIfExists("todos_categories");
