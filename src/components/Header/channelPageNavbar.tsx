import React, { useEffect } from "react";
import { Button } from '../ui/button';
import { useLocation,useNavigate } from 'react-router-dom';

export function ChannelPageNavbar(){

    const navigate = useNavigate();
    useEffect(()=>{
         navigate("videos")
    },[])
    return (
        <div className="w-full flex justify-evenly">
            <Button 
             variant="ghost"
             onClick={() => {
              navigate("videos")
           }}
             >
              Videos
            </Button>
            <Button 
             variant="ghost"
             onClick={() => {
                navigate("community")
             }}
            >
              Community
            </Button>
            <Button 
             variant="ghost"
             onClick={() => {
              navigate("playlists")
           }}
             >
               Playlist
            </Button>
            <Button 
            variant="ghost"
            onClick={() => {
              navigate("about")
           }}
            >
                About
            </Button>
        </div>
    )
}

