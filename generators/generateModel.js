const plop_generateModel = require("../plop/plop_generateModel");

async function generateModel(tableName, columns) {
  const plop_obj = {
    model_name: tableName,
    columns,
  };
  await plop_generateModel(plop_obj);
}
module.exports = {
  generateModel,
};
