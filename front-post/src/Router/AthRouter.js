import React, {useRef} from 'react';
import { Route,Routes } from 'react-router-dom';
import Header from "../pages/Header";
import Footer from "../pages/Footer";



import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Contact from "../pages/Contact";
import {Toast} from "primereact/toast";
import {Navigate} from "react-router";






const AthRouter = (props) => {


    return (
        <div>

            <Header/>
            <Routes>

                <Route exact path="/signup" element={<Signup navigate={props.navigate} toast={props.toast}/>}/>
                <Route exact path="/login" element={<Login navigate={props.navigate} toast={props.toast}/>}/>
                <Route exact path="/contact" element={<Contact navigate={props.navigate} toast={props.toast}/>}/>
                <Route path="*"  element={<Navigate replace to={'/home'} />}/>
            </Routes>
            <br/>
            <br/>
            <Footer/>
        </div>
    );
}
export default AthRouter;
