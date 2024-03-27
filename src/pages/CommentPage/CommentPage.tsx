import { CommentCard } from "@/components/Card/commentCard"
import { InputPost } from "@/components/ui/inputPost"
import React, { useEffect, useRef, useState } from "react" ;
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { usePaginate } from "@/hooks/Pagination";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
  

export interface CommentCardSchema {
    _id: string;
    content: string;
    video: string;
    createdAt: Date;
    owner: string;
    ownerUsername: string;
    ownerAvatar: string;
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
 
    const [post,setPost] = useState();
    const [apiCall,setApiCall] = useState<boolean>(false);
    // changes this everytime there is any update to get the comments 
    const [query,setQuery] = useState<string>("");
    const {
        totalPages,
        switchToNextPage,
        switchToPreviousPage,
        moveToLastPage,
        moveToFirstPage,
        moveToRandomPage,
        isLoading,
        setPageNum,
        result,
        pageNum
    } = usePaginate(commentsCount,20,`/comments/${videoId}`);
 

  
    const isPreviousPageAvailable = Boolean(pageNum !== 1)  ;
    const isNextPageAvailable = pageNum < totalPages ;

 
       // use this to get all the comments 
       //{{localServer}}/comments/:videoId
   

    
    const inputRef = React.createRef<HTMLInputElement>();

    const postComment = async () =>{
   

    }
    return(
   <div className=" w-[95%] dark:bg-[#272727] rounded-md my-4 bg-[#f1f1f1] text-left px-4 py-4">
    <p className="text-xl font-bold">{(commentsCount as number)?.toLocaleString("en-US")} Comments</p>
    <div className="my-4 flex items-center ">
    <img src={avatar} className="h-12 w-12 rounded-full "/>

    <InputPost placeholder="comment" className="w-[80%] ml-6 border-b" ref={inputRef} postComment={postComment}/>
  </div>
   {
      result.map((commentData,index) => {
        return(
          <CommentCard key={index} {...commentData as CommentCardSchema}/>
        )
      })
   }

  
   <Pagination className="cursor-pointer">
    <PaginationContent>
        <PaginationItem>
            <PaginationPrevious className={`border  ${isPreviousPageAvailable? "hover:border-white":"cursor-not-allowed"}`} onClick={(e)=>{
                e.preventDefault();
                switchToPreviousPage();
            }}/>
        </PaginationItem>
        <PaginationItem>
             <PaginationLink className={`${isPreviousPageAvailable  && pageNum - 1 !== 1  ?  "": "hidden" }`}
             onClick={(e)=>{
                e.preventDefault();
                moveToFirstPage();
             }}
             >1</PaginationLink>
        </PaginationItem>
        <PaginationItem >
             <BiDotsHorizontalRounded 
             className={`${isPreviousPageAvailable && pageNum - 1 !== 1 && pageNum - 2 !== 1 ? "": "hidden" }`} 
              /> 
        </PaginationItem>
        <PaginationItem>
            <PaginationLink 
            className={`${isPreviousPageAvailable ? "": "hidden" }`}
            onClick={(e) => {
                   e.preventDefault();
                   switchToPreviousPage();
            }}
            >{pageNum - 1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink
            onClick={(e)=>{
                e.preventDefault();
            }} 
            isActive>{pageNum}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationLink 
            className={`${isNextPageAvailable ? "": "hidden" }`}
            onClick={(e)=>{
                 e.preventDefault();
                 switchToNextPage();
            }}
            >{pageNum+1}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <BiDotsHorizontalRounded className={`${isNextPageAvailable && pageNum + 2 !== totalPages && pageNum + 1 !== totalPages ? "": "hidden" }`}/> 
        </PaginationItem>
        <PaginationItem>
            <PaginationLink 
            className={`${isNextPageAvailable && pageNum + 1 !== totalPages ? "": "hidden" }`}
            onClick={(e)=>{
                 e.preventDefault();
                 moveToLastPage();
            }}
            >{totalPages}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
            <PaginationNext 
             className={`border ${isNextPageAvailable ? "hover:border-white":"cursor-not-allowed"}`}
             onClick={(e:React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>{
                e.preventDefault();
                switchToNextPage();
             }}
            />
        </PaginationItem>
    </PaginationContent>
   </Pagination>
</div>

    )
}