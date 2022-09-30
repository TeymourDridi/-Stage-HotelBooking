const express = require("express");
const {
  //countByCity,
  //countByType,
  getHotelPhotos,
  getSearchHotels,
  getBestHotels,
  getFactureExists,
  createHotel,
  deleteHotel,
  getHotel,
  //getHotelRooms,
  getHotels,
  updateHotel,
} = require("../controllers/hotel.js");
const Hotel =require("../models/Hotel.js");
const {verifyAdmin,verifyUser} = require("../utils/verifyToken.js");
const {upImagesHotel} = require("../controllers/hotel");
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);
//GET

router.get("/find/:id",verifyUser, getHotel);
//GET ALL

router.get("/",verifyUser, getHotels);
router.get("/facture/:iduser/:idhotel",verifyUser, getFactureExists);
router.post("/photos/:id",verifyAdmin, upImagesHotel);
router.get("/best" ,getBestHotels);
router.get("/search/:name/:price/:city/:rating",verifyUser, getSearchHotels);


module.exports = router;
