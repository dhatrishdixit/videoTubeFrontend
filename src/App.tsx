import React, { useState } from "react";
import { Navbar } from "./components/Header/header";
import axios from "axios";
import { AppDispatch } from "./app/store";
import { useDispatch } from "react-redux";
import { logIn } from "./features/authentication/auth.slice";
import { UserState } from "./features/authentication/auth.slice";
import { Outlet } from "react-router-dom";
import { SideBar } from "./components/SideBar/sideBar";
import { FrontPageContent } from "./components/Content/FrontPageContent";
import { MainVideoPage } from "./pages/VideoPage/VideoPage";

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

 // outlet this into - main video page , search results , frontPage results/content , playlist results and watch history results
 
  return (
    <div>
    <div className="grid grid-cols-12 h-screen overflow-y-hidden w-screen">
      <div className= "col-span-2">
        <SideBar />
      </div>
      <div className=" grid grid-rows-10  col-span-10">
        <div className="row-span-1">
          <Navbar />
        </div>
        <div className="row-span-9">
          <Outlet/>

      
        </div>
      </div>
    </div>
  </div>
  );
}

export default App;
