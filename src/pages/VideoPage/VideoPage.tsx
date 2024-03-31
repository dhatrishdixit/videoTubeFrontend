import React,{useEffect, useRef, useState} from "react";
import { ReactPlayerProps } from "react-player";
import { Player } from "@/components/CustomVideoPlayer/Player";
import { Button } from "@/components/ui/button";
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatDate } from "@/utils/DateFormat";
import { useToast } from "@/components/ui/use-toast";
import { RecommendedVideo } from "@/components/Content/RecommendedVideo";
import { CommentPage } from "../CommentPage/CommentPage";
import { formatCount } from "@/utils/CountFormat";


function stringShortener(str:string):string {
  return str?.substring(0,100);
}
interface SubscribersArraySchema{
  _id?: string,
  subscriber?: string,
  channel?: string,
  createdAt?: string,
  updatedAt?: string,
  __v?: number
}

interface LikesArraySchema{
_id?: string,
video?: string,
likedBy?: string,
createdAt?: string,
updatedAt?: string,
__v?: number
}

interface CommentSchema{
_id?: string,
content?: string,
video?: string,
owner?: string,
createdAt?: string,
updatedAt?: string,
__v?: number
}
interface VideoPageSchema{
_id? : string,
videoFile?: string,
thumbnail?: string,
title?: string,
description?: string,
duration?: number,
views?: number,
isPublic?: boolean,
createdAt?:Date,
channel?:string,
channelId?: string,
channelEmail?: string,
channelName?: string,
channelAvatar?:string,
subscribers?:SubscribersArraySchema[],
likes?:LikesArraySchema[],
comments?:CommentSchema[],
subscribersCount?: number,
likesCount?: number,
commentsCount?:number,
isSubscribed?: boolean,
isLiked?: boolean,

}
interface LikedSchema{
  liked?:boolean,
  likedCount?:number
}

interface SubscribedSchema{
  subscribed?:boolean,
  subscribedCount?:number
}

export const MainVideoPage: React.FC<ReactPlayerProps> = () => {

  const [collapse,setCollapse] = useState<boolean>(true) ;
  const location = useLocation();
  const { toast } = useToast();
  const [data,setData] = useState<VideoPageSchema>({});
  const { videoId } = useParams() ;
  const [liked,setLiked] = useState<LikedSchema>({});
  const [subscribed,setSubscribed] = useState<SubscribedSchema>({});
  const initialLikeState = useRef<boolean|undefined>(undefined);
  const initialSubscribeState = useRef<boolean|undefined>(undefined);
  const currentLikeState = useRef<boolean|undefined>(undefined);
  const currentSubscribeState = useRef<boolean|undefined>(undefined);
  const currentChannelId = useRef<string|undefined>(undefined);
  const navigate = useNavigate();
  useEffect(()=>{
  
     axios
     .get(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/w/${videoId}`,{
      withCredentials:true
     })
     .then(response =>{
      setData(response.data.data);
      setSubscribed({
         subscribed:response.data.data.isSubscribed,
         subscribedCount:response.data.data.subscribersCount
      });
      setLiked({
         liked:response.data.data.isLiked,
         likedCount:response.data.data.likesCount
      });
      initialLikeState.current = response.data.data.isLiked;
      initialSubscribeState.current = response.data.data.isSubscribed;
      currentLikeState.current = response.data.data.isLiked;
      currentSubscribeState.current = response.data.data.isSubscribed;
      currentChannelId.current = response.data.data.channelId;
     })
     .catch(err => {
      toast({
        variant:"destructive",
        type:"foreground",
        description:err?.response?.data?.message
      })
     });

     
     
    return () =>{
     
      if(initialLikeState.current !== currentLikeState.current) {
        
         axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/v1/likes/toggle/v/${videoId}`,null,{
          withCredentials:true
        })
        .then(res => {
          console.log(res.data.message);
        })
        .catch(err=>{
          toast({
            variant:"destructive",
            type:"foreground",
            description:err?.response?.data?.message
          })
          console.log(err)
         })
      }
      if(initialSubscribeState.current!== currentSubscribeState.current) {
         axios
         .post(`${import.meta.env.VITE_BASE_URL}/api/v1/subscriptions/c/${currentChannelId.current}`,null,{
       
          withCredentials:true
        })
         .then(res=> {
          console.log(res.data.message);
         })
         .catch(err=>{
          toast({
            variant:"destructive",
            type:"foreground",
            description:err?.response?.data?.message
          })
          console.log(err)

         })
      }
  }
  },[videoId,location])


  


  return (
    <div className="mx-4 my-2 grid grid-cols-10 h-[90vh] overflow-y-scroll scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-track-white scrollbar-thumb-red-600" id="videoPage">
      <div className="col-span-6">
        <Player
          className="react-player"
          url={data.videoFile}
          thumbnail={data.thumbnail}
        ></Player>
        <p 
        className="text-3xl font-bold text-left mt-2"
        >{data.title}
        </p>

       <div className="mt-2 h-12 grid grid-cols-10 items-center">
       <img 
       src={data.channelAvatar} 
       className="h-12 w-12 rounded-full  col-span-1 cursor-pointer"
       onClick={()=>{
        navigate(`/channel/${data.channel}`)
       }}
       />
       <div 
       className="flex col-span-6 items-center gap-4 ml-2" >
        <div>
        <p className="text-lg text-bold text-left cursor-pointer"
        onClick={()=>{
            navigate(`/channel/${data.channel}`)
        }}
        >{data.channelName}</p>
         <p className="text-slate-500 text-sm text-left">{subscribed.subscribedCount} subscribers</p></div>
         <Button 
         variant="secondary" 
         className={`${!subscribed.subscribed? "rounded-xl dark:bg-red-600 bg-red-600 text-white hover:text-black" : ""} w-[96px]`}
         onClick={()=>{
             currentSubscribeState.current = !currentSubscribeState.current;
             setSubscribed(prev =>{
                 return {
                    subscribed:!prev.subscribed,
                    subscribedCount: prev.subscribed == true ? (prev.subscribedCount as number - 1) : (prev.subscribedCount as number + 1)
                 }
             })
         }}
          >
         {subscribed.subscribed?"subscribed":"subscribe"}
         </Button>
       </div>
       <Button className="w-max" variant="secondary" onClick={()=>{
         currentLikeState.current = !currentLikeState.current;
          setLiked(prev => {
               return {
                  liked : !prev.liked,
                  likedCount : prev.liked == true ? prev.likedCount as number - 1 : prev.likedCount as number + 1 
               }
           });
       }}> 
       {
        
        !liked.liked?<PiThumbsUpDuotone className="scale-150"/>:<PiThumbsUpFill className="scale-150"/>
       }
        <p className="ml-4">{formatCount(liked.likedCount as number)}</p>
        </Button>
      
       </div>
       <div className="w-[95%] dark:bg-[#272727] rounded-md my-4 bg-[#f1f1f1] pr-4">
   
        <p className="text-left pl-4 text-lg font-semibold pt-2">{data.views} views • {formatDate(data.createdAt as Date)}</p>
        <p className="text-left py-2 px-4">
        {
          (data?.description as string)?.length <= 99 ? data.description : (
            <>
            {collapse? stringShortener(data.description as string) : data.description}
            <Button variant="outline" className="dark:bg-[#272727] bg-[#f1f1f1] border-none border-0 text-gray-400" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"...more":"show less"}</Button>
            </>
          )
        }
        </p>

   
       </div>
      
        <CommentPage videoId={videoId as string} commentsCount={data.commentsCount as number}/>
        
      </div>
    
    
      <div className="col-span-4 ">
        <h4 className="text-center font-semibold">Recommendations</h4>

        <RecommendedVideo channelId={location?.state?.channelId}/>
      
      </div>


    </div>
  );
};
