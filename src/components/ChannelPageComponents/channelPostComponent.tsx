import { TweetCard } from '../Card/TweetPostCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { TailSpin } from 'react-loader-spinner';
import { useChannelStateContext } from '@/hooks/ChannelState';
import { useParams } from 'react-router-dom';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { usePaginate } from '@/hooks/Pagination';
import { TweetCardProps } from '../Card/TweetPostCard';
export function ChannelPostComponent() {
  const { channelUsername } = useParams();
  const { tweetCount } = useChannelStateContext();


  const URL = `/tweets/u/post/${channelUsername}`;

  const {
    totalPages,
    switchToNextPage,
    switchToPreviousPage,
    moveToLastPage,
    moveToFirstPage,
    isLoading,
    result,
    pageNum
} = usePaginate(tweetCount,10,URL,"",2,false);
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
    
    result?.length == 0 ? (
      <div className='text-center font-semibold h-[40vh]'>
        No Community Posts By @{channelUsername}
      </div>
    ) : (
      <div className='py-4'>
      
      {
        result.map(
          (post)=>(
            <TweetCard {...post as TweetCardProps} />
          )
        )
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
   
  )
}

