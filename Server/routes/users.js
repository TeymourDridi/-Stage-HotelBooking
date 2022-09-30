const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user.js");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();
const sendEmail = require("../utils/email");
const Token = require("../models/token");
const { User, validate } = require("../models/User");
//const {cryptoRandomString} = import("crypto-random-string");
//const {nanoid}  = import( "nanoid");
const bcrypt = require("bcryptjs");






//UPDATE
router.put("/:id", verifyAdmin, updateUser);

//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })




module.exports = router;
