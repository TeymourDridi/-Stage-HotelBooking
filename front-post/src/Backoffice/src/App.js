import Sidebar from "./components/sidebar/Sidebar";

import "./App.css";

import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import UserList from "./pages/userList/userList";

import React from "react";
import NewHotel from "./pages/NewHotel/NewHotel";
import Hotel from "./pages/Hotel/Hotel";
import HotelList from "./pages/HotelList/HotelList";

import Stats from "./pages/Stats/Stats";

import TopBar from "./components/TopBar/TopBar";
import {useNavigate} from "react-router";



function App() {
    let navigate=useNavigate();
  return (
    <div>
      <TopBar navigate={navigate} />

      <div className="contTback">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Stats navigate={navigate} />}/>


          <Route path="/users" element={<UserList navigate={navigate} />}/>






          <Route path="/hotels" element={<HotelList navigate={navigate} />}/>




          <Route path="/hotel/:courseId" element={<Hotel navigate={navigate} />}/>




          <Route path="/newhotel" element={<NewHotel navigate={navigate} />}/>


          <Route path="/stats" element={<Stats navigate={navigate} />}/>


        </Routes>
      </div>
    </div>
  );
}

export default App;
