const User = require("../models/User.js");
const Facture = require("../models/Facture.js");
const Hotel = require("../models/Hotel.js");


module.exports.deleteFacture = async (req,res,next)=>{
  try {

    const facture =await Facture.findByIdAndDelete(req.params.id);
console.log(facture)
    const user = await User.findById(facture.userId);

    user.factures.splice(user.factures.indexOf(facture._id),1);
    await user.save();
    res.status(200).json("Facture Effacé.");
  } catch (err) {
    console.log(err);
    next(err);
  }
}
module.exports.getFacture = async (req,res,next)=>{
  try {
    const facture = await Facture.findById(req.params.id);
    res.status(200).json(facture);
  } catch (err) {
    next(err);
  }
}
module.exports.getFactures = async (req,res,next)=> {
  try {
    console.log(req.params.iduser)
    const user = await User.findById(req.params.iduser);
    let factures = [];
    for (let f of user.factures) {
      const facture = await Facture.findById(f);
      console.log(facture);
      factures.push(facture);
    }


    res.status(200).json(factures);
  } catch (err) {
    next(err);
  }
}
  module.exports.getFacturesByHotel = async (req, res, next) => {
    try {

      const factures = await Facture.find();

      let x =0;
      let janvier={name:"janv",reservations:0};


      let fevrier={name:"fev",reservations:0}; let mars={name:"mars",reservations:0};
        let avril={name:"avril",reservations:0}; let mai={name:"mai",reservations:0};
        let juin={name:"juin",reservations:0}; let juillet={name:"juillet",reservations:0};
      let aout={name:"aout",reservations:0};
      let septembre={name:"sept",reservations:0};
      let octobre={name:"oct",reservations:0};
      let novembre={name:"nov",reservations:0};
      let decembre={name:"dec",reservations:0};



      for (let f of factures) {

        if(f.hotelId===req.params.idhotel) {
            console.log(f.date);
          if(f.date.getMonth()===0){

            janvier.reservations=janvier.reservations+1
          }
if(f.date.getMonth()===1){

  fevrier.reservations=fevrier.reservations+1
          }
if(f.date.getMonth()===2){

  mars.reservations=mars.reservations+1
          }
if(f.date.getMonth()===3){
  avril.reservations=avril.reservations+1

          }
if(f.date.getMonth()===4){
  mai.reservations=mai.reservations+1
          }
if(f.date.getMonth()===5){
  juin.reservations=juin.reservations+1
          }
if(f.date.getMonth()===6){
  juillet.reservations=juillet.reservations+1
          }
if(f.date.getMonth()===7){
  aout.reservations=aout.reservations+1
          }
if(f.date.getMonth()===8){

  septembre.reservations=septembre.reservations+1
          }
if(f.date.getMonth()===9){
  octobre.reservations=octobre.reservations+1
          }
if(f.date.getMonth()===10){
  novembre.reservations=novembre.reservations+1
          }
if(f.date.getMonth()===11){
  decembre.reservations=decembre.reservations+1
          }

        }
      }
      let reservations=[]
        reservations.push(janvier);
        reservations.push(fevrier);
        reservations.push(mars);
        reservations.push(avril);
        reservations.push(mai);
        reservations.push(juin);
        reservations.push(juillet);
        reservations.push(aout);
        reservations.push(septembre);
        reservations.push(octobre);
        reservations.push(novembre);
        reservations.push(decembre);


      res.status(200).json(reservations);
    } catch (err) {
      next(err);
    }
  }

module.exports.getReservationByHotel = async (req,res,next)=> {
    try {
        console.log("fqqqqqqqqqqqqqqqqqqqqqqq")
        const hotels = await Hotel.find();

let stats=[];
        console.log(hotels)

        for (let h of hotels) {
            let stat={name:"",reservations:0}
            stat.name=h.name
            stat.reservations=h.factures.length;
            stats.push(stat);
        }


        res.status(200).json(stats);
    } catch (err) {
        next(err);
    }
}
