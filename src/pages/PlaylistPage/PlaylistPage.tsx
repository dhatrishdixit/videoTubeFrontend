import { useParams } from "react-router-dom"
import {useCallback, useRef, useState,useEffect} from "react";
import { useToast } from "@/components/ui/use-toast";
import usePosts from "@/hooks/lazyLoading";

export function PlaylistPage(){
    const { playlistId } = useParams();
    
    return (
        <div>
          
        </div>
    )
}