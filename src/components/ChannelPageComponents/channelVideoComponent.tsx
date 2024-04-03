import { useEffect, useState, useMemo, useRef } from 'react'
import { usePaginate } from '@/hooks/Pagination';
import { usePageNumAndRefreshContext } from '@/hooks/PageNumAndRefreshContext';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { TailSpin } from 'react-loader-spinner';
import { useChannelStateContext } from '@/hooks/ChannelState';
import { useParams } from 'react-router-dom';
import { VideoCardSearch, VideoPropsSearch } from '../Card/videoCard';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Button } from '../ui/button';



// render(<TailSpin
//   visible={true}
//   height="80"
//   width="80"
//   color="#4fa94d"
//   ariaLabel="tail-spin-loading"
//   radius="1"
//   wrapperStyle={{}}
//   wrapperClass=""
//   />)


type QueryType = 'Recent' | 'Oldest' | 'Popular' | 'Most liked'
export function ChannelVideoComponent() {
  const {channelUsername} = useParams();
  const {videoCount} = useChannelStateContext();
  const [query,setQuery] = useState<QueryType>("Recent");
  const [refresh,setRefresh] = useState<number>(0);
  

   let Query;
   switch(query){
      case "Recent" : 
        Query = "sortBy=createAt&sortType=ascending";
        break;
      
      case "Oldest" :
        Query = "sortBy=createAt&sortType=descending";
        break;

      case "Popular" :
        Query = "sortBy=views&sortType=descending";
        break;
        
      case "Most liked" :
        Query = "sortBy=likes&sortType=descending";
        break;
   }

   const URL = `/videos?username=${channelUsername}`;

  const {
    totalPages,
    switchToNextPage,
    switchToPreviousPage,
    moveToLastPage,
    moveToFirstPage,
    isLoading,
    result,
    pageNum
} = usePaginate(videoCount,10,URL,Query,refresh,true);
const ref = useRef<HTMLDivElement|null>(null);


  const isPreviousPageAvailable = Boolean(pageNum !== 1)  ;
  const isNextPageAvailable = pageNum < totalPages ;


   return isLoading ? <div className=' flex justify-center items-end'>
     <TailSpin
  visible={true}
  height="80"
  width="80"
  color="#272727"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  /> 
  </div> : (
    <div className="py-4 ">
      <div className='flex gap-2'>
        <Button variant="secondary" 
        className={query == "Recent" ? "bg-white hover:text-white text-black":"bg-transparent" }
        onClick={()=>{
          setQuery("Recent");
        }}>Recent</Button>
        <Button variant="secondary" 
        className={query == "Most liked" ? "bg-white hover:text-white text-black":"bg-transparent" }
        onClick={()=>{
          setQuery("Most liked");
        }}
        >Most Liked</Button>
        <Button variant="secondary" 
        className={query == "Popular" ? "bg-white hover:text-white  text-black":"bg-transparent" }
        onClick={() => {
          setQuery("Popular");
        }}
        >Popular</Button>
        <Button variant="secondary" 
        className={query == "Oldest" ? "bg-white hover:text-white text-black":"bg-transparent" }
        onClick={()=>{
          setQuery("Oldest");
        }}
        >Oldest</Button>
      </div>
       {
        result.map(video => <VideoCardSearch {...video as VideoPropsSearch} ref={ref}/>)
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

  
    </div>
  )
   
}

