const mongoose  = require("mongoose");
const { Schema } = mongoose;
const HotelSchema = new mongoose.Schema({

    name :{
        type:String,
    },
    city:{
        type: String,
    },
    description:{
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
    discount: {
        type: Number,
        min: 0,
        max: 100,
    },
    additional: {
        type: Array,

    },
 minPrice: {
        type: Number,

    },

    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    factures: [{ type: Schema.Types.ObjectId, ref: "Facture" }],


})
module.exports = mongoose.model("Hotel", HotelSchema)
