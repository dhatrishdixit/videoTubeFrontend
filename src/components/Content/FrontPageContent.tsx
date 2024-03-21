import { SkeletonCardMain } from "../Card/skeletonCard";
import { VideoCardMain } from "../Card/videoCard";
import {useCallback, useRef, useState} from "react";
import { useToast } from "../ui/use-toast";
import usePosts from "@/hooks/lazyLoading";
import { VideoPropsMain } from "../Card/videoCard";

export const FrontPageContent = () => {
  const { toast } = useToast();
  const [pageNum, setPageNum] = useState(0);
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);
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
        <VideoCardMain
          ref={lastPostRef}
          key={Math.random()}
          {...(post as VideoPropsMain)}
        />
      );
    }
    return (
      <VideoCardMain key={Math.random()} {...(post as VideoPropsMain)} />
    );
  });
  //console.log(content)
  if (isError) {
    toast({
      variant: "destructive",
      type: "foreground",
      description: error?.message,
    });
  }

  return (
    <div className="p-2 grid grid-cols-3 overflow-y-scroll h-[90vh] scrollbar-thin dark:scrollbar-track-[#09090b] scrollbar-thumb-red-600 scrollbar-track-white place-items-center" id="top">
      {isLoading ? (
   
          <>
          {...content}
          <SkeletonCardMain />
          <SkeletonCardMain />
          <SkeletonCardMain />
          <SkeletonCardMain />
          <SkeletonCardMain />
          <SkeletonCardMain />
          <SkeletonCardMain />
          <SkeletonCardMain />
          <SkeletonCardMain />
        </>
       
      ) : (
        content
      )}

    </div>
  );
};