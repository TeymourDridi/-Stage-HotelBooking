const express = require("express");
const { login, register,verify,logout } = require("../controllers/auth.js");
const upload = require("../utils/uploadFileMulter");
const app = express();
const router = express.Router();


router.post("/register",upload.any(),register)
router.post("/login", login)
router.delete("/logout", logout)
router.get("/verify/:id/:token", verify)

module.exports = router;

