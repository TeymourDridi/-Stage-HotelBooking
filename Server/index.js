const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth.js");
const usersRoute = require("./routes/users.js");
const hotelsRoute = require("./routes/hotels.js");
const roomsRoute = require("./routes/rooms.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express()
dotenv.config()

const connect = async () =>{
    try{
      await mongoose.connect(process.env.MONGO);
     //.log(mongoose.ConnectionStates)
        //console.log(mongoose.connection._hasOpened)
       // console.log(mongoose.connection._readyState)
     if (!mongoose.connection._readyState){
        throw error;
        };
        console.log("Connected to mongoDB");
    }catch (error) {
       // console.log(mongoose.connection._readyState)
        console.log("connexion lost -please connect to the internet");



        //throw error;
    }
};
var reconnectId;

mongoose.connection.on("disconnected",   () => {

    if (reconnectId === undefined) {
        reconnectId = setInterval(  connect, 5000);
    }
    console.log("DB Disconnected");


});
mongoose.connection.on("connected", ()=>{
  //  console.log("42"+reconnectId);
   // console.log(mongoose.ConnectionStates);
    clearInterval(reconnectId);
    reconnectId= undefined;
   // console.log("48"+reconnectId);
    console.log("DB Connected");

});


//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});



app.listen(5000,()=>{
    connect();



})
