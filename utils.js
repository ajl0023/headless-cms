const express = require("express");
var _ = require("lodash");

const knex = require("./knexInstance");
const Entity_Type = require("./models/entity_type/entity_type").model;

async function buildColumns(columns, table) {
  const formatted = generateTypes(columns);
  const types = [];
  const relations = formatted.filter((item) => {
    if (item.type === "relation") {
      return item;
    }
    types.push(item);
  });

  buildTableActual(types, relations, table);
}
function addDefaults(table) {
  table.uuid("uid").primary().defaultTo(knex.raw("(UUID())"));
  table.timestamps();
  return table;
}
function chainRelations(columns, table) {
  columns.forEach((col) => {
    table.string(col.column_name)["references"](col.related_to + ".uid");
    table = table;
  });
}
function chainTypes(columns, table) {
  columns.forEach((col) => {
    table[col.type](col.column_name);
    table = table;
  });
  return table;
}

async function buildTableActual(types, relations, tableName) {
  await knex.schema.createTable(tableName, (table) => {
    table = addDefaults(table);
    table = chainTypes(types, table);
    chainRelations(relations, table);
  });
}
function generateTypes(columns) {
  const formatted = columns.map((item) => {
    return transformAttribute(item);
  });
  return formatted;
}
function transformAttribute(attribute) {
  switch (attribute.type) {
    case "media": {
      const is_multiple = attribute.options
        .find((option) => {
          return option.target === "type";
        })
        .options.find((option) => {
          return option.target === "multi";
        });
      return {
        type: "relation",
        relation: is_multiple ? "HasOneRelation" : "HasManyRelation",
        column_name: attribute.value,
        related_to: "image",
      };
    }
    default: {
      return {
        type: attribute.type,

        column_name: attribute.value,
      };
    }
  }
}
async function addToEntities(table) {
  const entity = await Entity_Type.query().insert({
    name: table,
    client_name: _.startCase(table),
  });
  return entity;
}
async function addToColumns(table) {
  const entity = await Entity_Type.query().insert({
    name: table,
    client_name: _.startCase(table),
  });
  return entity;
}
module.exports = {
  buildColumns,
  generateTypes,
  addToEntities,
  addToColumns,
  addDefaults,
};
