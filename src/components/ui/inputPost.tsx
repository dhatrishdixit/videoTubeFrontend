import { cn } from "@/lib/utils";
import React from "react";
import { X } from "lucide-react";
import { IoMdSend } from "react-icons/io";
import { InputProps } from "./input";

export const InputPost:React.FC<InputProps> = ({ className,...props }) => {
  // add debouncing to this also
  const [post, setPost] = React.useState<string | undefined>("");
  const [isFocus, setIsFocus] = React.useState<boolean | undefined>(false);
  // add clear button and post button in this after learning about forward ref

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
        {...props}
      />

      <button
        onClick={(e) => {
          e.preventDefault();
          setPost("");
        }}
        className={`
            px-2  rounded-r-md 
            ${post ? "" : "hidden"}`}
      >
        <X size={18} />
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          // call backend for post
        }}
        className={`
            px-3  rounded-r-md 
            `}
      >
        <IoMdSend/>
      </button>
    </div>
  );
};

InputPost.displayName = "Input Post";
