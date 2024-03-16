import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Navbar } from "./components/Header/header";
import { MainPage} from "./pages/MainPage/MainPage";
import axios from "axios";
import { AppDispatch } from "./app/store";
import { useDispatch } from "react-redux";
import { logIn } from "./features/authentication/auth.slice";
import { UserState } from "./features/authentication/auth.slice";
 

function App() {
  const dispatch = useDispatch<AppDispatch>() ;
  React.useEffect(()=>{ 
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/get-current-user`,{
     withCredentials:true
    })
    .then((response) => {
      dispatch(logIn(response.data.data as UserState));
    })
 },[])
 
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
