const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

//use middlewaress
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// mongodb connection
const con = require("./db/connection.js");

// using routes
app.use(require("./routes/route"));
app.use("/api/auth", require("./routes/auth"));

con
  .then((db) => {
    // if (!db) return process.exit(1);

    // listen to the http server
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server : ${err}`)
    );
    // error in mondb connection
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
    process.exit(1);
  });
//admin123
