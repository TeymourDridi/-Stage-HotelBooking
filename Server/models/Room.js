const mongoose  = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        idHotel: {
            type: String,
            //required: true,
        },
        number: {
            type: Number,
            //required: true,
        },
        title: {
            type: String,
            //required: true,
        },
        price: {
            type: Number,
            //required: true,
        },
        maxPeople: {
            type: Number,
            //required: true,
        },
        checkIn:{
            type: Date,
           // default: null,
        },
        checkOut:{
            type: Date,
            //default: null,

        },
        situation:{
            type:String,
            default: "disponible",
        },




       //
        // roomNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
