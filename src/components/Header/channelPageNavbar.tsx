import { useEffect, useState } from "react";
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

type NavigationStateType  = "videos" | "community" | "playlist" | "about" ;

export function ChannelPageNavbar(){
    const [navigationState,setNavigationState] = useState<NavigationStateType>("videos");
    const navigate = useNavigate();
    useEffect(()=>{
         navigate("videos")
    },[])
    return (
      <nav className="sticky top-0 z-10 py-4">
        <div className="w-full flex justify-evenly ">
            <Button 
            
             variant="ghost"
             onClick={() => {
              setNavigationState("videos")
              navigate("videos")
           }}
             className={navigationState === "videos" ? "bg-secondary/80" : ""}
             
             >
              Videos
            </Button>
            <Button 
             variant="ghost"
             onClick={() => {
              setNavigationState("community")
                navigate("community")
             }}
             className={navigationState === "community" ? "bg-secondary/80" : ""}
            >
              Community
            </Button>
            <Button 
             variant="ghost"
             onClick={() => {
              setNavigationState("playlist")
              navigate("playlists")
           }}
           className={navigationState === "playlist" ? "bg-secondary/80" : ""}
             >
               Playlist
            </Button>
            <Button 
            variant="ghost"
            onClick={() => {
              setNavigationState("about")
              navigate("about")
           }}
           className={navigationState === "about" ? "bg-secondary/80" : ""}
            >
                About
            </Button>
        </div>
        </nav>
    )
}

