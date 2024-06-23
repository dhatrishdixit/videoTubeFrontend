import { useParams } from "react-router-dom";
import {useState,useEffect} from "react";
import { useToast } from "@/components/ui/use-toast";
import { VideoCardPlaylist, VideoCardSearch } from "@/components/Card/videoCard";
import { VideoPropsSearch } from "@/components/Card/videoCard";
import { SkeletonCardSearch } from "@/components/Card/skeletonCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/DateFormat";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MdOutlineDelete } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


function stringShortener(str:string):string {
  return str?.substring(0,119);
}

export interface PlaylistPageSchema {
  _id:string,
  name:string,
  description:string,
  videos:VideoPropsSearch[],
  owner:string,
  ownerId:string,
  createdAt: string,
  ownerAvatar:string,
  isPublic:boolean
}



export function PlaylistPage(){
    const navigate = useNavigate();
    const { playlistId } = useParams();
    const { toast } = useToast();
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [data,setData] = useState<PlaylistPageSchema>();
    const [collapse,setCollapse] = useState<boolean>(true) ;
    const userId = useSelector((root:RootState)=>root.authorization.userData._id);
    const [permission,setPermission] = useState<boolean>(false);
    const [access,setAccess] = useState<boolean|undefined>(false);
    const [disable,setDisable] = useState<boolean>(false);
    const [open,setOpen] = useState<boolean>(false);
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/${playlistId}`,{
          withCredentials:true
        }).
        then((res)=>{
          setIsLoading(false);
          setData(res.data.data[0]);
        }).
        catch((err)=>{
          setIsLoading(false);
          toast({
              variant:"destructive",
              description:err.response.data.message,
              
          })
        })

    },[playlistId])
    
    useEffect(()=>{
      if(data?.ownerId == userId){
        setPermission(true);
        setAccess(data?.isPublic);
      }
   
    },[userId,data])

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
              {
              permission == true ?  
              <div>
                  <div className="flex items-center space-x-2 m-4">
                  <Label htmlFor="publicAccess" className="font-semibold text-center">{
                      access == true? "Public" : "Private"           
                }</Label>
                  <Switch
                    checked = {access}
                    onCheckedChange={()=>{
                      setAccess(prev=>!prev);
                      setDisable(true);
                      axios
                      .patch(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/toggle/${userId}/${data?._id}`,null,{
                        withCredentials:true,
                      })
                      .then(()=>{
                        setDisable(false);
                        toast({
                          variant:"success",
                          type:"foreground",
                          description:"Playlist updated successfully"
                        })
                      })
                      .catch((res)=>{
                        setDisable(false);
                        toast({
                          variant:"destructive",
                          type:"foreground",
                          description:res.response.data.message
                        })
                      })
                    }}
                    id="publicAccess"
                    disabled={disable}
                 />
                 <AlertDialog open={open} onOpenChange={setOpen}>
                    <AlertDialogTrigger>
                            <Button variant="ghost" className="rounded-full"> <MdOutlineDelete className='scale-150'/>
                            </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                       <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              playlist and remove your data from our servers.
                       </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>{
              setOpen(true);
              axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/${playlistId}`,{
                withCredentials:true
              })
              .then(()=>{
                setOpen(true);
                navigate(-1);
                toast({
                  variant:"success",
                  type:"foreground",
                  description:"Playlist deleted successfully"
                })
              })
              .catch(()=>{
                setOpen(true);
                toast({
                  variant:"destructive",
                  type:"foreground",
                  description:"Something went wrong"
                })
              })
          }}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
                 </AlertDialog>
                 
              </div>
              </div> 
               :  <img 
         src={data?.ownerAvatar} 
         className="h-12 w-12 rounded-full  col-span-1 cursor-pointer"
         onClick={()=>{
          navigate(`/channel/${data?.owner}`)
         }}
         />
         }
           
       
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
        
        data?.videos.map((video)=> <VideoCardPlaylist key={video._id} {...video as VideoPropsSearch} />
        )
      )}
     </div>


    </div> 
    )
}