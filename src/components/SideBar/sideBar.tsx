import { Button } from "../ui/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
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
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "@/app/store";
import { MdFeaturedPlayList } from "react-icons/md";
import { useLocation } from "react-router-dom";


type selectTypes = "home" | "settings" | "watchHistory" | "liked" | "userPlaylist" | "dashBoard";


interface userPlaylistSchema {
   _id:string;
   name:string;
   description:string;
   videos:string[];
   owner:string;
   createdAt:Date;
   updatedAt:Date;
}

export function SideBar() {
  const [select,setSelect] = useState<selectTypes>("home");
  const [open,onOpenChange] = useState<boolean>(false);
  const navigate = useNavigate();
  const userId = useSelector((state:RootState) => state.authorization!.userData._id);
  const [userPlaylist,setUserPlaylist] = useState<userPlaylistSchema[]>([]);
  const [playlistId,setPlaylistId] = useState<string>("");
  const location = useLocation();
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/user/${userId}`,{
      withCredentials:true
    }).then((res)=>setUserPlaylist(res.data.data));
  },[userId])


  useEffect(()=>{
    const url = location?.pathname ?? "";
    
    if(url){
       const match  = (url!)?.match(/[^/]+$/);
       if(match){
        setPlaylistId(match[0]);
       }
    }
  },[location,location?.pathname])

  useEffect(()=>{
      
      const pathUrl = location?.pathname.split("/")[1];
      if(pathUrl.length == 0){
        setSelect("home");
      }else{
        setSelect(pathUrl as selectTypes);
      }
  },[])
  

  //TODO: think of adding subscription or may not
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
    <Button variant={select == "liked" ? "default":"outline"} 
    onClick={()=>{
      setSelect("liked");
      navigate("/liked");
      onOpenChange(false);
    }}
    className="grid grid-cols-10"
    >  
    <AiOutlineLike  className='scale-150 col-span-2'/>
    <span className="text-center col-span-5">Liked Video</span>
    </Button>
    <Accordion type="single" collapsible className="w-full dark:text-primary-foreground shadow">
      <AccordionItem value="item-1" className="border rounded-md ">
        <AccordionTrigger className="hover:no-underline	mr-2"> 
     <MdOutlinePlaylistPlay className='scale-150 col-span-2 ml-4'/>
     <span className="text-center col-span-5">Playlists</span>
     </AccordionTrigger>
        <AccordionContent>
          {
            userPlaylist.length == 0 ? (<span className="text-center ml-6">No playlists </span>):(<div>
                        {
                          userPlaylist.map(playlist => (
                            <Button className="flex flex-row gap-4 cursor-pointer border-none w-full px-6 justify-start my-2" variant={`${playlistId == playlist._id ? "secondary" : "outline"}`}
                            key={playlist._id}
                            onClick={()=>{
                              navigate(`/playlist/${playlist._id}`);
                              onOpenChange(false);
                              setSelect("userPlaylist");
                            }}
                            >  
                            <MdFeaturedPlayList className='scale-150'/>
                              <span>{playlist.name.length > 27 ? `${playlist.name.substring(0,27)}...` : playlist.name}</span>
                            </Button>
                          ))
                        }      
            </div>)
          }
   
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
    <Button variant={select == "dashBoard" ? "default":"outline"}
    onClick={()=>{
      setSelect("dashBoard");
      navigate("/dashBoard");
      onOpenChange(false);
    }}
    className="grid grid-cols-10">  
    <LuLayoutDashboard className='scale-150 col-span-2'/>
    <span className="text-center col-span-5">DashBoard</span>
    </Button>
            </div>
            <SheetFooter className="flex justify-start w-full">
              <span>made by <a href="https://github.com/dhatrishdixit" className=" text-blue-500">@dhatrishDixit</a></span>
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
    <Button variant={select == "watchHistory" ? "default":"outline"} onClick={()=>{
       setSelect("watchHistory");
       navigate("/watchHistory");
    }}>  
    <GoHistory className='scale-150'/>
    </Button>
    <Button variant={select == "liked" ? "default":"outline"} onClick={()=>{
      setSelect("liked");
      navigate("/liked");
    }}>  
    <AiOutlineLike  className='scale-150'/>
    </Button>
    <Button variant={select == "userPlaylist" ? "default":"outline"} 
    onClick={()=>{
      setSelect("userPlaylist");
      navigate("/userPlaylist");
      //TODO: direct to channel page or use that page content for this user playlist page get it 
    }}>
     <MdOutlinePlaylistPlay className='scale-150'/>
     </Button>  
     <Button variant={select == "settings" ? "default":"outline"}
    onClick={()=>{
      setSelect("settings");
      navigate("/settings");
    }}>  
    <IoSettingsOutline className='scale-150'/>
    </Button>
    

    </div>
  );
}
