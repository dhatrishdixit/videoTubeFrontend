import { CommentCard } from "@/components/Card/commentCard"
import { InputPost } from "@/components/ui/inputPost"
import React, { useEffect, useRef, useState } from "react" ;
import { UseSelector } from "react-redux";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const data = {
    commentsCount:100000
}

interface CommentPageSchema {
    videoId:string
}
export const CommentPage:React.FC<CommentPageSchema> = ({videoId}) =>{
    //{{localServer}}/comments/:videoId
    //TODO: block send button while loading
    // similar like implementation as in videos as in videos , implement directly in comment card  
    // add edit functionality and delete functionality to with respect to input card for all the comment card 
    // maintain a varible based on which which refresh comment section 
    // one variable for firing a api call for all comments again 


    const { toast } = useToast();
    const [commentData,setCommentData] = useState();
    const [loading,setLoading] = useState<boolean>(false);
    const [post,setPost] = useState();
    const [apiCall,setApiCall] = useState<number>(0);
    // changes this everytime there is any update to get the comments 

    useEffect(()=>{
       // use this to get all the comments 
       //{{localServer}}/comments/:videoId

      axios.get(``)

    },[videoId,apiCall]);

    useEffect(()=>{

    },[])
    
    // const inputRef = useRef<HTMLInputElement|null>(null);
    const inputRef = React.createRef<HTMLInputElement>();

    const postComment = async () =>{
          setLoading(true);
    //       const response = await fetch(`${process.env.localServer}/comments/${videoId}`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(post),
    //       });
    //       const data = await response.json();
    //       setLoading(false);
    //       if(response.status === 200){
    //           setCommentData(data);
    //       }else{
    //           toast({
    //               title: "Error",
    //               description: data.message,
    //               status: "error",
    //               duration: 9000,
    //               isClosable: true,
    //           });
    //       }
    // }        

    }
    return(
   <div className=" w-[95%] dark:bg-[#272727] rounded-md my-4 bg-[#f1f1f1] text-left px-4 py-4">
    <p className="text-xl font-bold">{(data.commentsCount as number)?.toLocaleString("en-US")} Comments</p>
    <div className="my-4 flex items-center ">
    <img src={
    //data?.userAvatar 
     "https://res.cloudinary.com/dviowskng/image/upload/v1683962024/samples/food/pot-mussels.jpg"} className="h-12 w-12 rounded-full "/>

    <InputPost placeholder="comment" className="w-[80%] ml-6 border-b" ref={inputRef} postComment={postComment}/>
  </div>

<CommentCard/>
<CommentCard/>
<CommentCard/>
<CommentCard/>
<CommentCard/>
<CommentCard/>
<CommentCard/>
<CommentCard/>
</div>


    )
}