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


// in place of this have userInfo about user
type btnTypes = {
  name: string;
  clickHandler: () => void;
  variant:
    | "outline"
    | "secondary"
    | "destructive"
    | "link"
    | "default"
    | "ghost"
    | null
    | undefined;
};
const arr: btnTypes[] = [
  {
    name: "Home",
    clickHandler: function () {
      // navigate to home page
    },
    variant: "outline",
  
  },
  {
    name: "Subscriptions",
    clickHandler: function () {
      // direct to subscription page
    },
    variant: "outline",
  },
  {
    name: "History",
    clickHandler: function () {
      //direct to watch history page
    },
    variant: "outline",
  },
  {
    name: "Playlists",
    clickHandler: function () {
      // direct to all the playlists
    },
    variant: "outline",
  },
  {
    name: "Liked Videos",
    clickHandler: function () {
      //direct to all the liked videos
    },
    variant: "outline",
  },
  {
    name:"Settings",
    clickHandler:function(){
      // open settings page 
    },
    variant:"outline"
  },

  {
    name: "Logout",
    clickHandler: function () {
      // call logout route
    },
    variant: "secondary",
  },
  {
    name: "Delete account",
    clickHandler: function () {
      // firstgive out a pop up window to confirm and once confirmed delete the account of the user
    },
    variant: "destructive",
  },
];

type selectTypes = "home" | "settings" | "watchHistory" | "like" | "playlist";

export function SideBar() {
  const [select,setSelect] = useState<selectTypes>("home");
  const navigate = useNavigate();
  return (
    <div
      className=" h-screen overflow-x-hidden
        dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white scrollbar-thin mt-4 flex flex-col gap-4 items-center"
    >
       <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">     <AiOutlineMenuUnfold className='scale-150'/></Button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Make changes to your profile here. Click save when you're done.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

    <Button variant={select == "home" ? "default":"outline"} onClick={()=>{
        setSelect("home");
        navigate("/");
      }}>  
    <MdOutlineHome className='scale-150'/>
    </Button>
    <Button variant={select == "settings" ? "secondary":"outline"}
    onClick={()=>{
      setSelect("settings");
      navigate("/settings");
    }}>  
    <IoSettingsOutline className='scale-150'/>
    </Button>
    <Button variant={select == "watchHistory" ? "secondary":"outline"} onClick={()=>{
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
    <Button variant={select == "playlist" ? "default":"outline"} onClick={()=>{
      setSelect("playlist");
      navigate("/userPlaylist");
    }}>
     <MdOutlinePlaylistPlay className='scale-150'/>
     </Button>  
    
      {/*
  

import { MdOutlinePlaylistPlay } from "react-icons/md";
      
      
      
      
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
