const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { prisma } = require("./config/prisma.config");
const serverPort = process.env.SERVER_PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routers
app.use("/api/client", require("./src/routers/client"));
app.use("/api/admin", require("./src/routers/admin"));
runServer = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database with prisma client");
    app.listen(serverPort, () => {
      console.log(`Server is running on port ${serverPort}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

runServer();
