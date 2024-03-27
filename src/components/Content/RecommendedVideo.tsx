import { VideoCardRecommendation } from "../Card/videoCard";
import {useCallback, useRef, useState} from "react";
import { useToast } from "../ui/use-toast";
import usePosts from "@/hooks/lazyLoading";
import { VideoPropsSearch } from "../Card/videoCard";
import { SkeletonCardRecommended } from "../Card/skeletonCard";


type RecommendedVideoProps = {
    channelId:string
}

export const RecommendedVideo:React.FC<RecommendedVideoProps> = ({channelId}) => {
  const { toast } = useToast();
  const [pageNum, setPageNum] = useState(0);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum,6,`userId=${channelId}`);
  const intObserver = useRef<IntersectionObserver | null>(null);
  
  const lastPostRef = useCallback(
    (post: HTMLDivElement | null) => {
      if (isLoading) return;
      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          if (entries[0].isIntersecting && hasNextPage) {
            console.log("We are near the last post!");
            setPageNum((prev) => prev + 1);
          }
        },
        { root: null }
      );

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const content = results.map((post, i) => {
    if (results.length === i + 1) {
      return (
        <VideoCardRecommendation
          ref={lastPostRef}
          key={Math.random()}
          {...(post as VideoPropsSearch)}
        />
      );
    }
    return (
      <VideoCardRecommendation key={Math.random()} {...(post as VideoPropsSearch)} />
    );
  });
  if (isError) {
    toast({
      variant: "destructive",
      type: "foreground",
      description: error?.message,
    });
  }

  return (
    <div className="" >
      {isLoading ? (
   
         <>
          {...content}
          <SkeletonCardRecommended/>
          <SkeletonCardRecommended/>
          <SkeletonCardRecommended/>
       
     
         </>
       
      ) : (
        content
      )}
   
    </div>
  );
};