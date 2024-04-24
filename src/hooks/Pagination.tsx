import React from "react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { VideoPropsSearch } from "@/components/Card/videoCard";
import { TweetCardProps } from "@/components/Card/TweetPostCard";
import { PlaylistCardProps } from "@/components/Card/playlistCard";

export interface CommentSchema {
    _id : string;
    content : string;
    video?: string;
    // think of adding Comment(for nesting) and Tweet to add comments to it 
    createdAt : Date;
    owner : string;
    ownerUsername : string;
    ownerAvatar : string;
    likes : number;
    isEditable : boolean;
    isLiked : boolean;
}

export function usePaginate(itemCount:number=0,limit:number=20,url:string="/comments",query:string="",refresh:number,urlHasSomeBasicQuery:boolean=false){
  
   const { toast } = useToast();
   const totalPages = Math.ceil(itemCount / limit) ;
   const [pageNum,setPageNum] = React.useState<number>(1);
   const [isLoading,setIsLoading] = React.useState<boolean>(false);
   const [result,setResult] = React.useState<CommentSchema[] | VideoPropsSearch[] | TweetCardProps[] | PlaylistCardProps[]>([]);


   React.useEffect(()=>{
        setIsLoading(true);
        let URL = `${import.meta.env.VITE_BASE_URL}/api/v1${url}?page=${pageNum-1}&limit=${limit}` ;
        if(urlHasSomeBasicQuery) URL = `${import.meta.env.VITE_BASE_URL}/api/v1${url}&page=${pageNum-1}&limit=${limit}`
      

        if(query){
            URL += `&${query}`
        }
    
        axios.get(URL,{
            withCredentials:true
        })
        .then(res=>{
            setResult(res.data.data);
            setIsLoading(false);
        })
        .catch(err =>{
            toast({
               variant:"destructive",
               type:"foreground",
               description: err.response.data.message
            })
            setIsLoading(false);
        })
        
   },[pageNum,url,query,refresh])
   // remember 1 thing ki page start hoga zero se apne server mei 
   // lekin apne ko show karna hai ki start ho rha hai 1 se bas 
   // TODO: think of adding comments inside comments 

   
   function switchToNextPage(){
     if(pageNum >= totalPages){
        return "disabled" ;
     }
      setPageNum(prev => prev+1);
      return null ;
   }

   function switchToPreviousPage(){
    if(pageNum <=  1){
       return "disabled" ;
    }
     setPageNum(prev => prev-1);
     return null ;
  }

   function moveToLastPage(){
     if(pageNum == totalPages){
        return "hidden";
     }
     setPageNum(totalPages);
     return null ;
   }

   function moveToFirstPage(){
     if(pageNum <= 1){
        return "hidden";
     }
     setPageNum(1);
     return null ;
   }

   function moveToRandomPage(page:number){
      if(page >=1 && page <= pageNum) setPageNum(page-1);
   }

   // TODO: make a function to reload the whole pagination area 


  return {
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
  }
   
}