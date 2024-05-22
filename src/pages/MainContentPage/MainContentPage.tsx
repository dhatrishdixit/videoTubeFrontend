import { SideBar } from "@/components/SideBar/sideBar";
import { Outlet } from "react-router-dom";
import { OffCanvasSideBarContextProvider } from "@/hooks/offCanvasSideBarContext";
import { useState } from "react";

export function MainContentPage(){

    const [isOpen,setIsOpen] = useState<boolean>(false);
   
    return(
        <OffCanvasSideBarContextProvider isOpen={isOpen} setIsOpen={setIsOpen}>
     <div className={`grid grid-cols-12 row-span-9`}>
     <div className={`col-span-1`}>
        <SideBar/>
     </div>
     <div className={`col-span-11`}>
        <Outlet/>
     </div>
  </div>
  </OffCanvasSideBarContextProvider>
 
    )
 
 }