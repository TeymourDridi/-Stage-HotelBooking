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
const { verifyAdmin } = require("../utils/verifyToken.js");

const router = express.Router();
//CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:userId/:hotelid", updateRoomAvailability);

router.put("/:id", verifyAdmin, updateRoom);
//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);
//GET

router.get("/:id", getRoom);
//GET ALL

router.get("/", getRooms);

router.get("/:response/:factureId", confirmRoom);

module.exports = router;
