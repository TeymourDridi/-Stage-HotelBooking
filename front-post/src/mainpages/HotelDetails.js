import React, {useEffect, useRef, useState} from "react";

import {Link, useParams} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Toast } from 'primereact/toast';
import axios from "axios";
import './HotelDetails.css';
const HotelDetails = (props) => {
    let toast = useRef()
    const user = JSON.parse(localStorage.getItem('user'))
    const {hotelId} = useParams()
    const[i,setI]=useState(2) ;
    const [hotel,setHotel]=useState(null);
    const [uRooms,setURooms]=useState([]);
    const [uTRooms,setUTRooms]=useState([]);
    const [n,setN]=useState(1);
    const [index,setIndex]=useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    const [checkin,setCheckin]=useState(null);
    const [checkout,setCheckout]=useState(null);
    const [title,setTitle]=useState([]);
    const [additionnal,setAdditionnal]=useState([]);
    const [maxPeople,setPeople]=useState([]);
    const [weed,setWeed]=useState(0);
    const [alreadyReserved,setAlreadyReserved]=useState(false);

    function testonFactureexistance(){
        axios.get(`http://localhost:5000/api/hotels/facture/`+user?._id+"/"+hotelId,{withCredentials:true})
            .then((response) => {
                console.log(response.data);
                setAlreadyReserved(response.data)

            })
            .catch((e) => {
                console.log(e);
                if(e.response.status===403){
                    props.navigate('/auth/login')
                }
                console.log("response");
            });
    }



    useEffect(  () => {




        testonFactureexistance();






        axios.get(`http://localhost:5000/api/hotels/find/`+hotelId,{withCredentials:true})
            .then((response) => {
                setHotel(response.data)
                console.log(user)

                for(let r of response.data.rooms ){
                    if(!uTRooms.includes(r.title)){
                        uTRooms.push(r.title);
                        uRooms.push(r);
                        maxPeople.push(r.maxPeople);
                    }
                }
                title[0]=uTRooms[0];


                setTimeout(()=>{
                    setInterval(()=>{
                        if(i>=2 && i<response.data.photos.length-2){ setI((i)=>interval(i,response.data.photos.length-2));}
                       if(document.getElementById("redbutton").hidden) {
                           document.getElementById("redbutton").hidden = false;
                       }else{document.getElementById("redbutton").hidden = true;}
                    },5000)
                },3000)

                setInterval(()=>{
                  setWeed(weed =>weed+0.001);
                },500)

            })
            .catch((e) => {
                console.log(e);
                if(e.response.status===403 || e.response.status===401){
                    props.toast.current.show({severity: 'warn', summary: 'Connectez Vous', detail: "Vous n'etes pas autorisez"});
                    props.navigate('/auth/login')
                }
                console.log("response");
            });

    },[]);


function submit(){




        let ntitle=[];
        let number=[];
        for(let ot of uTRooms){
            let s=0;
            for(let ct of title){
                if(ot===ct){
                    s=s+1;
                }
            }
            if(title.includes(ot) && !ntitle.includes(ot)){
            ntitle.push(ot);
            number.push(s);
            }

        }
    console.log(ntitle);
    console.log(number);

    axios.put(`http://localhost:5000/api/rooms/`+user?._id+"/"+hotelId,{
        title:ntitle,
        number:number,
        checkIn:checkin,
        checkOut:checkout,

    },{withCredentials:true})
        .then((response) => {
            console.log(response);
            toast.current.show({severity: 'success', summary: 'Reserver Avec Succès', detail:'Du '+ checkin+' A '+checkout});
        })
        .catch((e) => {
            console.log(e);
            toast.current.show({severity: 'error', summary: 'Error', detail: e.response.data});
            if(e.response.status===403 || e.response.status===401){
                props.toast.current.show({severity: 'warn', summary: 'Connectez Vous', detail: "Vous n'etes pas autorisez"});
                props.navigate('/auth/login')
            }
            console.log("response");
        });

    setTimeout(()=>{
        testonFactureexistance();
    },5000)
}


function price(){
    let p =0
    for(let t of title){
        for(let r of uRooms)
        if(r.title === t){
            if(hotel.discount) {
                p = p + r.price-((r.price*hotel.discount)/100);

            }else{p=p+ r.price}
        }
    }
    let t1=new Date(checkin)
    let t2=new Date(checkout)
    let jours=(((t2.getTime() - t1.getTime()) / (1000 * 60 * 60 * 24)) % 7);
    p=p*jours;
    p=Math.round(p);
    testonFactureexistance();
    return p
}


    const nextIndexPhoto = () => {

       if(i>=2 && i<hotel.photos.length-2){ setI(i+1)}
       if(i>=hotel.photos.length-2){setI(2);}
    };
    const interval = (n,l) => {

       if(n>=2 && n<l){ setI(n+1);n=n+1}
       if(n>=l){setI(2);n=2;}
       return n;
    };
    const prevIndexPhoto = () => {

       if(i>2 && i<=hotel.photos.length-2 ){ setI(i-1)}
       if(i==2 && i<=hotel.photos.length-2 ){ setI(hotel.photos.length-2)}
    };


    return (<div>

        <Toast ref={toast} position="bottom-left" />
        <body>
        <div id="__next" data-reactroot="">

            <div className="page-wrapper">


                <div id="search-popup" className="search-popup ">
                    <div className="close-search theme-btn"><i className="far fa-times"></i></div>
                    <div className="popup-inner">
                        <div className="overlay-layer"></div>
                        <div className="search-form">
                            <form method="post">
                                <div className="form-group">
                                    <fieldset><input type="search" className="form-control" name="search-input"
                                                     placeholder="Type &amp; Enter" value=""/></fieldset>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <section className="page-title" style={{backgroundImage:"url('/assets/images/main-slider/about.jpg')"}}>
                    <div className="auto-container">
                        <div className="content-box">
                            <div className="content-wrapper">
                                <ul className="bread-crumb">
                                    <li><a>Home</a></li>
                                    <li>Hotels</li>
                                    <li>Reservation</li>
                                </ul>
                                <div className="title"><h1>Reservation</h1></div>
                            </div>
                        </div>
                    </div>
                </section>

                <Link    className="animated-button1 bodbut"  to={'../hotels'}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Retour
                </Link>



                <section className="section-thirty-nine">
                    <div className="auto-container">




                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <div className="block-forty">

                                    <h4 className="d-flex justify-content-center">{hotel?.name}</h4>
                                    <ul className="d-flex justify-content-center">
                                        <li><i className="flaticon-preview"></i><span>{hotel?.address}</span></li>
                                        <li><i className="flaticon-bed"></i><span>{hotel?.rooms.length}</span></li>
                                        <li><i className="fa fa-star"></i><span>{hotel?.rating}</span></li>
                                    </ul>
                                    <div className="row">
                                        <div className="col-lg-3 col-md-6">
                                            <div className="block-thirty-nine">
                                                <div className="image"><img src={'http://localhost:5000/api/hotels/p/'+hotel?.photos[0]} alt=""/></div>

                                                <div className="image-two"><img src={'http://localhost:5000/api/hotels/p/'+hotel?.photos[1]} alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="image" ><span style={{display: 'inline'}}><button className="fas fa-arrow-left" style={{float:'left',marginBottom:'-20%',background:'none',border:'none'}} onClick={(e) =>{prevIndexPhoto()}} ></button>  <button className="fas fa-arrow-right" style={{float:'left',marginLeft:'95%',background:'none',border:'none'}} onClick={(e) =>{nextIndexPhoto()}}  ></button> </span>   <img style={{width:'200%',maxHeight:'240px'}} src={'http://localhost:5000/api/hotels/p/'+hotel?.photos[i]} alt=""/> </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="image"><img style={{height:'265px'}} src={'http://localhost:5000/api/hotels/p/'+hotel?.photos[hotel.photos.length-1]} alt=""/></div>
                                        </div>
                                    </div>

                                    {/*<div className="text">
                                    </div>
*/}
                                    <div className="bottom-border"><h3>Description</h3></div>
                                    <div className="text-three">{hotel?.description}
                                    </div>
                                </div>


                                <div className="bottom-border"><h3>Services Additionel </h3></div>
                                <div className="row">
                                    { hotel?.additional.includes("Zone Jeux") ? <div className="col-md-3">
                                        <div className="block-six">
                                            <div className="icon"><i className="flaticon-game-controller"></i></div>
                                            <h4>Zone Jeux</h4></div>

                                    </div>:null}

                                    { hotel?.additional.includes("Service de blanchisserie") ? <div className="col-md-3">
                                        <div className="block-43">
                                            <div className="icon-three"><i className="flaticon-laundry"></i>
                                                <div className="title">Service de blanchisserie</div>
                                            </div>
                                        </div>

                                    </div>:null}

                                     { hotel?.additional.includes("Wifi Gratuit") ? <div className="col-md-3">
                                         <div className="block-six">
                                             <div className="icon"><i className="flaticon-wifi-signal"></i></div>
                                             <h4>Wifi Gratuit</h4></div>

                                    </div>:null}

 { hotel?.additional.includes("Gym") ? <div className="col-md-3">
     <div className="block-six">
         <div className="icon"><i className="flaticon-weights"></i></div>
         <h4>Gym</h4></div>

                                    </div>:null}






                                    { hotel?.additional.includes("Nourriture et collations") ? <div className="col-md-3">
                                        <div className="block-43">
                                            <div className="icon-three"><i className="flaticon-breakfast"></i>
                                                <div className="title">Nourriture et collations</div>
                                            </div>
                                        </div>

                                    </div>:null}
                                    { hotel?.additional.includes("Prise en charge à l'aéroport") ? <div className="col-md-3">
                                        <div className="block-43">
                                            <div className="icon-three"><i className="flaticon-plane"></i>
                                                <div className="title">Prise en charge à l'aéroport</div>
                                            </div>
                                        </div>

                                    </div>:null}
                                        { hotel?.additional.includes("Piscine Chauffé") ? <div className="col-md-3">
                                        <div className="block-43">
                                            <div className="icon-three"><i className="flaticon-pool"></i>
                                                <div className="title">Piscine Chauffé</div>
                                            </div>
                                        </div>

                                    </div>:null}

                                    {  hotel?.additional.includes("Spa") ?    <div className="col-md-3">
                                     <div className="block-43">
                                            <div className="icon-three"><i className="fa fa-spa"></i>
                                                <div className="title">Spa</div>
                                            </div>
                                        </div>

                                    </div>:null}


                                </div>
<hr/>
                                <div  className="d-flex justify-content-center"><h3>Reservation</h3><i
                                    id="redbutton"   className="fa fa-circle" style={{color:'red'}}></i></div>
                            </div>

                            <section className="block-43 ftco-booking ftco-section ftco-no-pt ftco-no-pb" id="res">
                                <div className="container">
                                    <div className="row no-gutters">
                                        <div className="col-lg-12">
                                            <form action="#" className="booking-form aside-stretch">
                                                { [...Array(n)].map((e,k)=>  <div className="row">
                                                    <div className="col-md d-flex py-md-1">
                                                        { k<1 ?   <div
                                                            className="form-group align-self-stretch d-flex align-items-end">
                                                            <div className="wrap align-self-stretch py-3 px-4">
                                                                <label htmlFor="#">Date D'arriver</label>
                                                                <input type="date" className="form-control checkin_date"
                                                                       placeholder="Check-in date" onChange={(e)=>setCheckin(e.target.value)}/>
                                                            </div>
                                                        </div> :null}
                                                    </div>
                                                    <div className="col-md d-flex py-md-1">
                                                        { k<1 ? <div
                                                            className="form-group align-self-stretch d-flex align-items-end">
                                                            <div className="wrap align-self-stretch py-3 px-4">
                                                                <label htmlFor="#">Check-out Date</label>
                                                                <input type="date" className="form-control checkout_date"
                                                                       placeholder="Check-out date" onChange={(e)=>setCheckout(e.target.value)}/>
                                                            </div>
                                                        </div>:null}
                                                    </div>
                                                    <div className="col-md d-flex py-md-1">
                                                        <div
                                                            className="form-group align-self-stretch d-flex align-items-end">
                                                            <div className="wrap align-self-stretch py-3 px-4">
                                                                <label htmlFor="#">Chambre</label>
                                                                <div className="form-field">
                                                                    <div className="select-wrap">
                                                                        <div className="icon"><span
                                                                            className="ion-ios-arrow-down"></span></div>
                                                                        <select style={{width:'150%'}} name="" id="" className="form-control" onChange={(ev)=>title[k] = ev.target.value}>
                                                                            {uRooms.map((e,m)=> {
                                                                                if(title[k]===e.title && index[k] !== m) {
                                                                                    index[k]=m;
                                                                                }
                                                                                return (<option key={k}
                                                                                                value={e.title}>{e.title}</option>
                                                                                )})}

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md d-flex py-md-1">
                                                        <div
                                                            className="form-group align-self-stretch d-flex align-items-end">
                                                            <div className="wrap align-self-stretch py-3 px-4">
                                                                <label htmlFor="#">personne(s)</label>
                                                                <div className="form-field">
                                                                    <div className="select-wrap">
                                                                        <div className="icon"><span
                                                                            className="ion-ios-arrow-down"></span></div>
                                                                        <select name="" id="sel" className="form-control">
                                                                            { [...Array(maxPeople[index[k]])].map((e,k)=>   <option value={k+1}> {k+1}</option>)}

                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>)}
                                                <div className="col-md d-flex justify-content-between">
                                                    <div className="form-group d-flex align-self-stretch" >

                                                        <button type="button" disabled={alreadyReserved} onClick={()=>{title[n]=uTRooms[0];setN(n => n+1)}}
                                                           className="btn btn-primary py-5 py-md-3 px-4 align-self-stretch d-block"><span className="d-flex justify-content-center">Ajouter une autre Chambre</span></button>
                                                    </div>
                                                    <div  className="form-group d-flex align-self-stretch ">
                                                        <button type="button" disabled={alreadyReserved}
                                                            className="btn btn-primary py-5 py-md-3 px-4 align-self-stretch d-block" onClick={(e)=>submit()}><span>Reserver <br/> <small>{price()} DT</small></span></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>

                <div className="scroll-to-top scroll-to-target" id="scroll-top" data-target="html"><span
                    className="fas fa-arrow-up"></span></div>
            </div>
        </div>
        </body>







    </div>)
}


export default HotelDetails;
