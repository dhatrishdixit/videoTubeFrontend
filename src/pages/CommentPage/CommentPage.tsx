import { CommentCard } from "@/components/Card/commentCard"
import { InputPost } from "@/components/ui/inputPost"
import React,{ useState,useRef} from "react" ;
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { usePaginate } from "@/hooks/Pagination";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Comment } from "react-loader-spinner";
import {PageNumAndRefreshContextProvider } from "@/hooks/PageNumAndRefreshContext";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
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

type queryType  = "Top" | "Recent" ;
export const CommentPage:React.FC<CommentPageSchema> = ({videoId,commentsCount}) =>{
    
    const userInfo = useSelector((state:RootState) => state.authorization.userData);
    const avatar = userInfo?.avatar
    const [query,setQuery] = useState<queryType>("Top");
    const Query = query == "Top" ? "" : "&ascending=true" ;
    const [refresh,setRefresh] = useState<number>(0);
    const {
        totalPages,
        switchToNextPage,
        switchToPreviousPage,
        moveToLastPage,
        moveToFirstPage,
        isLoading,
        result,
        pageNum
    } = usePaginate(commentsCount,20,`/comments/${videoId}`,Query,refresh);

    const isPreviousPageAvailable = Boolean(pageNum !== 1)  ;
    const isNextPageAvailable = pageNum < totalPages ;
    const inputRef = useRef<HTMLInputElement>(null);
    return(
    <PageNumAndRefreshContextProvider pageNum={pageNum} setRefresh={setRefresh} refresh={refresh}>
   <div className={` w-[95%] dark:bg-[#272727] rounded-md my-4 bg-[#f1f1f1] ${isLoading ? "flex justify-center items-center" : "text-left"} px-4 py-4`}>
    {
      isLoading ? (
        <Comment
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#272727"
        backgroundColor="#fff"
        />
      ) : (
        <>
        <p className="text-xl font-bold flex items-center gap-2">{(commentsCount as number)?.toLocaleString("en-US")} Comments
        <DropdownMenu>
            <DropdownMenuTrigger 
            className="flex gap-2 ml-4 items-center">  
              <HiOutlineMenuAlt2/>
              <span className="font-medium text-lg">sortBy</span>
            </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuItem 
            inset 
            onSelect={() => setQuery("Top")}
            className={`${query === "Top" ? "bg-red-600" : ""}`}
            >Top</DropdownMenuItem>

            <DropdownMenuItem 
            inset
            onSelect={() => setQuery("Recent")}
            className={`${query === "Recent" ? "bg-red-600" : ""}`}
            >Recent</DropdownMenuItem>
         </DropdownMenuContent> 
        </DropdownMenu>
       
        </p>
        <div 
        className="my-4 flex items-center ">
        <img 
        src={avatar} 
        className="h-12 w-12 rounded-full "/>
    
        <InputPost 
        placeholder="comment" 
        className="w-[80%] ml-6 border-b" 
        setRefresh={setRefresh}
        id="input"
        ref={inputRef}
        />
      </div>
       {
          result?.map((commentData,index) => {
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
       </>
      )
    }
</div></PageNumAndRefreshContextProvider>

    )
}