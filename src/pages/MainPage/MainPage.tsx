import React from "react";
import { SideBar } from "@/components/SideBar/sideBar";
import { Navbar } from "@/components/Header/header";
import { MainVideoPage } from "../VideoPage/VideoPage";
import { ContentMain, ContentSearch } from "@/components/Content/content";


export const MainPage = () => {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen overflow-y-hidden">
        <div className=" col-span-2">
          <SideBar />
        </div>
        <div className=" grid grid-rows-10  col-span-10">
          <div className="row-span-1">
            <Navbar />
          </div>
          <div className="row-span-9">
            {
              //TODO: have outlet here
              //  <ContentMain/>
            }
            {/* <ContentMain/> */}
            {/* <ContentMain/> */}
            <ContentSearch/>
            {/* <MainVideoPage /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
