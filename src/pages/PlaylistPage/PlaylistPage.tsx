import { useParams } from "react-router-dom"
import {useCallback, useRef, useState,useEffect} from "react";
import { useToast } from "@/components/ui/use-toast";
import usePosts from "@/hooks/lazyLoading";
import { VideoCardSearch } from "@/components/Card/videoCard";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { VideoPropsSearch } from "@/components/Card/videoCard";



export interface PlaylistPageSchema {
  _id:string,
  name:string,
  description:string,
  videos:VideoPropsSearch[],
  owner:string
}

export function PlaylistPage(){
    const { playlistId } = useParams();
    const { toast } = useToast();
    const [pageNum, setPageNum] = useState(0);
    const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum);
    //TODO: usePosts
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


    return (
        <div>
            <h1></h1>
          
        </div>
    )
}