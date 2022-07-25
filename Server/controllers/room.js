const Room = require("../models/Room.js");
const Hotel = require("../models/Hotel.js");
const { createError } = require("../utils/error.js");

module.exports.createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

module.exports.updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
module.exports.updateRoomAvailability = async (req, res, next) => {
  try {

    const upHotel = await Hotel.findById(req.params.hotelid);

    const room =await Room.findOne({title : req.body.title,idHotel :req.params.hotelid,available: true})

req.body.available=false;
    if(room===null){
      res.status(301).json("no Room Available.");
    }else {
      await Room.updateOne(
          {"_id": room._id},
          {
            $set: req.body,

          }
      );
      res.status(200).json("Room Reserved.");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports.deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
module.exports.getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
module.exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
};
