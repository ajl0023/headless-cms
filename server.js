require("dotenv").config();

const express = require("express");
const app = express();

var router = express.Router();

const knex = require("./knexInstance");
const router2 = express.Router();
const router3 = express.Router();
const cors = require("cors");

const schemaInspector = require("knex-schema-inspector").default;

const inspector = schemaInspector(knex);

const { Model } = require("objection");

Model.knex(knex);

require("./db-routes")(router3);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/api", router);
require("./routes/tables/routes")(router, null);
app.use("/static", express.static("public"));

app.use(router2);

app.use("/db", router3);
const server = app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
