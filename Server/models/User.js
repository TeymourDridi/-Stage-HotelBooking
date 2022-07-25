const mongoose  = require("mongoose");
const Joi  = require("joi");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      /*required: true,
      unique: true,*/
    },
    country: {
      type: String,
      /*required: true,*/
    },
    img: {
      type: String,
    },
    city: {
      type: String,
    //  required: true,
    },
    phone: {
      type: String,
     // required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
      verified: {
          type: Boolean,
          default: false,
      },
  },
  { timestamps: true }
);

//export default mongoose.model("User", UserSchema);

const User =  mongoose.model("User", UserSchema);

const validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password:Joi.string().min(3).max(255).required(),
        isAdmin : Joi.optional(),
    });
    return schema.validate(user);
};

module.exports = {
    User,
    validate,
};
