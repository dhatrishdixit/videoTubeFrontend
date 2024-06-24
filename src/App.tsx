import React, { useState } from "react";
import { Navbar } from "./components/Header/header";
import axios from "axios";
import { AppDispatch } from "./app/store";
import { useDispatch } from "react-redux";
import { logIn } from "./features/authentication/auth.slice";
import { UserState } from "./features/authentication/auth.slice";
import { Outlet } from "react-router-dom";


function App() {
  const dispatch = useDispatch<AppDispatch>() ;
  React.useEffect(()=>{     
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/get-current-user`,{
     withCredentials:true
    })
    .then((response) => {
      dispatch(logIn(response.data.data as UserState));
    })
 },[]);

 // outlet this into - main video page , search results , frontPage results/content , playlist results and watch history results
 
  return (
    <div>
      <div className="grid grid-rows-10 h-screen overflow-hidden w-screen">
        <div className="row-span-1">
           <Navbar/>
        </div>
      
        <Outlet/>
   
     </div>
  </div>
  );
}



export default App;
