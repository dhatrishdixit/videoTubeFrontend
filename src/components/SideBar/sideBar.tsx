import { Button } from "../ui/button";
import axios from "axios";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { useSidebar } from "@/hooks/offCanvasSideBarContext";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { Logo } from "../logo/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// if no use for useSideBar than remove it 

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



type selectTypes = "home" | "settings" | "watchHistory" | "like" | "playlist";

export function SideBar() {
  const [select,setSelect] = useState<selectTypes>("home");
  const [open,onOpenChange] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <div
      className=" h-screen overflow-x-hidden
        dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white scrollbar-thin mt-4 flex flex-col gap-4 items-center"
    >
       <Sheet open={open} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <Button variant="outline"><AiOutlineMenuUnfold className='scale-150'/></Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-screen sm:w-[25vw] h-[100vh] overflow-y-scroll scrollbar-thin  scrollbar-thumb-red-600 
             scrollbar-track-white
             dark:scrollbar-track-[#09090b]">
            <SheetHeader className="flex flex-row gap-2 cursor-pointer"
            onClick={()=>{
              setSelect("home");
              navigate("/");
              onOpenChange(false);
            }}
            >
              <Logo/><span className="text-red-600 font-bold text-2xl">ClipSync</span>

            </SheetHeader>
            <div className="grid gap-4 py-4">
    <Button variant={select == "home" ? "default":"outline"} 
    onClick={()=>{
        setSelect("home");
        navigate("/");
        onOpenChange(false);
      }}
      className="grid grid-cols-10"
      >  
    <MdOutlineHome className='scale-150 col-span-2'/>
    <span className="text-center col-span-5">Home</span>
    </Button>

    <Button variant={select == "watchHistory" ? "default":"outline"} 
    onClick={()=>{
       setSelect("watchHistory");
       navigate("/watchHistory");
       onOpenChange(false);
    }}
    className="grid grid-cols-10"
    >  
    <GoHistory className='scale-150 col-span-2'/>
    <span className="text-center col-span-5">Watch History</span>
    </Button>
    <Button variant={select == "like" ? "default":"outline"} 
    onClick={()=>{
      setSelect("like");
      navigate("/liked");
      onOpenChange(false);
    }}
    className="grid grid-cols-10"
    >  
    <AiOutlineLike  className='scale-150 col-span-2'/>
    <span className="text-center col-span-5">Liked Video</span>
    </Button>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger> <Button variant="ghost" 
    onClick={()=>{
      setSelect("playlist");
    }}
    className="grid grid-cols-10"
    >
     <MdOutlinePlaylistPlay className='scale-150 col-span-2'/>
     <span className="text-center col-span-5">Playlists</span>
     </Button></AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      </Accordion>
      <Button variant={select == "settings" ? "default":"outline"}
    onClick={()=>{
      setSelect("settings");
      navigate("/settings");
      onOpenChange(false);
    }}
    className="grid grid-cols-10">  
    <IoSettingsOutline className='scale-150 col-span-2'/>
    <span className="text-center col-span-5">Settings</span>
    </Button>
   
            </div>
            <SheetFooter>
              <p>made by <a href="https://github.com/dhatrishdixit" className=" text-blue-500">@dhatrishDixit</a></p>
            </SheetFooter>
          </SheetContent>
        </Sheet>

    <Button variant={select == "home" ? "default":"outline"} 
    onClick={()=>{
        setSelect("home");
        navigate("/");
      }}>  
    <MdOutlineHome className='scale-150'/>
    </Button>
    <Button variant={select == "settings" ? "default":"outline"}
    onClick={()=>{
      setSelect("settings");
      navigate("/settings");
    }}>  
    <IoSettingsOutline className='scale-150'/>
    </Button>
    <Button variant={select == "watchHistory" ? "default":"outline"} onClick={()=>{
       setSelect("watchHistory");
       navigate("/watchHistory");
    }}>  
    <GoHistory className='scale-150'/>
    </Button>
    <Button variant={select == "like" ? "default":"outline"} onClick={()=>{
      setSelect("like");
      navigate("/liked");
    }}>  
    <AiOutlineLike  className='scale-150'/>
    </Button>
    <Button variant={select == "playlist" ? "default":"outline"} 
    onClick={()=>{
      setSelect("playlist");
      navigate("/userPlaylist");
    }}>
     <MdOutlinePlaylistPlay className='scale-150'/>
     </Button>  
    
      {/*
  


      
      
      
      
      {arr.map((curr,index) => (
        <Button
          variant={curr.variant}
          className="w-full mt-2  hover:bg-red-600  "
          onClick={curr.clickHandler}
          key={index}
        >
          {curr.name}
        </Button>
      ))} */}
    </div>
  );
}
