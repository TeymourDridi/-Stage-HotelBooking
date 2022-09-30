import React, {useRef} from 'react';
import { Route, Switch, BrowserRouter,Routes } from 'react-router-dom';


import styled, {css} from "styled-components";


import AthRouter from "./AthRouter";
import Navbar from "../mainpages/Navbar";
import Mainrouter from "../mainpages/Mainrouter";
import {Navigate, useNavigate} from "react-router";
import {Toast} from "primereact/toast";



const FrontRouter = (props) =>{

    let navigate=useNavigate();


    return (
        <div>

            <Routes>

                <Route exact path="/auth/*" element={<AthRouter navigate={navigate} toast={props.toast}/>}/>
                <Route exact path="/*" element={<Mainrouter navigate={navigate} toast={props.toast}/>}/>
                <Route path="*"  element={<Navigate replace to={'/home'} />}/>
            </Routes>

        </div>
    );
}
export default FrontRouter;
