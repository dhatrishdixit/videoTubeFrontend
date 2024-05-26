import { useParams } from "react-router-dom";
import {useState,useEffect} from "react";
import { useToast } from "@/components/ui/use-toast";
import { VideoCardSearch } from "@/components/Card/videoCard";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { VideoPropsSearch } from "@/components/Card/videoCard";
import { SkeletonCardMain } from "@/components/Card/skeletonCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/DateFormat";
import { Button } from "@/components/ui/button";

function stringShortener(str:string):string {
  return str?.substring(0,119);
}

export interface PlaylistPageSchema {
  _id:string,
  name:string,
  description:string,
  videos:VideoPropsSearch[],
  owner:string,
  createdAt: string ,
  ownerAvatar:string
}



export function PlaylistPage(){
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const { toast } = useToast();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [data,setData] = useState<PlaylistPageSchema>();
    const [collapse,setCollapse] = useState<boolean>(true) ;
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/${playlistId}`,{
          withCredentials:true
        }).
        then((res)=>{
          setIsLoading(false);
          setData(res.data.data[0])
       
        }).
        catch((err)=>{
          setIsLoading(false);
          toast({
              variant:"destructive",
              description:err.response.data.message,
              
          })
        })
    },[playlistId])
    


    return (
      
             <div className="p-2  overflow-y-scroll h-[90vh] scrollbar-thin dark:scrollbar-track-[#19191d] scrollbar-thumb-red-600 scrollbar-track-white place-items-center" id="top">

      {
        isLoading ?null:(
           <div className="m-2 flex justify-between">
            <div>
            <p className="text-pretty font-bold text-3xl mb-2">
            {data?.name}
            </p>
            <p className="text-gray-700 dark:text-gray-400">
            {
          (data?.description as string)?.length <= 120 ? data?.description : (
            <>
            {collapse? stringShortener(data?.description as string) : data?.description}
            <Button variant="outline" className="bg-transparent border-none border-0 text-gray-400" onClick={()=>{
                 setCollapse(prev => !prev);          
            }}>{collapse?"...more":"show less"}</Button>
            </>
          )
        }
            </p>
            <span className="text-gray-700 dark:text-gray-400 flex">
              created {formatDate(data?.createdAt as string)} by &nbsp; <p className=" text-bold text-left dark:text-white text-black cursor-pointer"
        onClick={()=>{
            navigate(`/channel/${data?.owner}`)
        }}
        >@{data?.owner}</p>
            </span>
            </div> 
            <div>
            <div className="flex">
            <img 
       src={data?.ownerAvatar} 
       className="h-12 w-12 rounded-full  col-span-1 cursor-pointer"
       onClick={()=>{
        navigate(`/channel/${data?.owner}`)
       }}
       />
       <div 
       className="flex col-span-6 items-center gap-4 ml-2 mb-2" >
        <div>
     
            </div>
           </div>
           </div>
           </div>
           </div>
        )
      }
      <div className="pt-2">
      {isLoading ? (
   
          <>
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
        
        data?.videos.map((video)=> <VideoCardSearch key={video._id} {...video as VideoPropsSearch} />
        )
      )}
     </div>


    </div> 
    )
}