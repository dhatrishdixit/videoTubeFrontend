import { SkeletonCardMain } from "../Card/skeletonCard";
import { VideoCardMain } from "../Card/videoCard";
import infiniteScroll from "react-infinite-scroll-component";
import {useState} from "react";
import { useToast } from "../ui/use-toast";
import usePosts from "@/hooks/lazyLoading";

export const ContentLoading = () => {
  const {toast} = useToast();
  const [pageNum,setPageNum] = useState(0);
  const {isLoading, isError, error, results, hasNextPage} = usePosts(pageNum);

  const content = results.map(
    (cardContent,i)=>{
        if(i+1 === results.length){
          
        }
    }
  )
  //console.log(isError)
  if(isError){
    //console.log(error.message);
    toast({
      variant:"destructive",
      type:"foreground",
      description:error?.message
    })
  }
  // check where we are using react router dom hooks and acccordingly use the div
  return (
    <div className="p-2 grid grid-cols-3 overflow-y-scroll h-[90vh] scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white place-items-center">
      {/* <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain />
      <SkeletonCardMain /> */}
    
      {/* write conditional of loading here  */}

               
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
          <VideoCardMain />
      
    </div>
  );
};
