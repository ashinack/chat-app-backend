const express = require("express");
const router = express.Router();
const login = require("../controllers/login.controller");
const user = require("../controllers/cookie.controller");

router.post("/set-cookie", user.setCookie);
router.post("/get-cookie", user.getCookie);

module.exports = router;
