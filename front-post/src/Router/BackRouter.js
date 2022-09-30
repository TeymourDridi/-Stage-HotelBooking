import React, {useEffect, useRef, useState} from 'react';
import {Route, Switch, BrowserRouter, Routes} from 'react-router-dom';

import styled, {css} from "styled-components";
import FrontRouter from "./FrontRouter";
import App from "../Backoffice/src/App";
import {Navigate, useNavigate} from "react-router";
import axios from "axios";
import {productRows} from "../Backoffice/src/dummyData";
import {Toast} from "primereact/toast";


const BackRouter = (props) => {
    let user = localStorage.getItem('user')
    let toast = useRef()
    return (

        <BrowserRouter>
            <Toast ref={toast}/>

            <Routes>



                <Route exact path=""  element={<Navigate replace to={'/home'} />}/>
                <Route exact path="/*" element={<FrontRouter toast={toast} />}/>
                <Route path="/back/*" element={<App toast={toast} />}/>
                <Route path="*"  element={<Navigate replace to={'/home'} />}/>


            </Routes>
        </BrowserRouter>
    );
}
export default BackRouter;
