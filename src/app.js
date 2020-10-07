const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const { port } = require("./config/env");
const router = require("./routes/router");
const apiEnd = require("./routes/api");

const viewsPath = path.join(__dirname, "views");
const stylesPath = path.join(__dirname, "stylesheets");

const app = express();
app.set("view engine", "pug");
app.set("views", viewsPath);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(stylesPath));

app.use(router);

app.use("/api", apiEnd);

app.use(function (req, res, nex) {
  res.status(404).render("404", { url: req.url });
});

app.listen(port);
