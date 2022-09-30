const Hotel = require("../models/Hotel.js");
const Room = require("../models/Room.js");
const User = require("../models/User.js");
const Facture = require("../models/Facture.js");
const multer = require('multer');
module.exports.createHotel = async (req, res, next) => {
  const newHotel = new Hotel({
    name :req.body.name,
    city:req.body.city,
    email:req.body.email,
    address:req.body.address,
    rating:req.body.rating,
    discount:req.body.discount,
    description:req.body.description,
    additional:req.body.additional} );


  try {
let minPrice=9999999;
    for(let n in req.body.rooms){

      for (let i = 0; i < req.body.rooms[n].number; i++)  {
if(req.body.rooms[n].price<minPrice){
  minPrice=req.body.rooms[n].price;
  newHotel.minPrice=req.body.rooms[n].price;
  console.log(newHotel.minPrice)
}

        const newRoom = new Room();
        newRoom.idHotel= newHotel._id;
        newRoom.title= req.body.rooms[n].title;
        newRoom.price= req.body.rooms[n].price;
        newRoom.maxPeople= req.body.rooms[n].maxPeople;
        const savedRoom = await newRoom.save();
        newHotel.rooms.push(savedRoom);


      }
    }
    const savedHotel = await newHotel.save();
    return res.status(200).json(savedHotel);


  } catch (err) {
    next(err);
  }
};
module.exports.upImagesHotel = async (req, res, next) => {
  try {

    const hotel = await Hotel.findById(req.params.id);

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {

        cb(null, 'public')
      },
      filename: (req, file, cb) => {
        const Dd = Date.now();
        hotel.photos.push(Dd + file.originalname);

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
    const uploadFiles = upload.array("photos", 15); // limit to 15 images

    uploadFiles(req, res, async (err) => {
      if (err) {
        console.log(err);
       // return res.status(500).json(err)
      }


    })
    setTimeout(async () => {
      const savedHotel = await hotel.save();
      return res.status(200).json(savedHotel);
    },1000);

  } catch (err) {
    next(err);
  }
};
module.exports.updateHotel = async (req, res, next) => {
  try {

    const hotel = await Hotel.findById(req.params.id);
    for(let r of hotel.rooms){
      await Room.findByIdAndDelete(r);
    }
hotel.rooms=[];
    let minPrice=9999999;
    for(let n in req.body.rooms){
     // console.log(req.body.rooms[n].number);
      for (let i = 0; i < req.body.rooms[n].number; i++)  {
        if(req.body.rooms[n].price<minPrice){
          minPrice=req.body.rooms[n].price;
          hotel.minPrice=req.body.rooms[n].price;
          console.log(hotel.minPrice)
        }
        const newRoom = new Room();
        newRoom.idHotel= hotel._id;
        newRoom.title= req.body.rooms[n].title;
        newRoom.price= req.body.rooms[n].price;
        newRoom.maxPeople= req.body.rooms[n].maxPeople;
        const savedRoom = await newRoom.save();
        hotel.rooms.push(savedRoom);


      }
    }
    req.body.rooms=hotel.rooms;
    req.body.minPrice=hotel.minPrice;
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
let Rooms =[];
    for(let rid of hotel.rooms){
      Rooms.push( await Room.findById(rid))


    }
hotel.rooms=Rooms;

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
module.exports.getFactureExists = async (req, res, next) => {

  try {
   const user= await User.findById(req.params.iduser);
   let g=false;
   for(let f of user.factures){
   let facture = await Facture.findById(f);

     if(req.params.idhotel===facture.hotelId){
      g=true;
     }
   }
    res.status(200).json(g);
  } catch (err) {
    next(err);
  }
};


module.exports.getBestHotels = async (req, res, next) => {

  try {
    const hotels = await Hotel.find();
    let x=99999999;
    let d=0;
    let a=0;
    let r=0;
    let hotprix;
    let hotdisc;
    let hotadd;
    let hotrate;
    for(let h of hotels){

      if(h.additional.length>a){
        a=h.additional.length;
        hotadd=h;
      }
      if(h.rating>r){
        a=h.rating;
        hotrate=h;
      }
      for(let r of h.rooms){
        const room = await Room.findById(r);
        if(room.price<x){
          x=room.price;
          hotprix=h;
        }
        if(h.discount>d){
          d=h.discount;
          hotdisc=h;
        }



      }
    }
    let besthotels=[]
    besthotels.push(hotprix);
    besthotels.push(hotdisc);
    besthotels.push(hotadd);
    besthotels.push(hotrate);
    res.status(200).json(besthotels);
  } catch (err) {
    next(err);
  }
};
module.exports.getSearchHotels = async (req, res, next) => {

  try {
      let hotels;
    if(req.params.name==='null' && req.params.price==='null' && req.params.city==='null' && req.params.rating==='null') {
         hotels= await Hotel.find();

    }
    if(req.params.name!=='null' && req.params.price==='null' && req.params.city==='null' && req.params.rating==='null') {

      hotels= await Hotel.find({name:{$regex : req.params.name}});
    }

if(req.params.name==='null' && req.params.price!=='null' && req.params.city==='null' && req.params.rating==='null') {

      hotels= await Hotel.aggregate([{ $sort: { minPrice: Number(req.params.price) } }])

    }

if(req.params.name==='null' && req.params.price==='null' && req.params.city!=='null' && req.params.rating==='null') {

      hotels= await Hotel.find({ city: req.params.city })

    }
if(req.params.name==='null' && req.params.price==='null' && req.params.city==='null' && req.params.rating!=='null') {

      hotels= await Hotel.find({ rating: Number(req.params.rating) })

    }
if(req.params.name!=='null' && req.params.price!=='null' && req.params.city==='null' && req.params.rating==='null') {

      hotels= await Hotel.find({name:{$regex : req.params.name}}).sort({minPrice:Number(req.params.price)});

    }

if(req.params.name!=='null' && req.params.price==='null' && req.params.city!=='null' && req.params.rating==='null') {

      hotels= await Hotel.find({$and: [{name: {$regex: req.params.name}}, {city:req.params.city}]});

    }

if(req.params.name!=='null' && req.params.price==='null' && req.params.city==='null' && req.params.rating!=='null') {

      hotels= await Hotel.find({$and: [{name: {$regex: req.params.name}}, {rating:Number(req.params.rating)}]});

    }

if(req.params.name==='null' && req.params.price!=='null' && req.params.city!=='null' && req.params.rating==='null') {

    hotels= await Hotel.find({city:req.params.city}).sort({minPrice:Number(req.params.price)});

    }

if(req.params.name==='null' && req.params.price!=='null' && req.params.city==='null' && req.params.rating!=='null') {

    hotels= await Hotel.find({rating:Number(req.params.rating)}).sort({minPrice:Number(req.params.price)});

    }

if(req.params.name==='null' && req.params.price==='null' && req.params.city!=='null' && req.params.rating!=='null') {

    hotels= await Hotel.find({$and: [{city: req.params.city}, {rating:Number(req.params.rating)}]});

    }
if(req.params.name==='null' && req.params.price!=='null' && req.params.city!=='null' && req.params.rating!=='null') {

    hotels= await Hotel.find({$and: [{city: req.params.city}, {rating:Number(req.params.rating)}]}).sort({minPrice:Number(req.params.price)});

    }

if(req.params.name!=='null' && req.params.price==='null' && req.params.city!=='null' && req.params.rating!=='null') {

    hotels= await Hotel.find({$and: [{city: req.params.city}, {rating:Number(req.params.rating)},{name: {$regex: req.params.name}}]});

    }


if(req.params.name!=='null' && req.params.price!=='null' && req.params.city==='null' && req.params.rating!=='null') {

    hotels= await Hotel.find({$and: [ {rating:Number(req.params.rating)},{name: {$regex: req.params.name}}]}).sort({minPrice:Number(req.params.price)});

    }

if(req.params.name!=='null' && req.params.price!=='null' && req.params.city!=='null' && req.params.rating==='null') {

    hotels= await Hotel.find({$and: [ {city: req.params.city},{name: {$regex: req.params.name}}]}).sort({minPrice:Number(req.params.price)});

    }

if(req.params.name!=='null' && req.params.price!=='null' && req.params.city!=='null' && req.params.rating!=='null') {

    hotels= await Hotel.find({$and: [ {rating:Number(req.params.rating)},{city: req.params.city},{name: {$regex: req.params.name}}]}).sort({minPrice:Number(req.params.price)});

    }



     /* console.log(req.params.name);
console.log(req.params.price);
console.log(req.params.city);
console.log(req.params.rating);*/

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
