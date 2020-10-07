const express = require("express");
const moment = require("moment");
const router = express.Router();

global.users = [];

router.use("/", (req, res, next) => {
  if (!req.cookies.time) {
    const currentTime = moment().format("LT");

    res.cookie("time", currentTime);
  }

  next();
});

router.route("/").get((req, res) => {
  res.render("home", {
    title: "Home",
    text: "Hello World",
    time: req.cookies.time,
  });
});

router
  .route("/form")
  .get((req, res) => {
    res.render("form", { title: "Form" });
  })
  .post((req, res) => {
    const user = {
      username: req.body.username,
      password: req.body.password,
      gender: req.body.gender,
      agree: req.body.agree ? true : false,
    };

    global.users.push(user);

    res.redirect("/result");
  });

router.route("/result").get((req, res) => {
  res.render("result", {
    title: "Result",
    data: JSON.stringify(global.users),
  });
});

router.route("/myroute/:param").get((req, res) => {
  const param = req.params.param.toUpperCase();

  let title = "";

  switch (param) {
    case "QUERY":
      title = "Query | param";

      break;
    case "HEADER":
      title = "Header | param";

      break;
    case "COOKIE":
      title = "Cookie | param";

      break;
    default:
      res.redirect("/");
  }

  res.render("myroute", { title, text: param });
});

module.exports = router;
