import logo from './logo.svg';
import './App.css';
import styled, {css} from "styled-components";
import {useSelector} from "react-redux";
import BackRouter from "./Router/BackRouter";


const App = () => {
  /*const user = useSelector(state =>state.Auth.user);
  console.log("current user ",user);*/
  const smallScreen = window.screen.width <= 480 ? true : false;

  return (
      <>


        <BackRouter />



      </>
  );
};

export default App;


