//const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { createError } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");
const Token = require("../models/token");
const User = require("../models/User.js");
const {validate} = require("../models/User.js");

module.exports.register = async (req, res, next) => {
  try {

    const { error } = validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with given email already exist!");



    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    //res.status(200).send("User has been created.");
    let token = await new Token({
      userId: newUser._id,
      token:  bcrypt.genSaltSync(10).replace('/','_').replace('.','t'),//cryptoRandomString({length: 30, type: 'base64'}),
    }).save();

    const message = `${process.env.BASE_URL}/auth/verify/${newUser.id}/${token.token}`;
    console.log(message);
    await sendEmail(newUser.email, "Verify Email", message);

    res.send("An Email sent to your account please verify");
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.login = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({  $or: [ { username: req.body.username  }, { email: req.body.username } ] });

    if (!user) return next(createError(404, "User not found!"));
    if (user.verified===false) return next(createError(307, "Please verify your mail"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {

    next(err);
  }
};

module.exports.verify = async (req, res, next) => {

  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user._id +"  token : "+ req.params.token);
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token ,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.updateOne({ email: user.email, verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }


};
