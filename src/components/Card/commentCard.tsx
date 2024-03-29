import {useEffect, useState, useRef } from 'react';
import { Button } from '../ui/button';
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from '@/utils/DateFormat';
import { formatCount } from '@/utils/CountFormat';
import axios from "axios";
import { useToast } from '../ui/use-toast';
import { useParams } from 'react-router-dom';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { usePageNumAndRefreshContext } from '@/hooks/PageNumAndRefreshContext';
import { InputPost } from '../ui/inputPost';



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

interface CurrentLikeStatusSchema {
  isLiked:boolean;
  likesCount:number;
}


export const CommentCard  = ((
    props:CommentCardSchema
) => { 
  const { videoId } = useParams();
  const {toast} = useToast();
  const [hover,setHover] = useState<boolean>(false);
  const [collapse,setCollapse] = useState<boolean>(true) ;
  const divRef = useRef<HTMLDivElement|null>(null);
  const [currentLikeStatus,setCurrentLikeStatus] = useState<CurrentLikeStatusSchema>({
    isLiked:props.isLiked,
    likesCount:props.likes
  })
  //const navigate = useNavigate();
  function stringShortener(str:string):string {
       return str?.substring(0,119);
  }
   const {pageNum,setRefresh} = usePageNumAndRefreshContext();
   const [isEditing,setIsEditing] = useState(false);

   useEffect(()=>{
    
    // runs on mount or when dependency array updates
    
    return () => {
      // runs on unmount or when dependency array updates 
      if(currentLikeStatus.isLiked !== props.isLiked){
        axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/v1/likes/toggle/c/${props._id}`,null,{
          withCredentials:true
        })
        .then(res => 
              // toast({
              //   variant:"success",
              //   type:"foreground",
              //   description:res.data.message
              // })
              console.log(res.data.message)
          )
        .catch(err => 
              toast({
                variant:"destructive",
                type:"foreground",
                description:err?.response?.data?.message
              })
          )
      }
    
    }

   },[pageNum,videoId])

    function editHandler(){
        setIsEditing(true);
        
    }

    function deleteHandler(){
      axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/comments/cmt/${props._id}`,{
        withCredentials:true
      })
      .then(res => 
           {
            toast({
              variant:"success",
              type:"foreground",
              description:res.data.message
            })
            setRefresh(Math.random())
           }
        )
      .catch(err => {
         toast({
           variant:"destructive",
           type:"foreground",
           description:err?.response?.data?.message
         })
 
      })

    }
    
    return(
      <div>
        <div className='flex justify-between items-start ' 
        onMouseEnter={()=>{
          setHover(true)
        }}
        onMouseLeave={(event)=>{
          if (divRef.current &&!divRef?.current?.contains(event?.relatedTarget as Node)) {
             setHover(false);
          }
        }}
        ref={divRef}
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
                setCurrentLikeStatus(prev =>
                     {
                       return {
                          isLiked:!prev.isLiked,
                          likesCount: prev.isLiked == true ? prev.likesCount as number - 1 : prev.likesCount as number + 1 ,
                       }
                     }
                  );
            }}
         >{
          currentLikeStatus.isLiked ? <PiThumbsUpFill className='scale-150'/> : <PiThumbsUpDuotone className='scale-150'/> 
         }</Button> 
         <p className='mt-1'
         >{formatCount(currentLikeStatus.likesCount)}</p>
         </div>
         <span className="h-[0.1rem] w-max bg-gray-400 my-2"></span>
        </div>
        </div>
        {
          (hover == true) && props.isEditable == true ? (
            <div className='mt-4 cursor-pointer'>
       
            {
              // on clicking edit navigate to input 
              // navigate(/#input)
            }
               {/* <DropdownMenu>
            <DropdownMenuTrigger onClick={()=>{
                       
            }} asChild >  
              <BsThreeDotsVertical />
            </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem inset>Edit</DropdownMenuItem>
            <DropdownMenuItem inset 
            className="bg-red-500">Delete</DropdownMenuItem>

            
         </DropdownMenuContent> 
        </DropdownMenu> */}
         <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button> <BsThreeDotsVertical /></button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Content className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 cursor-pointer")}>
            <DropdownMenu.Item 
               className={cn(
                "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-8 cursor-pointer"
              )}
              onClick={editHandler}
            >Edit</DropdownMenu.Item>
            <DropdownMenu.Item
                className={cn(
                  "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 pl-8 bg-red-500 cursor-pointer", 
                )}
                onClick={deleteHandler}
            >Delete</DropdownMenu.Item>
      
          </DropdownMenu.Content>
        </DropdownMenu.Root>
         </div>
          ):null
        }
        </div>
        
        </div>
    )
})