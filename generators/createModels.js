const express = require("express");
const { generateModel } = require("./generateModel");
const knex = require("../knexInstance");
const schemaInspector = require("knex-schema-inspector").default;

const inspector = schemaInspector(knex);
const dataTypes = (type) => {
  /*
   * Possible types in database
   * ================
   * varchar    bigint    longtext
   * datetime    int    tinyint
   * decimal    double    tinytext
   * text    timestamp    date
   * mediumtext    float    smallint
   * char    enum    blob
   * longblob    set
   *
   * Types available in json schema
   * string    number    object
   * array    boolean    null
   * integer    any
   *
   */
  switch (type) {
    case "boolean":
      return "boolean";
    case "array":
      return "array";
    case "varchar":
    case "longtext":
    case "tinytext":
    case "text":
    case "mediumtext":
    case "char":
      return "string";
    case "date":
      return "date";
    case "datetime":
      return "date-time";
    case "bigint":
    case "int":
    case "tinyint":
    case "smallint":
    case "timestamp":
      return "integer";
    case "decimal":
    case "double":
    case "float":
      return "number";
    default:
      return "any";
  }
};
/*
TODO: MAKE SURE THAT DELETIONS WORK PROPERLY IN THE STATIC CLASS FUNCTIONS

TODO: defintely have to REFACTOR CODE
TODO: ENSURE THAT DATA CAN BE INSERTED WITH MULTIPLE DIFFERENT TABLES

*/
function is_userField(col) {
  return !(
    (col.is_primary_key === true && col.is_generated === true) ||
    col.data_type === "datetime"
  );
}
function is_generated(col) {
  return col.is_generated || col.data_type === "datetime";
}
async function main() {
  const table = await inspector.tableInfo("columns");

  const columns = await inspector.columnInfo(table.name);

  const formattedCols = columns.map((item) => {
    const orig = {
      name: item.name,
      table: item.table,
      type: dataTypes(item.data_type),
      user_field: is_userField(item),
      is_generated: is_generated(item),

      default_value: item.default_value ? item.default_value : false,
      is_foreign_key: Boolean(item.foreign_key_column),
      required: item.is_nullable === false,
      nullable: item.is_nullable,
    };

    return orig;
  });

  generateModel(table.name, formattedCols);

  knex.destroy();
}
main();
