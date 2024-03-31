import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export function ChannelPage() {
  const { channelId } = useParams();
  
  useEffect(()=>{
     axios
     .get(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/w/`,{
        withCredentials:true
       })
  },[channelId]);
  //video recent watch 
  //videos all with three filters - recent , old , top(most viewed) and most liked 
  //playlist
  //tweet
  return (
    <div></div>
  )
}

