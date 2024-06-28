import {useState, useRef } from 'react';
import { Button } from '../ui/button';
import { PiThumbsUpDuotone } from "react-icons/pi";
import { PiThumbsUpFill } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from '@/utils/DateFormat';
import { formatCount } from '@/utils/CountFormat';
import axios from "axios";
import { useToast } from '../ui/use-toast';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '@/lib/utils';
import { usePageNumAndRefreshContext } from '@/hooks/PageNumAndRefreshContext';
import { InputPost } from '../ui/inputPost';
import { useNavigate } from "react-router-dom"



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
  const navigate  = useNavigate();
  const {toast} = useToast();
  const [hover,setHover] = useState<boolean>(false);
  const [collapse,setCollapse] = useState<boolean>(true) ;
  const divRef = useRef<HTMLDivElement|null>(null);
  const [currentLikeStatus,setCurrentLikeStatus] = useState<CurrentLikeStatusSchema>({
    isLiked:props.isLiked,
    likesCount:props.likes
  })
  const likeRef = useRef<boolean>(props.isLiked);
  //const navigate = useNavigate();
  function stringShortener(str:string):string {
       return str?.substring(0,119);
  }
   const {setRefresh} = usePageNumAndRefreshContext();
   const [isEditing,setIsEditing] = useState(false);
   const [disable,setDisable] = useState(false);

   function toggleLikeHandler(){
    setDisable(true);
    axios
    .post(`${import.meta.env.VITE_BASE_URL}/api/v1/likes/toggle/c/${props._id}`,null,{
      withCredentials:true
    })
    .then(res => 
          console.log(res.data.message)
      )
    .catch(err => 
          toast({
            variant:"destructive",
            type:"foreground",
            description:err?.response?.data?.message
          })
      )
      .finally(()=>setDisable(false))
   }

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
      <div className='w-full'>
        <div className='flex justify-between items-start w-full' 
        onMouseEnter={()=>{
          setHover(true)
        }}
        onMouseLeave={(event)=>{
          if (divRef.current && event.relatedTarget instanceof Node && !divRef.current.contains(event.relatedTarget)) {
             setHover(false);
          }
        }}
        ref={divRef}
        >
          <div className='flex w-full'>
        <img 
        src={props.ownerAvatar} 
        className='h-12 w-12 rounded-full cursor-pointer'
        onClick={() => {
          navigate(`/channel/${props.ownerUsername}`)
        }}
        />
        <div className='flex flex-col ml-4'>
        <div className='flex flex-row'> 
        <span 
        className='cursor-pointer'
        onClick={()=>{
          navigate(`/channel/${props.ownerUsername}`)
        }} > @{props.ownerUsername}</span>
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
          disabled={disable}
          onClick={()=>{
            toggleLikeHandler();
                likeRef.current = !likeRef.current;
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
        
         <p className='mt-1 tabular-nums'
         >{formatCount(currentLikeStatus.likesCount)}</p>
     
         </div>
         <span className="h-[0.1rem] w-max bg-gray-400 "></span>
         {isEditing && 
         <InputPost 
         editCommentContent={props.content}
         setIsEditing={setIsEditing}
         isEditing={isEditing}
         setRefresh={setRefresh}
         commentId={props._id}
         className='mb-4'
         />}
        </div>
        </div>
        {
          (hover == true) && props.isEditable == true ? (
            <div className='mt-4 cursor-pointer'>
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