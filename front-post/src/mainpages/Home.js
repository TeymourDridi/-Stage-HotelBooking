import React, {useEffect, useState} from "react";
import './Home.css'
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapLocation } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
const Home = (props) => {
const[x,setX]=useState(0);
const[i,setI]=useState(0);
const[bestHotels,setbestHotels]=useState([]);
    const [checkin,setCheckin]=useState(null);
    const [checkout,setCheckout]=useState(null);
    function next(){
if(x===0) {
    document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate swiper-slide-active';
    document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("ftransform").style.transform = 'translate3d(-1349px,0px,0px)';
setX(x=>x+1);
}
else if(x===1) {
    document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate swiper-slide-active';
    document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("ftransform").style.transform = 'translate3d(-2698px,0px,0px)';
setX(x=>x+1);
}
else if(x===2) {
    document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate swiper-slide-active';
    document.getElementById("ftransform").style.transform = 'translate3d(-4047px,0px,0px)';
setX(x=>x+1);
}else if(x===3) {
    document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate  swiper-slide-active';
    document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate';
    document.getElementById("ftransform").style.transform = 'translate3d(0px,0px,0px)';
setX(x=>0);
}else{setX(x=>0);}


    }
    function prev(){
        if(x===1) {
            document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate swiper-slide-active';
            document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("ftransform").style.transform = 'translate3d(-1349px,0px,0px)';
            setX(x=>x-1);
        }
        if(x===2) {
            document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate swiper-slide-active';
            document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("ftransform").style.transform = 'translate3d(-2698px,0px,0px)';
            setX(x=>x-1);
        }
        if(x===3) {
            document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate swiper-slide-active';
            document.getElementById("ftransform").style.transform = 'translate3d(-4047px,0px,0px)';
            setX(x=>x-1);
        }if(x===0) {
            document.getElementById("firsthotel").className = 'swiper-slide swiper-slide-duplicate  swiper-slide-active';
            document.getElementById("secondhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("thirdhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("forthhotel").className = 'swiper-slide swiper-slide-duplicate';
            document.getElementById("ftransform").style.transform = 'translate3d(0px,0px,0px)';
            setX(x=>3);
        }
    }

function intPhotos(i,n){
    if(i<n-1) {

        return i+1;
    }else{

        return 0;
    }
}
    useEffect(()=>{
        axios.get(`http://localhost:5000/api/hotels/best`,{withCredentials:true})
            .then((response) => {

                setbestHotels(response.data)
                let n=99;
                for(let h of response.data){
                    if(h.photos.length<n){
                        n=h.photos.length;
                    }
                }
                console.log("responsegood");
                //console.log(res);
                console.log(response);
                setInterval(()=>{
                 setI(i=>intPhotos(i,n)) ;
                },2000)
                setInterval(()=>{
                 next()  ;
                },20000)

            })
            .catch((e) => {
                console.log(e);

                console.log("response");
            });


    },[])



    return (

            <body>
            <div id="__next" data-reactroot="">

                <div className="page-wrapper">

                    <section className="banner-section" style={{margin:'auto',marginTop:'-30%'}}>
                        <div className="shape"><img src="assets/images/shape/shape-3.png" alt=""/></div>
                        <div className="big-title">Poste <br/><br/><br/><br/><br/>Booking</div>

                        <div className="swiper swiper-container banner-slider" >

                            <div id="ftransform" className="swiper-wrapper" style={{ cursor: 'grab', transitionDuration: '1400ms', transform: 'translate3d(0px,0px,0px)'}}>

                                <div id="firsthotel" className="swiper-slide swiper-slide-duplicate swiper-slide-active" data-swiper-slide-index="1" style={{width: '1349px'}}>
                                    <div className="content-outer">
                                        <div className="content-box" style={{marginRight:'8%'}}>

                                            <div className="inner" style={{marginLeft:'8%'}}>

                                                <div className="logo"><img src="/assets/images/icons/image-2.png"
                                                                           alt=""/></div>
                                                <h1 className="banner-title" >Meilleur Prix <br/>A {bestHotels[0]?.name} <br/>&amp; Bon Séjour </h1>
                                                <div className="link-box"><Link className="theme-btn btn-style-one" to={"../hotels/reserver/" + bestHotels[0]?._id}
                                                                             href="room-grid"><span>Voir Hotel</span></Link>
                                                </div>
                                            </div>
                                            <div className="image-box" style={{marginRight:'-7%'}}>
                                                <div className="image"><img style={{maxWidth:'550px',minWidth:'550px',minHeight:'550px', clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'}} src={'http://localhost:5000/api/hotels/p/'+bestHotels[0]?.photos[i]}
                                                                            alt=""/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="secondhotel" className="swiper-slide swiper-slide-next swiper-slide-duplicate-prev" data-swiper-slide-index="0" style={{width: '1349px'}}>
                                    <div className="content-outer">
                                        <div className="content-box" style={{marginRight:'8%'}}>

                                            <div className="inner" style={{marginLeft:'8%'}}>

                                                <div className="logo"><img src="/assets/images/icons/image-2.png"
                                                                           alt=""/></div>
                                                <h1 className="banner-title" >Meilleur Remise <br/>A {bestHotels[1]?.name} <br/>Jusqu'a {bestHotels[1]?.discount} % </h1>
                                                <div className="link-box"><Link className="theme-btn btn-style-one" to={"../hotels/reserver/" + bestHotels[1]?._id}
                                                                                href="room-grid"><span>Voir Hotel</span></Link>
                                                </div>
                                            </div>
                                            <div className="image-box" style={{marginRight:'-7%'}}>
                                                <div className="image"><img style={{maxWidth:'550px',minWidth:'550px',minHeight:'550px', clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'}} src={'http://localhost:5000/api/hotels/p/'+bestHotels[1]?.photos[i]}
                                                                            alt=""/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="thirdhotel" className="swiper-slide" data-swiper-slide-index="1" style={{width: '1349px'}}>
                                    <div className="content-outer">
                                        <div className="content-box" style={{marginRight:'8%'}}>

                                            <div className="inner" style={{marginLeft:'8%'}}>

                                                <div className="logo"><img src="/assets/images/icons/image-2.png"
                                                                           alt=""/></div>
                                                <h1 className="banner-title" >Plus de Services <br/>A {bestHotels[2]?.name} <br/>&amp; Bon Séjour </h1>
                                                <div className="link-box"><Link className="theme-btn btn-style-one" to={"../hotels/reserver/" + bestHotels[2]?._id}
                                                                                href="room-grid"><span>Voir Hotel</span></Link>
                                                </div>
                                            </div>
                                            <div className="image-box" style={{marginRight:'-7%'}}>
                                                <div className="image"><img style={{maxWidth:'550px',minWidth:'550px',minHeight:'550px', clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'}} src={'http://localhost:5000/api/hotels/p/'+bestHotels[2]?.photos[i]}
                                                                            alt=""/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="forthhotel" className="swiper-slide swiper-slide-duplicate" data-swiper-slide-index="0" style={{width: '1349px'}}>
                                    <div className="content-outer">
                                        <div className="content-box" style={{marginRight:'8%'}}>

                                            <div className="inner" style={{marginLeft:'8%'}}>

                                                <div className="logo"><img src="/assets/images/icons/image-2.png"
                                                                           alt=""/></div>
                                                <h1 className="banner-title" >Meilleur <br/> Classification <br/>Avec {bestHotels[0]?.rating} Etoile<br/>A {bestHotels[0]?.name} </h1>
                                                <div className="link-box"><Link className="theme-btn btn-style-one" to={"../hotels/reserver/" + bestHotels[0]?._id}
                                                                                href="room-grid"><span>Voir Hotel</span></Link>
                                                </div>
                                            </div>
                                            <div className="image-box" style={{marginRight:'-7%'}}>
                                                <div className="image"><img style={{maxWidth:'550px',minWidth:'550px',minHeight:'550px', clipPath: 'polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)'}} src={'http://localhost:5000/api/hotels/p/'+bestHotels[0]?.photos[i]}
                                                                            alt=""/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="banner-slider-nav">
                            <div className="banner-slider-control banner-slider-button-prev" onClick={()=>prev()}><span><i
                                className="fas fa-arrow-right"></i></span></div>
                            <div className="banner-slider-control banner-slider-button-next" onClick={()=>next()}><span><i
                                className="fas fa-arrow-right"></i></span></div>
                        </div>
                    </section>
                    {/*<div className="check-availability">
                        <div className="auto-container">
                            <section className="block-43 ftco-booking ftco-section ftco-no-pt ftco-no-pb" id="res">
                                <div className="container">
                                    <div className="row no-gutters">
                                        <div className="col-lg-12">
                                            <form action="#" className="booking-form aside-stretch">
                                                <div className="row">
                                                    <div className="col-md d-flex py-md-1">
                                                       <div
                                                            className="form-group align-self-stretch d-flex align-items-end">
                                                            <div className="wrap align-self-stretch py-3 px-4">
                                                                <label htmlFor="#">Date D'arriver</label>
                                                                <input type="date" className="form-control checkin_date"
                                                                       placeholder="Check-in date" onChange={(e)=>setCheckin(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md d-flex py-md-1">
                                                        <div
                                                            className="form-group align-self-stretch d-flex align-items-end">
                                                            <div className="wrap align-self-stretch py-3 px-4">
                                                                <label htmlFor="#">Check-out Date</label>
                                                                <input type="date" className="form-control checkout_date"
                                                                       placeholder="Check-out date" onChange={(e)=>setCheckout(e.target.value)}/>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="col-md d-flex justify-content-between">

                                                    <div className="form-group d-flex align-self-stretch ">
                                                        <button
                                                                className="btn btn-primary py-5 py-md-3 px-4 align-self-stretch d-block" ><span>Hotels Disponible</span></button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>*/}
                    <section className="section-one">
                        <div className="auto-container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <div className="block-one">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <div className="image mb-30"><img
                                                    src="/assets/images/resource/image-1.jpg" alt=""/></div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="inner-box mb-30">
                                                    <div className="image-two"><img
                                                        src="/assets/images/resource/image-2.jpg" alt=""/></div>
                                                    <div className="image-three"><img style={{marginTop:'-31.5px',opacity:'0.8'}}
                                                        src="/assets/images/poste-logo.jpg" alt="poste-logo"/></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="block-two text-center">
                                        <div className="image mb-10"><img src="/assets/images/icons/image-2.png" alt=""/>
                                        </div>
                                        <h2 className="sec-title">Bienvenue a notre <br/> <span className="theme-color">Poste Booking</span>
                                        </h2>
                                        <div className="text-two">On Vous presente les Meilleure Hotels avec Les Meilleur Tarifs Disponible et Un contact Direct Avec L'hotel en Reservation
                                        </div>
                                        <div className="bottom-content justify-content-center">
                                            {/*<div className="ratings">4.6</div>*/}
                                            {/*<div className="text-three">Users <br/> Ratings</div>*/}
                                            <Link className="theme-btn btn-style-one dark" to={'../hotels'}><span>Explorer Nos Hotels</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*<section className="section-two">
                        <div className="auto-container">
                            <div className="sub-title text-center">New Offers <span>-25%</span></div>
                            <h2 className="sec-title text-center text-light">Featured Specials</h2>
                            <div className="row align-items-center">
                                <div className="col-lg-4">
                                    <div className="block-three">
                                        <div className="image"><img src="/assets/images/resource/image-3.jpg" alt=""/>
                                        </div>
                                        <div className="inner-box">
                                            <div className="title">Upto 40% Off</div>
                                            <div className="text">Kick off summer <br/>in NYC</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="block-three">
                                        <div className="image"><img src="/assets/images/resource/image-4.jpg" alt=""/>
                                        </div>
                                        <div className="inner-box">
                                            <div className="title">For This Week</div>
                                            <div className="text">$8 Breakfast package <br/> at central market</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="block-three">
                                        <div className="image"><img src="/assets/images/resource/image-5.jpg" alt=""/>
                                        </div>
                                        <div className="inner-box">
                                            <div className="title">Free Membership</div>
                                            <div className="text">Win a 3-night <br/> getaway!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>*/}

                   {/* <section className="section-four">
                        <div className="auto-container">
                            <div className="sub-title text-center">Gallary</div>
                            <h2 className="sec-title text-center">Rooms &amp; Suites</h2>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="block-four">
                                        <div className="image"><img src="/assets/images/resource/image-6.jpg" alt=""/>
                                        </div>
                                        <div className="inner-box">
                                            <div className="pricing">$100 per day</div>
                                            <div className="text">Luxury Bed</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="block-four">
                                        <div className="image"><img src="/assets/images/resource/image-7.jpg" alt=""/>
                                        </div>
                                        <div className="inner-box">
                                            <div className="pricing">$100 per day</div>
                                            <div className="text">Duel Bed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="block-four">
                                        <div className="image"><img src="/assets/images/resource/image-8.jpg" alt=""/>
                                        </div>
                                        <div className="inner-box">
                                            <div className="pricing">$100 per day</div>
                                            <div className="text">Single Bed</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="block-four">
                                        <div className="image"><img src="/assets/images/resource/image-9.jpg" alt=""/>
                                        </div>
                                        <div className="inner-box">
                                            <div className="pricing">$100 per day</div>
                                            <div className="text">Family Room</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>*/}
                    {/*<section className="section-five">
                        <div className="auto-container">
                            <div className="block-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="block-five">
                                            <div className="image"><img src="/assets/images/resource/image-7.png"
                                                                        alt=""/></div>
                                            <div className="inner-box">
                                                <div className="time">Time &amp; Shedule</div>
                                                <h3>Opening Hours</h3></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="block-five">
                                            <div className="icon"><i className="flaticon-tray"></i><span>Dinner: 4:30pm – 10:30pm</span>
                                            </div>
                                            <div className="icon"><i className="flaticon-martini"></i><span>Bar (Drinks + Bites): 4:30pm – 12am</span>
                                            </div>
                                            <div className="icon"><i className="flaticon-bath-tub"></i>
                                                <span>Cocktails &amp; Whiskey: Until 2am</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>*/}
                    <section className="section-six">
                        <div className="auto-container">
                            <div className="sub-title text-center">Services</div>
                            <h2 className="sec-title text-center">Services Disponible</h2>
                            <div className="row">
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="block-six">
                                        <div className="icon"><i className="flaticon-wifi-signal"></i></div>
                                        <h4>Free Wifi</h4></div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="block-six">
                                        <div className="icon"><i className="flaticon-croissant"></i></div>
                                        <h4>Breakfast</h4></div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="block-six">
                                        <div className="icon"><i className="flaticon-weights"></i></div>
                                        <h4>Gym Center</h4></div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="block-six">
                                        <div className="icon"><i className="flaticon-massage"></i></div>
                                        <h4>Spa &amp; Beauty</h4></div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="block-six">
                                        <div className="icon"><i className="flaticon-game-controller"></i></div>
                                        <h4>Gaming Zone</h4></div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-sm-6">
                                    <div className="block-six">
                                        <div className="icon"><i className="flaticon-plane"></i></div>
                                        <h4>Transport</h4></div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/*
                    <section className="section-seven"><h4 className="d-none">heading</h4>
                        <div className="auto-container">
                            <div className="block-seven">
                                <div className="image"><img src="/assets/images/resource/video.jpg" alt=""/></div>
                                <div className="video-btn"><a
                                    href="https://www.youtube.com/watch?v=nfP5N9Yc72A&amp;t=28s"
                                    className="overlay-link play-now ripple" data-fancybox="gallery" data-caption=""><i
                                    className="fas fa-play"></i></a></div>
                            </div>
                        </div>
                    </section>
                    <section className="testimonials-section">
                        <div className="auto-container">
                            <div className="top-content">
                                <div className="sec-title text-center mb-30">
                                    <div className="sub-title">Testimonials</div>
                                    <h2 className="sec-title">User Feedbacks</h2></div>
                            </div>
                            <div className="row">
                                <div className="swiper theme_carousel swiper-container">
                                    <div className="swiper-wrapper">
                                        <div
                                            className="swiper-slide col-lg-12 block-eight text-center swiper-slide-duplicate"
                                            data-swiper-slide-index="5">
                                            <div className="icon"><i className="flaticon-conference-1"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img
                                                        src="/assets/images/resource/image-10.png" alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Easy Transport ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide col-lg-12 block-eight text-center"
                                             data-swiper-slide-index="0">
                                            <div className="icon"><i className="flaticon-martini"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img src="/assets/images/resource/image-8.png"
                                                                                alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Quality Drinks &amp; Food ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide col-lg-12 block-eight text-center"
                                             data-swiper-slide-index="1">
                                            <div className="icon"><i className="flaticon-conference"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img src="/assets/images/resource/image-9.png"
                                                                                alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Dive &amp; Swimming ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide col-lg-12 block-eight text-center"
                                             data-swiper-slide-index="2">
                                            <div className="icon"><i className="flaticon-conference-1"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img
                                                        src="/assets/images/resource/image-10.png" alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Easy Transport ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide col-lg-12 block-eight text-center"
                                             data-swiper-slide-index="3">
                                            <div className="icon"><i className="flaticon-martini"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img src="/assets/images/resource/image-8.png"
                                                                                alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Quality Drinks &amp; Food ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide col-lg-12 block-eight text-center"
                                             data-swiper-slide-index="4">
                                            <div className="icon"><i className="flaticon-conference"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img src="/assets/images/resource/image-9.png"
                                                                                alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Dive &amp; Swimming ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide col-lg-12 block-eight text-center"
                                             data-swiper-slide-index="5">
                                            <div className="icon"><i className="flaticon-conference-1"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img
                                                        src="/assets/images/resource/image-10.png" alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Easy Transport ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="swiper-slide col-lg-12 block-eight text-center swiper-slide-duplicate"
                                            data-swiper-slide-index="0">
                                            <div className="icon"><i className="flaticon-martini"></i></div>
                                            <div className="inner-box">
                                                <div className="author-info">
                                                    <div className="thumb"><img src="/assets/images/resource/image-8.png"
                                                                                alt=""/></div>
                                                    <div className="rating-info">
                                                        <div className="rating"><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="fas fa-star"></span><span
                                                            className="far fa-star"></span></div>
                                                    </div>
                                                    <h4>“ Quality Drinks &amp; Food ”</h4></div>
                                                <div className="content">
                                                    <div className="text">Lorem ipsum dolor sit amet, consecte <br/> tur
                                                        adipiscing elit, sed do eiusmod <br/> tempor incididunt.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-nine">
                        <div className="auto-container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="left-column">
                                        <div className="sub-title text-light">Blog</div>
                                        <h2 className="sec-title text-light">News &amp; Articles</h2>
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="block-nine">
                                                    <div className="image"><a href="blog-details"><img
                                                        src="/assets/images/resource/image-10.jpg" alt=""/></a>
                                                        <div className="date">20 <br/> <span>Jun</span></div>
                                                    </div>
                                                    <div className="inner-box">
                                                        <div className="category">Hotel</div>
                                                        <h4><a href="blog-details">Choose From a Wide Range
                                                            of <br/> Properties Which</a></h4></div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="block-nine">
                                                    <div className="image"><a href="blog-details"><img
                                                        src="/assets/images/resource/image-11.jpg" alt=""/></a>
                                                        <div className="date">20 <br/> <span>Jun</span></div>
                                                    </div>
                                                    <div className="inner-box">
                                                        <div className="category">Hotel</div>
                                                        <h4><a href="blog-details">Choose From a Wide Range
                                                            of <br/> Properties Which</a></h4></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="right-column">
                                        <div className="block-ten">
                                            <div className="wrap">
                                                <div className="inner-box">
                                                    <div className="category">Hotel</div>
                                                    <h3><a href="blog-details">Choose From a Wide Range
                                                        of <br/> Properties Which</a></h3></div>
                                            </div>
                                        </div>
                                        <div className="block-ten">
                                            <div className="wrap">
                                                <div className="inner-box">
                                                    <div className="category">Foods</div>
                                                    <h3><a href="blog-details">Dutch online travel agency
                                                        for <br/> lodging reservations</a></h3></div>
                                            </div>
                                        </div>
                                        <div className="block-ten">
                                            <div className="wrap">
                                                <div className="inner-box">
                                                    <div className="category">Drinks</div>
                                                    <h3><a href="blog-details">Other travel products, and
                                                        a <br/> subsidiary of Booking</a></h3></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="section-ten">
                        <div className="auto-container">
                            <div className="block-eleven"
                                 style={{backgroundImage:"url('/assets/images/resource/image-12.jpg')"}}>
                                <div className="inner-box text-center">
                                    <div className="logo"><img src="/assets/images/resource/image-11.png" alt=""/></div>
                                    <h5>Late Breakfast Until 10Am</h5><a className="theme-btn btn-style-one"
                                                                         href="menu"><span>Breakfast Menu</span></a>
                                </div>
                            </div>
                        </div>
                    </section>*/}

                    <div className="scroll-to-top scroll-to-target" id="scroll-top" data-target="html"><span
                        className="fas fa-arrow-up"></span></div>
                </div>
            </div>
               </body>



    )
}


export default Home;
