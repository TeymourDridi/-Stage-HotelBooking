const Room = require("../models/Room.js");
const User = require("../models/User.js");
const Hotel = require("../models/Hotel.js");
const Facture = require("../models/Facture.js");
const { createError } = require("../utils/error.js");
const {sendEmailHotel} = require("../utils/email");

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
module.exports.confirmRoom = async (req, res, next) => {
  try {
    if(req.params.response==="oui"){
      const facture = await Facture.findById(req.params.factureId);
      await Facture.updateOne(
          {"_id": req.params.factureId},
      {
        $set: {
          situation: "confirmed"
        }

      }
      );
      res.status(200).json("confirmed");
    }else{

      await Facture.updateOne(
          {"_id": req.params.factureId},
          {
            $set: {
              situation: "deny"
            }

          }
      );
      res.status(201).json("deny");
    }
  } catch (err) {

  }
};

module.exports.updateRoomAvailability = async (req, res, next) => {
  try {

    const hotel = await Hotel.findById(req.params.hotelid);
    const user = await User.findById(req.params.userId);

    let rooms=[];
    let rooms2=[];
    let nrooms=0;
    let oneNight=0;

    for(let k=0 ;k<req.body.title.length;k++) {
      rooms.push(await Room.find({title: req.body.title[k], idHotel: req.params.hotelid, situation: "disponible"}).limit(req.body.number[k]));
      nrooms+=req.body.number[k];
    }




    if(nrooms!==rooms.length+1){

      res.status(200).json("no Room Available");
    }else {


      rooms.map(async (m) => {
            console.log(m.length);
            for (let k = 0; k < m.length; k++) {
              oneNight += m[k].price;
              rooms2.push(m[k]);
              await Room.updateOne(
                  {"_id": m[k]._id},
                  {
                    $set: {
                      situation: "en attente",
                      checkIn: req.body.checkIn,
                      checkOut: req.body.checkOut,

                    }

                  }
              );
            }
          }
      )

      const t2 = new Date(req.body.checkOut).getTime();
      const t1 = new Date(req.body.checkIn).getTime();
      const Days = (((t2 - t1) / (1000 * 60 * 60 * 24)) % 7)

      const facture = new Facture({
        userId: user._id,
        hotelId: hotel._id,
        jours: Days,
        price: oneNight * Days,
        rooms: rooms2
      })
      await facture.save();

      const message1 = `${process.env.BASE_URL}/rooms/oui/${facture._id}`;
      const message2 = `${process.env.BASE_URL}/rooms/non/${facture._id}`;
      console.log(hotel.email);
      await sendEmailHotel(hotel.email, "Reservation", message1, message2, facture, rooms2, user);



      console.log(user);
      await User.updateOne(
          {"_id": req.params.userId},
          {

            $push: {
              "hotels": rooms2.idHotel,
              "factures": facture._id
            }
          },
      );

      res.status(200).json("Room Reserved");

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
    res.status(200).json("Room has been deleted");
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
