const express = require("express");
const moment = require("moment");
const router = express.Router();

const usersList = [];

router.route("/time").get((req, res) => {
  const curTime = {
    time: moment().format("LT"),
  };

  res.send(JSON.stringify(curTime));
});

router
  .route("/users")
  .get((req, res) => {
    res.send(JSON.stringify(usersList));
  })
  .post((req, res) => {
    const { username, password, gender, agree } = req.body;

    if (typeof username !== "string") {
      throw new Error("Invalid username");
    }
    if (typeof password !== "string") {
      throw new Error("Invalid password");
    }
    if (typeof gender !== "string") {
      throw new Error("Invalid gender");
    }
    if (typeof agree !== "boolean") {
      throw new Error("Invalid agree");
    }

    const user = {
      username,
      gender,
      agree,
      password,
    };

    usersList.push(user);

    res.send(JSON.stringify(usersList));
  });

module.exports = router;
