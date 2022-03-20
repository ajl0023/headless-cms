module.exports = (plop) => {
  plop.setGenerator("controller", {
    prompts: [
      {
        type: "input",
        name: "folderName",
        message: "folder name",
      },
    ],
    description: "application controller logic",

    actions: [
      {
        type: "add",
        path: "models/{{tableName}}/{{tableName}}.js",
        templateFile: "./templates/model.js.hbs",
        force: true,
        transform: (x) => {
          const prettier = require("prettier");
          return prettier.format(x, {
            parser: "babel",
          });
        },
      },
    ],
  });
  plop.setGenerator("route", {
    prompts: [
      {
        type: "input",
        name: "routeDir",
        message: "folder name",
      },
    ],

    actions: [
      {
        type: "add",
        path: "../routes/{{routeDir}}/routes.js",
        templateFile: "./templates/route.js.hbs",
        force: true,
        transform: (x) => {
          const prettier = require("prettier");
          return prettier.format(x, {
            parser: "babel",
          });
        },
      },
    ],
  });
};
