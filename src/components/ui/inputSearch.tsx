import { cn } from "@/lib/utils";
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { InputProps } from "./input";
import axios from "axios";
import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchSuggestionSchema {
  _id: string;
  title:string;
}

type sortTypeType = "descending" | "ascending";
type sortByType = "createdAt" | "likes" | "duration" | "views" ;

export const InputSearch: React.FC<InputProps> = ({ className }) => {
  const [search, setSearch] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean | undefined>(false);
  const [openRecommendation, setOpenRecommendation] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestionSchema[]|string>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [sortType,setSortType] = useState<sortTypeType>("descending");
  const [sortBy,setSortBy] = useState<sortByType>("views");
  const [url,setUrl] = useState<string>("");
  const [refresh,setRefresh] = useState<number>(0);
  //TODO: if now url.length == 1 dont use url then directly send the query or add query to url as well think of it 
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
         axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/s/search?title=${search}`,{
          withCredentials:true
         })
         .then(res => setSearchSuggestions(res.data.data))
         .catch(err => console.log(err));
      } else {
        setSearchSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(()=>{
      const handleClickOutside = (event:MouseEvent) =>{
            if(suggestionRef.current &&
               !suggestionRef.current.contains(event.target as Node) && 
               inputRef.current && 
               !inputRef.current.contains(event.target as Node)){
              //  console.log("clicked outside")
                 setOpenRecommendation(false);
              }
             
      }

      document.addEventListener('click',handleClickOutside,{
          capture:true,
      });
      return () =>{
        document.removeEventListener('click',handleClickOutside,{
          capture:true,
        });
      }
  },[])
  
  useEffect(()=>{
       setUrl(`?sortType=${sortType}&sortBy=${sortBy}&query=${search}`)
  },[sortType,sortBy,search])

  return (
    <div className="w-full flex justify-center items-center gap-4">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Filter</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Order</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
            <DropdownMenuItem
                 onClick={()=>{
                  setSortType("descending");
                
                }}
                className = {
                  sortType == "descending" ? "bg-white text-[#09090b]" :""
                }
              >Descending</DropdownMenuItem>
              <DropdownMenuItem
               onClick={()=>{
                setSortType("ascending");
              }}
              className = {
                sortType == "ascending" ? "bg-white text-[#09090b]" :""
              }
              >Ascending</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>By</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem 
                onClick={()=>{
                  setSortBy("duration");
                }}
                className = {
                  sortBy == "duration" ? "bg-white text-[#09090b]" :""
                }
                >Duration</DropdownMenuItem>
                <DropdownMenuItem
                 onClick={()=>{
                  setSortBy("views");
                }}
                className = {
                  sortBy == "views" ? "bg-white text-[#09090b]" :""
                }
                >Views
                </DropdownMenuItem>
                <DropdownMenuItem
                 onClick={()=>{
                  setSortBy("createdAt");
                }}
                className = {
                  sortBy == "createdAt" ? "bg-white text-[#09090b]" :""
                }
                >Published Date</DropdownMenuItem>
                <DropdownMenuItem
                 onClick={()=>{
                  setSortBy("likes");
                }}
                className = {
                  sortBy == "likes" ? "bg-white text-[#09090b]" :""
                }
                >likes</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
 

    <div
      className={cn(
        "flex flex-row w-full rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium relative",
        {
          "border-red-600": isFocus,
        },
        className
      )}
    >
      <input
        className={cn(
        "flex h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-sm focus:outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ",
          openRecommendation && "rounded-b-none"
        )}
        ref={inputRef}
        value={search}
        id="name"
        placeholder="Search"
        type="text"
        
        onFocus={() => {
          setIsFocus && setIsFocus(true);
          setOpenRecommendation(true);
        }}
        
    
        onBlur={() => {
            setIsFocus && setIsFocus(false);
        }}
        
        onChange={(e) => {
          setSearch && setSearch(e.target.value);
        }}
        
        autoComplete="off"
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          setSearch("");
        }}
        className={`px-2 rounded-r-md ${search ? "" : "hidden"}`}
      >
        <X size={18} />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          // call backend for search
          // send data to different page i.e. search page from where it will
          setRefresh(Math.random());
          navigate(`/videos/results${url}`,{state:refresh});
        }}
        className={`px-3 rounded-r-md `}
        disabled={search.length == 0}
      >
        <Search size={18}/>
      </button>
      {openRecommendation && (
        <div className={`absolute mt-12 w-full max-w-[calc(100%-2rem)] rounded-md border border-input bg-popover text-popover-foreground shadow-md dark:bg-black bg-slate-200  ${search.length == 0 ? "hidden opacity-0 transition-opacity duration-300" : "opacity-100 transition-opacity duration-300"} ${typeof searchSuggestions == "string" ? "" : "overflow-y-scroll max-h-[80vh] scrollbar-thin scrollbar-thumb-red-600 dark:scrollbar-track-[#09090b] scrollbar-track-white"}`} 
        ref={suggestionRef}
        >
          {
            typeof searchSuggestions == "string" ? (
             
                <div
                  className=" px-4 py-2  text-center"
                  onClick={()=>setOpenRecommendation(false)}
                >
                  {searchSuggestions}
                  
                </div>
         
            ) : (
              searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-accent hover:text-accent-foreground flex justify-between items-center"
               
                >
                  <span 
                    onClick={()=>{
                      console.log(suggestion.title);
                      setSearch(suggestion.title);
                      setOpenRecommendation(false);
                      navigate(`/videos/results?sortType=${sortType}&sortBy=${sortBy}&query=${suggestion.title}`);
                    }}
                    className="w-full"
                  >{suggestion.title}</span>
             
                  <IoIosClose className="scale-150" onClick={
                    ()=>{
                      setSearchSuggestions((prev) =>{
                        if(typeof prev == "string") return prev ;
                        return prev.filter((value) => value._id !== suggestion._id)
                      })
                      setOpenRecommendation(true)
                    }
                  }/>

                </div>
              ))
            )
          }
        </div>
      )}
    </div></div>
  );
};

InputSearch.displayName = "Input Search";