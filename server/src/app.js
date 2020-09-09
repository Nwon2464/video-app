const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const api = require("./api");

const app = express();
// app.use(express.static("public"))
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("👏👏👏👏👏👏 Mongo DB Atlas has been connected! 👏👏👏👏👏👏");
});

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

app.use("/api/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
