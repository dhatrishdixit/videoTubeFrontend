import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from '@/utils/DateFormat';
//what you will want commentId and userId along with that ownerID avatar and channel fullname


//TODO: i have an idea instead of updating and making server requests every time why dont we maintain an array of changes or an object whatever 

// TODO: write interface for props write now i am doing just 
// add Props to this also 



interface CommentCardSchema {
   _id:string,
   content:string,
   video:string,
   createdAt:Date,
   owner:string,
   ownerUsername:string,
   ownerAvatar:string,
   likes:number,
   isEditable:boolean,
   isLiked:boolean
}

export const CommentCard  = ((
    props:CommentCardSchema
) => {
  
  const [hover,setHover] = useState<boolean>(false);
  const [collapse,setCollapse] = useState<boolean>(true) ;
  function stringShortener(str:string):string {
       return str?.substring(0,119);
  }
    // we will get userId and videoId then we will have to query fot comments having same videoId,

    

    
    return(
        <div className='flex justify-between items-start ' 
        onMouseOver={()=>{setHover(true)}}
        onMouseOut={()=>{setHover(false)}}
        >
          <div className='flex'>
        <img src={props.ownerAvatar} className='h-12 w-12 rounded-full'/>
        <div className='flex flex-col ml-4'>
        <div className='flex flex-row'> 
        <span> @{props.ownerUsername}</span>
        <span className='text-gray-400 ml-2'>&nbsp;{formatDate(props.createdAt)}</span>
        </div>
        
         <span>     {
          props?.content?.length <= 120 ? props.content : (
            <>
            {collapse? `${stringShortener(props.content)}...`: props.content}
            <Button variant="outline" className="dark:bg-[#272727] bg-[#f1f1f1] border-none border-0 text-gray-400 block p-0" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"show more":"show less"}</Button>
            </>
          )
        }</span>
         <div className='flex '>
         <Button
          variant="ghost"
          className='w-fit'
          onClick={()=>{
                // use this to toggle likes 
                // or update that array 
            }}
         >{props.isLiked ? <PiThumbsUpFill className='scale-150'/> : <PiThumbsUpDuotone className='scale-150'/> 
         // use this button to toggle

         }</Button> <p className='mt-1'>{props.likes}</p>
         </div>
         <span className="h-[0.1rem] w-full bg-gray-400 my-2"></span>
        </div>
        </div>
        {
          hover == true && props.isEditable == true ? (
            <div className='mt-4 cursor-pointer'>
            <BsThreeDotsVertical />
            {
              // on clicking edit navigate to input 
              // navigate(/#input)
            }
         </div>
          ):null
        }
        </div>
    )
})