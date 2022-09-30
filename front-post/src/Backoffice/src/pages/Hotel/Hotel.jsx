import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import "./hotel.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import axios from "axios";
import NewHotel from "../NewHotel/NewHotel";
import {publicRequest} from "../../../../Requests/requestMethods";



export default function Hotel() {
    const {courseId} = useParams()
    const [hotel,setHotel]=useState(null)
    const [reservation,setReservation]=useState(null)
    const[i,setI]=useState(0) ;



    useEffect(  () => {
        publicRequest.get(`/hotels/find/` + courseId,{withCredentials:true})
            .then((response) => {

                setHotel(response.data)
                console.log(response);
                console.log("response");

            })
            .catch((e) => {
                console.log(e);
                console.log("response");
            });
        publicRequest.get(`/factures/getByHotel/` + courseId,{withCredentials:true})
            .then((response) => {


                console.log(response);
                setReservation(response.data);
                console.log("response");

            })
            .catch((e) => {
                console.log(e);
                console.log("response");
            });


    },[])


    const nextIndexPhoto = () => {

        if(i>=0 && i<hotel.photos.length-1){ setI(i+1)}
        if(i>=hotel.photos.length-1){setI(0);}
    };

    const prevIndexPhoto = () => {

        if(i>0 && i<=hotel.photos.length-1 ){ setI(i-1)}
        if(i==0 && i<=hotel.photos.length-1 ){ setI(hotel.photos.length-1)}
    };

  return (
    <div className="product">

      <div className="productTitleContainer">
        <h1 className="productTitle">Hotel</h1>
        <Link to="../../back/newhotel">
          <button className="productAddButton">Crée</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={reservation} dataKey="reservations" title="Reservations"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img  src={'http://localhost:5000/api/hotels/p/'+hotel?.photos[0]} alt={hotel ? hotel.img :null} className="productInfoImg" />
                  <span className="productName">{hotel ? hotel.name :null}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Email:</span>
                      <span className="productInfoValue">{hotel ? hotel.email:null}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">description:</span>
                      <span className="productInfoValue">{hotel ? hotel.description:null}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">Chambres :</span>
                      <span className="productInfoValue">{hotel ? hotel.rooms.length:null}</span>
                  </div>
                    <div className="productInfoItem">
                      <span className="productInfoKey">Remise :</span>
                      <span className="productInfoValue">{hotel ? hotel.discount +"%":null}</span>
                  </div>

              </div>
          </div>
      </div>
      <div className="productBottom">
          <div className="productForm">
              <div className="productFormLeft">
                  {/*<label>{hotel ? hotel.name:null} Course</label>*/}

<NewHotel
    upid={hotel ? hotel._id:null}
    upname={hotel ? hotel.name:null}
    upimg={hotel ? hotel.img:null}
    upprix={hotel ? hotel.prix:null}
    updescription={hotel ? hotel.description:null}
    uprooms={hotel ? hotel.rooms:null}
    upcity={hotel ? hotel.city:null}
    upaddress={hotel ? hotel.address:null}
    upemail={hotel ? hotel.email:null}
    uprating={hotel ? hotel.rating:null}
    updiscount={hotel ? hotel.discount:null}
/>

              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <div className="col-lg-9" style={{left:'50px',bottom:'500px'}}>
                          <div className="image" ><span style={{display: 'inline'}}><button className="fas fa-arrow-left" style={{float:'left',marginBottom:'-20%',background:'none',border:'none'}} onClick={(e) =>{prevIndexPhoto()}} ></button>  <button className="fas fa-arrow-right" style={{float:'left',marginLeft:'95%',background:'none',border:'none'}} onClick={(e) =>{nextIndexPhoto()}}  ></button> </span>   <img style={{width:'1000px',maxHeight:'1000px'}} src={'http://localhost:5000/api/hotels/p/'+hotel?.photos[i]} alt=""/> </div>
                      </div>

                  </div>

              </div>
          </div>
      </div>
    </div>
  );
}
