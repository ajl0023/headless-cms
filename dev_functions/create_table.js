require("dotenv").config();
const knex = require("../knexInstance");
const { addDefaults } = require("../utils");

async function createTable() {
  await knex.schema.createTable("columns", (table) => {
    table = addDefaults(table);
    table.string("name");
    table.string("type");
    table.string("parent").references("entity_type.uid");
  });
  process.exit(0);
}
createTable();
