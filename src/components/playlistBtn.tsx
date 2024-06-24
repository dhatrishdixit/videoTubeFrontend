import React,{useEffect,useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
  } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MdFormatListBulletedAdd } from 'react-icons/md';
import axios, { AxiosError } from "axios";
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLocation } from 'react-router-dom';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { toast } from "@/components/ui/use-toast";
import { ReloadIcon } from '@radix-ui/react-icons';
import { ToastAction } from '@radix-ui/react-toast';
import { PlaylistCreationForm } from './playlistCreationForm';

const FormSchema = z.object({
      playlistId: z
      .string({
        required_error: "Please select a playlist",
      })
  })

interface UserPlaylistSchema {
   _id:string;
   name:string;
   description:string;
   videos:string[];
   owner:string;
   createdAt:Date;
   updatedAt:Date;
   __v:number;
}


export const PlaylistBtn = () => {
    
    const [formOpen,setFormOpen] = useState<boolean>(false);
    const [reloadPlaylist,setReloadPlaylist] = useState<number>(0);
    const userId = useSelector((state:RootState) => state.authorization.userData._id);
    const location = useLocation();
    const [userPlaylists,setUserPlaylists] = useState<UserPlaylistSchema[]>([]);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
      })
    
      async function onSubmit(data: z.infer<typeof FormSchema>) {
        const videoId = location.pathname.split('/')[2];
       
        try {
            await axios.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/add/${videoId}/${data.playlistId}`,null,{
                withCredentials:true
            });

            toast({
                variant:"success",
                type:"foreground",
                description:"Video added to playlist successfully",
                action:<ToastAction altText="undo" onClick={()=>{
                  axios
                  .patch(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/remove/${videoId}/${data.playlistId}`,null,{
                   withCredentials:true
                 })
                  .then(res => console.log(res.data.data.message))
                  .catch(err => console.log("error in undo video from playlist : ",err.response.data.message));
                }}><span>undo</span></ToastAction>,
            })
        } catch (error) {
            if(error instanceof AxiosError){
                toast({
                 variant:"destructive",
                 type:"foreground",
                 description:error?.response?.data?.message,
                })
              }
        }
      }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist/owner/playlists`,{
            withCredentials:true
        }).then((res)=>{
            setUserPlaylists(res.data.data);
        }).catch((error)=>{
            console.log("playlist error : ",error);
        })
    },[location,userId,reloadPlaylist]);

    return (
        <div >
            <Dialog>
                <DialogTrigger>  
                     <Button className="ml-4" variant="link">
                <MdFormatListBulletedAdd className="scale-150 text-white" />
                </Button>                
                </DialogTrigger>
                <DialogContent>
                { !formOpen && <div><Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="addVideo" className="w-2/3 space-y-6" >
        <FormField
          control={form.control}
          name="playlistId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Playlist</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Playlist" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent 
                 className="max-h-[40vh] "
                >
                    {
                        userPlaylists?.map((playlist)=>{
                            return(
                                <SelectItem value={playlist._id} key={playlist._id} className='cursor-pointer'>
                                     {playlist.name}
                                </SelectItem>
                            )
                        })
                    }
           
                </SelectContent>
              </Select>
              <FormDescription>
                 select a playlist in which you want to add this video to 
                           </FormDescription>
                         <FormMessage />
                      </FormItem>
                        )}
                     />
                   </form>
                  </Form>
                  <div className='flex justify-between mt-4'>
                
                  <Button onClick={()=>{
                    setFormOpen(true);
                  }}
                   variant = "default"
                  >Create Playlist</Button>
                    <Button variant="outline" form= "addVideo" className="hover:bg-red-600" type="submit" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Add Video"
          }
          </Button>
                  </div>
                  </div>}
                  {
                    formOpen && <div>
                      <PlaylistCreationForm setFormOpen={setFormOpen} setReloadPlaylist={setReloadPlaylist}/>
                    </div>
                  }
                </DialogContent>
        </Dialog>
        </div>
    )
}

{/* */}
