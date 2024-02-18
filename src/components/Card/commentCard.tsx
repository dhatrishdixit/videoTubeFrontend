import React from 'react';
import { Button } from '../ui/button';
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";

//what you will want commentId and userId along with that ownerID avatar and channel fullname

const data = {

    commentId:"65b9180f109fca8883d94213",
    content:"this is the first comment",
    videoId: "65b733bbb6c7a24d28083ae8",
    ownerId: "65b733bbb6c7a24d28083ae8",
    // write an outlook to get info commentator like avatar fullname 
    // "2024-01-30T15:38:55.918Z" update it to something like months ago or year ago
    createdAt:"1 year",
    ownerAvatar:"https://res.cloudinary.com/dviowskng/image/upload/v1683962026/samples/bike.jpg",
    ownerFullName : "dhatrish dixit",
    ownerUserName : "dhatrishdixit",
    isLiked: true ,
    // to check whether liked by the user or not
}

//TODO: i have an idea instead of updating and making server requests every time why dont we maintain an array of changes or an object whatever 

// TODO: write interface for props write now i am doing just 

export const CommentCard : React.FC = (
    // props 
) => {
    // we will get userId and videoId then we will have to query fot comments having same videoId ,
    
    return(
        <div>
        <img src={data.ownerAvatar} className='h-12 w-12 rounded-full'/>
         <text>@{data.ownerUserName}</text>
         <text>{data.content}</text>
         <text>{data.createdAt}</text>
         <Button
          variant="ghost"
          className='w-fit'
          onClick={()=>{
                // use this to toggle likes 
                // or update that array 
            }}
         >{data.isLiked ? <PiThumbsUpFill/> : <PiThumbsUpDuotone/> 
         // use this button to toggle 
         }</Button>
        </div>
    )
}