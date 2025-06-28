const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { aptigen, propetypro } = require("./config/prisma.config");
const paramsquery = require("./config/params.query");
const { verifyToken } = require("./src/helpers/jsonwebtoken");
const serverPort = process.env.SERVER_PORT || 3000;
let faildAttempts = 0;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routers
app.use("/api", paramsquery, verifyToken, require("./src/routers/api.route"));
app.use("/auth", paramsquery, require("./src/routers/auth.route"));
const runServer = async () => {
  try {
    await propetypro.$connect();
    console.log(
      "Connected to propertypro database successfully",
      process.env.MYSQL_PORT
    );
    await aptigen.$connect();
    console.log(
      "Connected to the aptigen database successfully",
      process.env.MYSQL_PORT
    );

    app.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    faildAttempts++;
    console.log(
      "Retrying to connect in 1 minute... with " + faildAttempts + " times"
    );
    setTimeout(runServer, 1000 * 60);
  }
};

runServer();
