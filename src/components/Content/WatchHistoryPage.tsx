import axios from "axios";
import { useEffect,useState } from "react";
import { SkeletonCardSearch } from "../Card/skeletonCard";
import { VideoCardWatchHistory } from "../Card/videoCard";
import { WatchHistorySchema } from "../Card/videoCard";


export const WatchHistoryPage = () => {
    const [watchHistory,setWatchHistory] = useState<WatchHistorySchema[]>([]);
    const [isLoading,setIsLoading] = useState<boolean>(false);
    useEffect(()=>{
        setIsLoading(true);
        axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/watch-history`,{
            withCredentials:true
        })
        .then(res=>{
            setWatchHistory(res.data.data.reverse());
            setIsLoading(false);
        });
    },[]);
    if(!setWatchHistory?.length){
        return(<div className='flex justify-center items-center w-full h-[90vh]'>
                   <p className='text-pretty font-bold text-3xl mb-2'>No liked videos</p>    
              </div>)
      }
    return (
        <div className="overflow-y-scroll h-[90vh] scrollbar-thin dark:scrollbar-track-[#19191d] scrollbar-thumb-red-600 scrollbar-track-white ">
              <p className="text-pretty font-bold text-3xl mb-2">
            Watch History
            </p>
            <div className="flex flex-col ">
            <div className="pt-2 place-items-center">
      {isLoading ? (
   
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
          <SkeletonCardSearch />
        </>
       
      ) : (
        
        watchHistory?.map((video)=> <VideoCardWatchHistory key={video._id} {...video as WatchHistorySchema} />
        )
      )}
     </div>

            </div>
        </div>
    )
}

