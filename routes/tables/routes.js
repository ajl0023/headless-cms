const { Model } = require("objection");

const Entity_Type = require("../../models/entity_type/entity_type").model;
const { randomUUID } = require("crypto");
const knex = require("../../knexInstance");
const {
  buildColumns,
  createTable,
  getTypes,

  addToEntities,
} = require("../../utils");

module.exports = (router) => {
  router.post("/tables", async (req, res) => {
    const req_body = req.body;

    try {
      await buildColumns(req_body.columns, req_body.table_name);
      await addToEntities(req_body.table_name);
      res.json({});
    } catch (error) {}
  });
};
