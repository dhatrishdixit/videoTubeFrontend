import { cn } from "@/lib/utils";
import React from "react";
import { X } from "lucide-react";
import { IoMdSend } from "react-icons/io";
import { InputProps } from "./input";
import axios from "axios";
import { useToast } from "./use-toast";
import { useParams } from "react-router-dom";

type InputPost = (InputProps 
  & {
    className?:string,
    setRefresh?:React.Dispatch<React.SetStateAction<number>>
  })

export const InputPost = (({ className,setRefresh,...props }:InputPost) => {
  const { toast } = useToast();
  const { videoId } = useParams();
  const [post, setPost] = React.useState<string | undefined>("");
  const [isFocus, setIsFocus] = React.useState<boolean | undefined>(false);
  // add clear button and post button in this after learning about forward ref
  const postComment = async () =>{

    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/comments/${videoId}`,{
        content:post
    },{
        withCredentials:true
    })

    setPost("");
    toast({
      variant:"success",
      type:"foreground",
      description:"comment posted successfully"
    })
    if(setRefresh) setRefresh(Math.random())
   
}

  return (
    <div
      className={cn(
        "flex flex-row w-full rounded-md border border-gray-400 bg-transparent  text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium ",
        {
          "border-red-600": isFocus,
        },
        className,
      )}
    >
      <input
        className={cn(
          "flex h-9 w-full rounded-md  bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50  ",
        )}
        id="name"
        type="text"
        onFocus={() => {
          setIsFocus && setIsFocus(true);
        }}
        onBlur={() => {
          setIsFocus && setIsFocus(false);
        }}
        onChange={(e) => {
          setPost && setPost(e.target.value);
        }}
        value={post}
        autoComplete="off"
        {...props}

      />

      <button
        onClick={() => {
          setPost("");
        }}
        className={`
            px-2  rounded-r-md 
            ${post ? "" : "hidden"}`}
      >
        <X size={18} />
      </button>

      <button
        onClick={() => {
           postComment();
        }}
        className={`
            px-3  rounded-r-md 
            `}
      >
        <IoMdSend/>
      </button>
    </div>
  );
})


