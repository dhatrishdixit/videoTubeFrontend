import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
import { formatCount } from "@/utils/CountFormat";
import { formatDate } from "@/utils/DateFormat";
import axios from "axios";
import { useToast } from "../ui/use-toast";

export interface TweetCardProps {
    ownerAvatar: string;
    ownerFullname: string;
    content: string;
    isLiked: boolean;
    likes: number;
    createdAt: Date;
    _id:string
}

function stringShortener(str:string):string {
    return str?.substring(0,400);
  }

interface LikeStatusSchema{
    isLiked:boolean;
    likesCount:number;
}


export function TweetCard(props:TweetCardProps){
    const {toast} = useToast();
    const [collapse,setCollapse] = useState<boolean>(true);
    const isLiked = useRef<boolean>(props.isLiked);
    const [likedStatus,setLikedStatus] = useState<LikeStatusSchema>({
        isLiked:props.isLiked,
        likesCount:props.likes
    })
    // TODO: add download button to video and make backend for it 
    console.log(likedStatus)
    useEffect(()=>{
        return (
            () => {
              console.log("function unmounted")
              console.log(props.isLiked,likedStatus.isLiked)
              if(props.isLiked !== isLiked.current){
                axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/likes/toggle/t/${props._id}`,null,{
                    withCredentials:true
                })
                .then(res => toast({
                    variant:"success",
                    type:"foreground",
                    description:res.data.message
                }))
                .catch(err => console.log(err.response.data))
              }
            }
        )
    },[])

    return(
        <div className="border border-slate-600 rounded-2xl my-4 flex gap-2 p-2">
            <img src={props.ownerAvatar} className="rounded-full w-12 h-12 ml-2"/>
            <div className="flex flex-col" >
               <div className="font-semibold text-xl my-2 flex gap-2">
                <div>{props.ownerFullname}</div>
                <div className=" text-slate-400 font-normal text-sm mt-1">{formatDate(props.createdAt)}</div>
                </div>
               <div>   {
          (props.content  as string)?.length <= 99 ? props.content  : (
            <>
            {collapse? stringShortener(props.content as string) : props.content }
            <Button variant="outline" className="cursor-pointer bg-transparent border-none border-0 text-gray-400" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"...more":"show less"}</Button>
            </>
          )
        }</div>
        <p onClick={()=>{
            isLiked.current = !isLiked.current
            setLikedStatus(likeStatus => {
                
                  return (
                
                    {
                        isLiked : !likeStatus.isLiked,
                        likesCount : likeStatus.isLiked ? likeStatus.likesCount -1 : likeStatus.likesCount + 1
                    }
                  )
            })
        }}
        className="flex mt-2 cursor-pointer"
        >
        {
             <div>{likedStatus.isLiked ? <PiThumbsUpFill scale="300" className="mb-2 text-xl"/> : <PiThumbsUpDuotone scale="300" className="mb-2 text-xl"/>}</div>
        }
        <span className="ml-2 font-normal text-sm text-slate-500 select-none">
        {formatCount(likedStatus.likesCount)}
        </span>
        </p>
            </div>
        </div>
    )
}