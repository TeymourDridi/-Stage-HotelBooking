const mongoose  = require("mongoose");
const { Schema } = mongoose;
const Joi  = require("joi");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
      name: {
      type: String,
      //required: true,

    },
      lastname: {
      type: String,
      //required: true,

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
      gender: {
      type: String,
     // required: true,
    },
    password: {
      type: String,
      required: true,
    },
      birthDate: {
      type: Date,
    },
      rooms: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],

      factures: [{ type: Schema.Types.ObjectId, ref: "Facture" }],

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

module.exports =  mongoose.model("User", UserSchema);

module.exports.validate = (user) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(255).required(),
        email: Joi.string().email().required(),
        password:Joi.string().min(3).max(255).required(),
        isAdmin : Joi.optional(),
        name : Joi.optional(),
        lastname : Joi.optional(),
        city : Joi.optional(),
        country : Joi.optional(),
        phone : Joi.optional(),
        img : Joi.optional(),
        gender : Joi.optional(),
        birthDate : Joi.optional(),
    });
    return schema.validate(user);
};

/*module.exports = {

    validate,
};*/
