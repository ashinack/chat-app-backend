const express = require("express");
const router = express.Router();
const login = require("../controllers/login.controller");
const user = require("../controllers/user.controller");

router.post("/login", login.login);
router.post("/addUser", user.addUser);

module.exports = router;
