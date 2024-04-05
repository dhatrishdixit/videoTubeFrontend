import { useState } from "react";
import { Button } from "../ui/button";
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
import { formatCount } from "@/utils/CountFormat";
import { formatDate } from "@/utils/DateFormat";

// const props = {
//     ownerAvatar: "https://res.cloudinary.com/dviowskng/image/upload/v1683962023/samples/food/fish-vegetables.jpg",
//     ownerFullname:"checking this",
//     content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
//     isLiked:true,
//     likes:100,
//     createdAt: "2 days ago"
// }
 
interface TweetCardProps {
    ownerAvatar: string;
    ownerFullname: string;
    content: string;
    isLiked: boolean;
    likes: number;
    createdAt: Date;
}

function stringShortener(str:string):string {
    return str?.substring(0,400);
  }


export function TweetCard(props:TweetCardProps){
    const [collapse,setCollapse] = useState<boolean>(true);
    const [isLiked,setIsLiked] = useState<boolean>(props.isLiked);


    

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
            <Button variant="outline" className="bg-transparent border-none border-0 text-gray-400" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"...more":"show less"}</Button>
            </>
          )
        }</div><p onClick={()=>{
            setIsLiked(prev => !prev)
        }}
        className="flex"
        >{
             <div>{isLiked ? <PiThumbsUpFill scale="300" className="mb-2 text-xl"/> : <PiThumbsUpDuotone scale="300" className="mb-2 text-xl"/>}</div>
        }<span className="ml-2 font-normal text-sm text-slate-500 select-none">{formatCount(props.likes)}</span></p>
            </div>
        </div>
    )
}