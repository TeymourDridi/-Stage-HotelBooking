const express = require("express");
const {
  getReservationByHotel,
getFacturesByHotel,
  deleteFacture,
  getFacture,
  getFactures,
} = require("../controllers/facture.js");
const { verifyAdmin, verifyToken, verifyUser } = require("../utils/verifyToken.js");

const router = express.Router();



//DELETE
router.delete("/:id", verifyUser, deleteFacture);

//GET
router.get("/stats",verifyAdmin,getReservationByHotel);

router.get("/:id", verifyUser, getFacture);

//GET ALL
router.get("/geAll/:iduser", verifyUser, getFactures);
router.get("/getByHotel/:idhotel",verifyUser, getFacturesByHotel);





module.exports = router;
