import { SideBar } from "@/components/SideBar/sideBar";
import { Outlet } from "react-router-dom";

export function MainContentPage(){
   
    return(
     <div className="grid grid-cols-12 row-span-9">
     <div className="col-span-2">
        <SideBar/>
     </div>
     <div className="col-span-10">
        <Outlet/>
     </div>
  </div>
 
    )
 
 }