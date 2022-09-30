const mongoose  = require("mongoose");
const { Schema } = mongoose;
const FactureSchema = new mongoose.Schema({

    userId :{
        type:String,
    },
     hotelId :{
        type:String,
    },
    name :{
        type:String,
    },
    lastname :{
        type:String,
    },
    hotelName :{
        type:String,
    },
    price :{
            type:Number,
    },
    jours :{
             type:Number,
    },
    situation:{
        type:String,
        default:"En Attente",
    },
    date:{
        type:Date,
        default:new Date(),
    },

    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],


})
module.exports = mongoose.model("Facture", FactureSchema)
