const express = require("express");
const app = express();
const port = 3000;
const crypto = require("crypto");
const sharp = require("sharp");
var router = express.Router();
const fs = require("fs-extra");
const router2 = express.Router();
const axios = require("axios").default;
const streamifier = require("streamifier");
var _ = require("lodash");
const ploptest = require("./plop/ploptest");

const path = require("path");
const knex = require("./knexInstance");
const Images = require("./models/image/image").model;

async function buildColumns(columns, table) {
  const formatted = generateTypes(columns);
  const types = [];
  const relations = formatted.filter((item) => {
    console.log(item);
    if (item.type === "relation") {
      return;
    }
    types.push(item);
  });

  buildTableActual(types, relations, table);
}
async function buildTableActual(types, relations, table) {
  console.log(relations);
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
        related_to: "images",
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
function chainRelations(table) {}
function chainType(table) {}
async function createTable(tableName, columns) {
  await knex.schema.createTable(tableName, (table) => {
    buildColumns(table, columns);
  });
}
function generateRelation(attribute) {
  switch (attribute.relation) {
    case "HasOneRelation":
      return {
        relation: "HasOneRelation",
      };
    case "HasManyRelation":
      return {
        relation: "HasManyRelation",
      };
    default:
      return {
        relation: "",
      };
  }
}
module.exports = {
  buildColumns,
  generateTypes,
  createTable,
};
