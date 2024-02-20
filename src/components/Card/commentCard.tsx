import React from 'react';
import { Button } from '../ui/button';
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";

//what you will want commentId and userId along with that ownerID avatar and channel fullname

const data = {

    commentId:"65b9180f109fca8883d94213",
    content:"this is the first comment lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitiamolestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias archite",
    videoId: "65b733bbb6c7a24d28083ae8",
    ownerId: "65b733bbb6c7a24d28083ae8",
    // write an outlook to get info commentator like avatar fullname 
    // "2024-01-30T15:38:55.918Z" update it to something like months ago or year ago
    createdAt:"1 year",
    ownerAvatar:"https://res.cloudinary.com/dviowskng/image/upload/v1683962026/samples/bike.jpg",
    ownerFullName : "dhatrish dixit",
    ownerUserName : "dhatrishdixit",
    isLiked: true ,
    likeCount:5
    // to check whether liked by the user or not
    // check the like count in backend 
}

//TODO: i have an idea instead of updating and making server requests every time why dont we maintain an array of changes or an object whatever 

// TODO: write interface for props write now i am doing just 

export const CommentCard : React.FC = (
    // props 
) => {

  const [collapse,setCollapse] = React.useState<boolean>(true) ;
  function stringShortener(str:string):string {
       return str.substring(0,119);
  }
    // we will get userId and videoId then we will have to query fot comments having same videoId,
    // TODO: add block option in this 
    return(
        <div className='flex'>
        <img src={data.ownerAvatar} className='h-12 w-12 rounded-full'/>
        <div className='flex flex-col ml-4'>
        <div className='flex flex-row'> 
        <text> @{data.ownerUserName}</text>
        <text className='text-gray-400 ml-2'>&nbsp;{data.createdAt}</text>
        </div>
        
         <text>     {
          data.content.length <= 120 ? data.content : (
            <>
            {collapse? `${stringShortener(data.content)}...`: data.content}
            <Button variant="outline" className="dark:bg-[#272727] bg-[#f1f1f1] border-none border-0 text-gray-400 block p-0" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"show more":"show less"}</Button>
            </>
          )
        }</text>
         
         <Button
          variant="ghost"
          className='w-fit'
          onClick={()=>{
                // use this to toggle likes 
                // or update that array 
            }}
         >{data.isLiked ? <PiThumbsUpFill className='scale-150'/> : <PiThumbsUpDuotone className='scale-150'/> 
         // use this button to toggle

         }</Button> 
         <span className="h-[0.1rem] w-full bg-gray-400 my-2"></span>
        </div>

        </div>
    )
}