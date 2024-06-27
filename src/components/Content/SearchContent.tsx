import {  useEffect, useRef, useState } from "react";
import { SkeletonCardSearch } from "../Card/skeletonCard";
import { VideoCardSearch, VideoPropsSearch } from "../Card/videoCard";
import { useLocation } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import { usePaginate } from "@/hooks/Pagination";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import axios from "axios";

export const ContentSearch = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sortBy = queryParams.get('sortBy');
    const sortType = queryParams.get('sortType');
    const query = queryParams.get('query');
    const [backendUrl,setBackendUrl] = useState<string>("");
    const [reRender,setReRender] = useState<number>(0);
    const { toast } = useToast();
   
    const [videoCount,setVideoCount]= useState<number>(0);
    const [searchResult,setSearchResult] = useState<VideoPropsSearch[]>([]);
    //{{localServer}}/videos/result/counts?query=hey
    useEffect(()=>{
         console.log(query);
         axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/videos/result/counts?query=${query}`,{
            withCredentials:true,
         })
         .then(res => setVideoCount(res.data.data[0].totalCount as number)
         )
    },[query]);
   

    const {
      totalPages,
      switchToNextPage,
      switchToPreviousPage,
      moveToLastPage,
      moveToFirstPage,
      isLoading,
      result,
      pageNum
  } = usePaginate(videoCount,20,`/videos`,backendUrl,reRender,true);
    
  const isPreviousPageAvailable = Boolean(pageNum !== 1)  ;
  const isNextPageAvailable = pageNum < totalPages ;
   
  
  useEffect(()=>{
    console.log("result",result)
     setSearchResult(result as VideoPropsSearch[]);
   },[result]);

    useEffect(()=>{
        setBackendUrl(`query=${query}&sortBy=${sortBy}&sortType=${sortType}`);
        setReRender(Math.random());
        console.log(backendUrl)
        console.log(reRender)
    },[query,sortBy,sortType]);
    
 
 


    return (
      <div
        className="mx-2 h-[90vh] overflow-y-scroll scrollbar-thin  scrollbar-thumb-red-600 
             scrollbar-track-white
             dark:scrollbar-track-[#09090b]
            "
      >
      {
        isLoading ?  (
          <>
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
          <SkeletonCardSearch />
        </>
       
        ) : (
          searchResult.length == 0 ? (
          <div className="flex items-center justify-center h-full text-4xl font-bold">
              No Result Found for: "{query}"
          </div>) : (
            <div>
           <p className="text-3xl font-bold">Search Results for "{query}"</p>
           {
            searchResult.map((videoData) => <VideoCardSearch key={videoData._id} {...videoData as VideoPropsSearch} />)
          }
           <Pagination className="cursor-pointer pb-2">
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
                isActive>{`${pageNum}`}</PaginationLink>
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
                 onClick={(e)=>{
                  e.preventDefault();
                  switchToNextPage();
              }}
                />
            </PaginationItem>
        </PaginationContent>
       </Pagination>
        </div>
          ) 
         
        )
}
 
   
 
      </div>
    );
  };
  