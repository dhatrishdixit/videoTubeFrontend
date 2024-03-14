import React from "react";
import { SideBar } from "@/components/SideBar/sideBar";
import { Navbar } from "@/components/Header/header";
import { MainVideoPage } from "../VideoPage/VideoPage";
import { ContentLoading,  ContentSearch } from "@/components/Content/content";
import InfiniteScroll from 'react-infinite-scroll-component';


// adding infinite scroll here 
export const MainPage = () => {
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
         
            <ContentLoading/>
       
            {/* <ContentSearch/> */}
            {/* <MainVideoPage /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
