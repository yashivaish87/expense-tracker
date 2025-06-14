const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB connection
const con = require("./db/connection.js");

// Routes
app.use(require("./routes/route"));
app.use("/api/auth", require("./routes/auth"));

// Serve frontend build
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
con
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on("error", (err) =>
      console.log(`Failed To Connect with HTTP Server: ${err}`)
    );
  })
  .catch((error) => {
    console.log(`Connection Failed...! ${error}`);
    process.exit(1);
  });
