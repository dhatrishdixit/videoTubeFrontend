import { useEffect,useState } from 'react';
import axios from 'axios';
import { VideoCardLike } from '../Card/videoCard';
import { SkeletonCardSearch } from '../Card/skeletonCard';
import { VideoPropsLike } from '../Card/videoCard';


export function LikedVideosPage() {
  const [isLoading,setIsLoading] = useState<boolean>(false);
  const [likedVideos,setLikedVideos] = useState<VideoPropsLike[]>([]);  
  
  useEffect(()=>{
    setIsLoading(true);
    axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/likes/videos`,{
      withCredentials:true,
    })
    .then((res) => {
      setLikedVideos(res.data.data);
      console.log("likedVideos : ",res.data.data);
      setIsLoading(false);
    })
    
  },[]);
  if(!likedVideos?.length){
    return(<div className='flex justify-center items-center w-full h-[90vh]'>
               <p className='text-pretty font-bold text-3xl mb-2'>No liked videos</p>    
          </div>)
  }
  return (
   <div className='overflow-y-scroll h-[90vh] scrollbar-thin dark:scrollbar-track-[#19191d] scrollbar-thumb-red-600 scrollbar-track-white'>
              <p className="text-pretty font-bold text-3xl mb-2">
            Liked Videos
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
        likedVideos?.map((video)=> <VideoCardLike key={video._id} {...video} />
        )
      )}
     </div>
        </div>
        </div>
  )
}

