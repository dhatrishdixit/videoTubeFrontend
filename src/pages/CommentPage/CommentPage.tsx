import { CommentCard } from "@/components/Card/commentCard"
import { InputPost } from "@/components/ui/inputPost"
import React, { useEffect, useRef, useState } from "react" ;
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { usePaginate } from "@/hooks/Pagination";

export interface CommentCardSchema {
    _id: string;
    content: string;
    video: string;
    owner: string;
    createdAt: Date;
    ownerAvatar: string;
    ownerUsername: string;
    likes: number,
    isEditable: boolean,
    isLiked: boolean
}


interface CommentPageSchema {
    videoId:string
    commentsCount:number
}
export const CommentPage:React.FC<CommentPageSchema> = ({videoId,commentsCount}) =>{
    //{{localServer}}/comments/:videoId
    //TODO: block send button while loading
    // similar like implementation as in videos as in videos , implement directly in comment card  
    // add edit functionality and delete functionality to with respect to input card for all the comment card 
    // maintain a varible based on which which refresh comment section 
    // one variable for firing a api call for all comments again 
    //TODO: comments limit per page == 20 
    // FIXME: remember using pageNum + 1 to show the page number 
    // FIXME: pass this through url of usePagination = /comments/${videoId}
    // TODO: initially sort on the basis of most liked 
    // make it bg to something like white 
    // TODO: for mostLiked query send the query = &ascending=true

    const {_id,username,avatar} = useSelector((state:RootState) => state.authorization.userData)
    const { toast } = useToast();
    const [commentData,setCommentData] = useState<CommentCardSchema[]>([]);
    const [loading,setLoading] = useState<boolean>(false);
    const [post,setPost] = useState();
    const [apiCall,setApiCall] = useState<number>(0);
    // changes this everytime there is any update to get the comments 
    const cardRef = useRef<HTMLDivElement>();
    useEffect(()=>{
       // use this to get all the comments 
       //{{localServer}}/comments/:videoId
   

      axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/comments/${videoId}`,{
        withCredentials:true
      })
      .then((res)=>{
           setCommentData(res.data.data);
           console.log("commentData: ",res.data.data)
      })
      .catch(err=>{
        console.log(err);
        toast({
          variant:"destructive",
          type:"foreground",
          description:err.response.data.message
        })
      })

    },[videoId,apiCall]);

    useEffect(()=>{
   
    },[])
    
    const inputRef = React.createRef<HTMLInputElement>();

    const postComment = async () =>{
          setLoading(true);
   

    }
    return(
   <div className=" w-[95%] dark:bg-[#272727] rounded-md my-4 bg-[#f1f1f1] text-left px-4 py-4">
    <p className="text-xl font-bold">{(commentsCount as number)?.toLocaleString("en-US")} Comments</p>
    <div className="my-4 flex items-center ">
    <img src={avatar} className="h-12 w-12 rounded-full "/>

    <InputPost placeholder="comment" className="w-[80%] ml-6 border-b" ref={inputRef} postComment={postComment}/>
  </div>

<CommentCard {...commentData[0]}/>

</div>

    )
}