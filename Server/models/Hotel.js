const mongoose  = require("mongoose");
const { Schema } = mongoose;
const HotelSchema = new mongoose.Schema({

    name :{
        type:String,
    },
    city:{
        type: String,
    },
    email:{
        type: String,
    },
    address: {
        type: String,
       // required: true,
    },
    photos: {
        type: [String],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },

    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],


})
module.exports = mongoose.model("Hotel", HotelSchema)
