const { Model } = require("objection");

const Entity_Type = require("./models/entity_type/entity_type").model;
const { randomUUID } = require("crypto");

const { types } = require("./column-types");

module.exports = (router) => {
  router.get("/tables", async (req, res) => {
    const tables = await Entity_Type.query();

    res.json(tables);
  });
};
