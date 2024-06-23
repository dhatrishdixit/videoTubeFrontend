import { Button } from "./ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {z} from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {SubmitHandler,useForm} from "react-hook-form";
import axios,{AxiosError} from "axios";
import { useToast } from "./ui/use-toast";
import React from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export const PublishedBtn = () => {
 
  const dialogCloseRef = React.useRef<typeof DialogClose>(null);
  const {toast} = useToast();
  const schema = z.object({
    title:z.string(),
    description:z.string(),
    video:z.instanceof(FileList).refine(files => files.length === 1,"only one video can be posted at a time"),
    thumbnail:z.instanceof(FileList).refine(files => files.length ===1,
    "only one thumbnail can be posted at a time")
  })
  //TODO: addfile type to this 
  //TODO: improve this form 
  type formFields = z.infer<typeof schema>;

  const {register
    ,handleSubmit
    ,setError
    ,formState} = useForm<formFields>( {
    resolver:zodResolver(schema)
    })

    const {errors,isSubmitting} = formState ;
    const [open,setOpen] = React.useState<boolean>(false);

    const onSubmit:SubmitHandler<formFields> = async (data) =>{
         try {
             const formData = new FormData();
             formData.append("title",data.title);
             formData.append("description",data.description);
             formData.append("videoFile",data.video[0]);
             formData.append("thumbnail",data.thumbnail[0]);
             
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/videos`,formData,{
              withCredentials:true,
            });
         
            toast({
              variant:"success",
              type:"foreground",
              description:"video published successfully"
            })

           
          setOpen(false);
        

         } catch (error) {
           if(error instanceof AxiosError){
             toast({
              variant:"destructive",
              type:"foreground",
              description:error?.response?.data?.message,
             })

             setError("root",{
              message:error?.response?.data?.message,
             })
           }
         }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="hover:bg-red-600 ml-2">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="1.3em"
            width="1.3em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"></path>
            <path d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Video</DialogTitle>
          <DialogDescription>Publish a new video</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input 
            id="title" 
            placeholder="title" 
            className="col-span-3" 
            {...register('title')}
            />
            {
              errors.title && <p className="text-red-600">{
                errors.title.message
              }</p>
            }
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {
              //TODO: think of adding text area for description
              //TODO: think of adding type check for file type and size of file 
            }
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="description"
              className="col-span-3"
              {...register("description")}
            />
             {
              errors.description && <p className="text-red-600">{
                errors.description.message
              }</p>
            }
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="video" className="text-right">
              Video File
            </Label>
            <Input
              id="video"
              placeholder="video"
              className="col-span-3"
              type="file"
              {...register("video")}
            />
             {
              errors.video && <p className="text-red-600">{
                errors.video.message
              }</p>
            }
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Thumbnail
            </Label>
            <Input
              id="thumbnail"
              placeholder="thumbnail"
              className="col-span-3"
              type="file"
              {...register("thumbnail")}
            />
             {
              errors.thumbnail && <p className="text-red-600">{
                errors.thumbnail.message
              }</p>
            }
          </div>
        </div>
        <DialogFooter>
          {errors.root && <p className="text-red-600">{
            errors.root.message
          }</p>}
          <Button variant="outline" className="hover:bg-red-600" type="submit" disabled={isSubmitting}>
          {
            isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Publish Video"
          }
          </Button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

