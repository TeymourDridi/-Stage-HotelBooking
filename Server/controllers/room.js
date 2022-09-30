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
          situation: "confirmer"
        }

      }
      );
      res.status(200).json("confirmer");
    }else{

      await Facture.updateOne(
          {"_id": req.params.factureId},
          {
            $set: {
              situation: "refuser"
            }

          }
      );
      res.status(201).json("refuser");
    }
  } catch (err) {

  }
};

module.exports.updateRoomAvailability = async (req, res, next) => {
  try {

    const hotel = await Hotel.findById(req.params.hotelid);
    const user = await User.findById(req.params.userId);
    const checkin = new Date(req.body.checkIn);
    const checkinMail =req.body.checkIn;

    const checkout = new Date(req.body.checkOut);
    const checkoutMail = req.body.checkOut;
    const tawa = new Date();
    if(checkin<tawa){
      res.status(406).json("DATE ERRONE");
    }
    else if(checkout<checkin){
      res.status(406).json("DATE ERRONE");
    }else {
      let nrooms = 0;

      let roomsMap = [];
      let x = false;
      for (let roomarrayindex = 0; roomarrayindex < req.body.title.length; roomarrayindex++) {
        let roomsList = [];
        roomsList.push(await Room.find({title: req.body.title[roomarrayindex], idHotel: req.params.hotelid}));
        nrooms = nrooms + req.body.number[roomarrayindex];
        //console.log(roomsList);

        roomsList.map((rs) => {
          let numb = 0;
          rs.map((r) => {


            if (req.body.number[roomarrayindex] > numb) {
              x = true;
              const maMap = new Map(r.inout);
              for (const [key, value] of maMap.entries()) {


                let inDate = new Date(`${key}`);

                if ((checkin >= inDate && checkin <= value) || (checkout >= inDate && checkout <= value)) {
                  x = false;
                }

              }
              if (x) {
                maMap.set(req.body.checkIn, checkout)
                r.inout = maMap;
                roomsMap.push(r);
                numb = numb + 1;
                //console.log(numb);

              }
            }
          });
        });


      }


      console.log(roomsMap);


      let rooms = [];
      let rooms2 = [];

      let oneNight = 0;


//console.log(roomsMap.length);

      if (nrooms !== roomsMap.length) {

        res.status(404).json("Pas De Chambres Disponible");
      } else {


        roomsMap.map(async (r) => {

              //     for (let k = 0; k < r.length; k++) {
              //console.log(r._id);
              if (hotel.discount) {
                oneNight += r.price - ((r.price * hotel.discount) / 100);
              } else {
                oneNight += r.price;
              }
              rooms2.push(r);
              await Room.updateOne(
                  {"_id": r._id},
                  {
                    $set: {
                      situation: "en attente",
                      inout: r.inout,

                    }

                  }
              );
              // }
            }
        )

        const t2 = new Date(req.body.checkOut).getTime();
        const t1 = new Date(req.body.checkIn).getTime();
        const Days = (((t2 - t1) / (1000 * 60 * 60 * 24)) % 7)

        const facture = new Facture({
          userId: user._id,
          hotelId: hotel._id,
          hotelName: hotel.name,
          name: user.name,
          lastname: user.lastname,

          jours: Days,
          price: Math.round(oneNight * Days),
          rooms: rooms2
        })
        await facture.save();

        const message1 = `${process.env.BASE_URL}/rooms/oui/${facture._id}`;
        const message2 = `${process.env.BASE_URL}/rooms/non/${facture._id}`;
        // console.log(hotel.email);
        await sendEmailHotel(hotel.email, "Reservation", message1, message2, facture, req.body.title, user, req.body.number, checkinMail, checkoutMail);


        //console.log(user);
        await User.updateOne(
            {"_id": req.params.userId},
            {

              $push: {
                "hotels": rooms2.idHotel,
                "factures": facture._id
              }
            },
        );
        await Hotel.updateOne(
            {"_id": req.params.hotelid},
            {

              $push: {

                "factures": facture._id
              }
            },
        );

        res.status(200).json("Room Reserved");

      }
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
