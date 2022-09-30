const express = require("express");
const {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoom,
  updateRoomAvailability,
  confirmRoom,
} = require("../controllers/room.js");
const { verifyAdmin ,verifyUser} = require("../utils/verifyToken.js");

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:userId/:hotelid",verifyUser, updateRoomAvailability);

router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

router.get("/:id",verifyUser, getRoom);
//GET ALL

router.get("/",verifyUser, getRooms);

router.get("/:response/:factureId", confirmRoom);

module.exports = router;
