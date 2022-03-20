const knex = require("./knexInstance");

module.exports = (router, inspector) => {
  router.post("/create_new_table", async (req, res) => {
    await knex.schema.createTable("pages", function (table) {
      table.string("page");
      table.string("content_type");
      table.string("uid", 40).defaultTo(knex.raw("(UUID())")).primary();
      table
        .dateTime("created_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP"));

      table
        .dateTime("updated_at")
        .notNullable()
        .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
    });
    res.json("finished");
  });
  router.post("/entity_type", async (req, res) => {
    await knex("entity_type").insert({
      name: req.body.type,
      has_media: true,
    });
    res.json("finished");
  });
  router.post("/add_col", async (req, res) => {
    await knex.schema.alterTable("category_master", (table) => {
      table.foreign("6").references("entity_type.uid");
    });
    res.json("finished");
  });
  router.post("/add_col_all", async (req, res) => {
    await addColToAll();
    res.json("finished");
  });
  router.get("/all", async (req, res) => {
    const Model = require("./models/category_master/category_master").model;

    const data = await Model.query();
    for (const item of data) {
      await knex(item.category).insert({
        label: item.label,
        parentId: item.uid,
      });
    }
    res.json("finshed");
  });
  router.delete("/delete", async (req, res) => {
    await deleteAll();
    res.json("deleted");
  });
};
