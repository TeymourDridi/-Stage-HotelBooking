const express = require("express");
const { login, register,verify } = require("../controllers/auth.js");

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/verify/:id/:token", verify)

module.exports = router;
