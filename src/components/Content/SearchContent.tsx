import { useCallback, useEffect, useRef, useState } from "react";
import { SkeletonCardSearch } from "../Card/skeletonCard";
import { VideoCardSearch, VideoPropsSearch } from "../Card/videoCard";
import { useLocation } from "react-router-dom";
import usePosts from "@/hooks/lazyLoading";
import { useToast } from "../ui/use-toast";


export const ContentSearch = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const sortBy = queryParams.get('sortBy');
    const sortType = queryParams.get('sortType');
    const query = queryParams.get('query');
    const [backendUrl,setBackendUrl] = useState<string>("");
    const [reRender,setReRender] = useState<number>(0);
    const { toast } = useToast();
    const [pageNum, setPageNum] = useState(0);
    const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum,10,backendUrl,"/videos",reRender);
    const intObserver = useRef<IntersectionObserver | null>(null);
    


    useEffect(()=>{
        setBackendUrl(`query=${query}&sortBy=${sortBy}&sortType=${sortType}`);
        setReRender(Math.random());
        console.log(backendUrl)
        console.log(reRender)
    },[query,sortBy,sortType]);
    
 
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
    console.log(results);
    const content = results.map((post, i) => {
      if (results.length === i + 1) {
        return (
          <VideoCardSearch
            ref={lastPostRef}
            key={Math.random()}
            {...(post as VideoPropsSearch)}
          />
        );
      }

      return (
        <VideoCardSearch key={Math.random()} {...(post as VideoPropsSearch)} />
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
      <div
        key={reRender}
        className="mx-2 h-[90vh] overflow-y-scroll scrollbar-thin  scrollbar-thumb-red-600 
             scrollbar-track-white
             dark:scrollbar-track-[#09090b]
            "
      >
  {isLoading ? (
   
   <>
   {...content}
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
 content
)}
      </div>
    );
  };
  