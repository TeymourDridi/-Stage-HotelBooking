import React from 'react';
import { Route, Switch, BrowserRouter,Routes } from 'react-router-dom';


import styled, {css} from "styled-components";
import './Navbar.scss';


import Navbar from "../mainpages/Navbar";
import Footer from "./Footer";
import Hotelgrid from "./Hotelgrid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import Pagination from "./Pagination";
import HotelDetails from "./HotelDetails";
import Reservations from "./Reservations";
import Home from "./Home";
import Contact from "../pages/Contact";
import {Navigate} from "react-router";



const Mainrouter = (props) =>{

    window.onscroll = function() {myArrow()};

    function myArrow() {
        if (document.documentElement.scrollTop > 500) {
            document.getElementById("scroll-to").style.display='inline';
            document.getElementById("menunav").className='main-header header-style-one style-two fixed-header';

        } else {
            document.getElementById("scroll-to").style.display='';
            document.getElementById("menunav").className='main-header header-style-one style-two';
        }
        if (document.documentElement.scrollTop > 160) {

            document.getElementById("menunav").className='main-header header-style-one style-two fixed-header';

        } else {

            document.getElementById("menunav").className='main-header header-style-one style-two';
        }
    }

    return(
    <div id="bodnav">
        <div id="__next" data-reactroot="">
            <div className="page-wrapper">
<Navbar navigate={props.navigate} toast={props.toast}/>
        <Routes>


            <Route exact path="/hotels" element={<Pagination navigate={props.navigate} toast={props.toast}/>}/>
            <Route exact path="/mesreservations" element={<Reservations navigate={props.navigate} toast={props.toast}/>}/>
            <Route exact path="/home" element={<Home navigate={props.navigate} toast={props.toast} />}/>
            <Route exact path="/hotels/reserver/:hotelId" element={<HotelDetails navigate={props.navigate} toast={props.toast}/>}/>
            <Route exact path="/contact" element={<Contact navigate={props.navigate} toast={props.toast}/>}/>
            <Route path="*"  element={<Navigate replace to={'/home'} />}/>
        </Routes>
<Footer  />

             <a  className="scroll-to-top scroll-to-target" id="scroll-to" data-bs-target="#bodnav"   onClick={()=>window.scroll(0,0)}><span
                    className="fas fa-arrow-up"></span></a>
            </div>
        </div>



    </div>
)};
export default Mainrouter;
