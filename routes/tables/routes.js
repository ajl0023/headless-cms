const { Model } = require("objection");

const Entity_Type = require("../../models/entity_type/entity_type").model;
const { randomUUID } = require("crypto");
const knex = require("../../knexInstance");
const { buildColumns, createTable, getTypes } = require("../../utils");

module.exports = (router) => {
  router.post("/tables", async (req, res) => {
    const req_body = req.body;
    const format_types = buildColumns(req_body.columns, req_body.table_name);

    // createTable(req_body.table_name, columns);
  });
};
