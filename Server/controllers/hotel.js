const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");
const multer = require('multer');
module.exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel({name :req.body.name,city:req.body.city,email:req.body.email,address:req.body.address} );
  //console.log(req.body.rooms);

  try {

    for(let n in req.body.rooms){
      console.log(req.body.rooms[n].number);
      for (let i = 0; i < req.body.rooms[n].number; i++)  {

        const newRoom = new Room();
        newRoom.idHotel= newHotel._id;
        newRoom.title= req.body.rooms[n].title;
        newRoom.price= req.body.rooms[n].price;
        newRoom.maxPeople= req.body.rooms[n].maxPeople;
        const savedRoom = await newRoom.save();
        newHotel.rooms.push(savedRoom);


      }
    }
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public')
      },
      filename: (req, file, cb) => {
        const Dd = Date.now();
        newHotel.photos.push(Dd + file.originalname);

        cb(null, Dd + file.originalname)

      }
    });
    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb("Please upload only images.", false);
      }
    };
    const upload = multer({
      storage: storage,
      fileFilter: multerFilter
    });
    const uploadFiles = upload.array("images", 15); // limit to 15 images

    uploadFiles(req, res, async (err) => {
      if (err) {
        return res.status(500).json(err)
      }
      const savedHotel = await newHotel.save();
      return res.status(200).json(newHotel)
    })



  } catch (err) {
    next(err);
  }
};
module.exports.updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
module.exports.getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
module.exports.getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};

/*export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};*/
/*export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};*/

/*export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};*/
