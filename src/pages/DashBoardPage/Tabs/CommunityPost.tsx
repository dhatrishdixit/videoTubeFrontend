import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { TrashIcon } from "../icons/TrashIcon"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios, { AxiosError } from "axios"
import { useToast } from "@/components/ui/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDate } from "@/utils/DateFormat"
import { FiRefreshCw } from "react-icons/fi"

export function CommunityPostDashBoardForm(){
    const { toast } = useToast();
    
    const FormSchema = z.object({
         content:z.string(),
      })
      
        const form = useForm<z.infer<typeof FormSchema>>({
          resolver: zodResolver(FormSchema)
        })
      
        async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/tweets`,{
                  content:data.content,
                
            },{
                withCredentials:true
            })
            
            toast({
                variant:"success",
                type:"foreground",
                description:"Community post created successfully"
            })
            form.reset();
            // setReloadPlaylist(Math.random());
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
      
     return(
        <div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 " id="community-post" >
        <div>
          <h3 className="mb-4 text-lg font-medium">Playlist Creation</h3>
          <div className="space-y-4">
          <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Input placeholder="content" {...field} />
              </FormControl>
              <FormDescription>
                This is your Community Post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      
        
          </div>
        </div>
        <div className='flex justify-between'>
        <Button variant="outline" form= "community-post" className="hover:bg-red-600" type="submit" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Create Community Post"
          }
          </Button>
        <Button type="reset" onClick={()=>{
            form.reset();          
        }}
         className="tabular-nums"
         variant = "outline"
        >Cancel</Button>
        </div>
      </form>
    </Form>
        </div>
     )
}

interface CommunityPostRowProps {
    post:PostsDataSchema,
    setReload:React.Dispatch<React.SetStateAction<number>>
}

export function CommunityPostRow({post,setReload}:CommunityPostRowProps){

    const { toast } = useToast();
     
    const deleteHandler = (postId:string)=>{
        axios.delete(`${import.meta.env.VITE_BASE_URL}/api/v1/tweets/${postId}`, {
            withCredentials: true
        })
        .then(() => {
            toast({
                variant: "success",
                type: "foreground",
                description: "Video deleted successfully"
            });
            setReload(prev => prev+1);
        })
        .catch(err => {
            if (err instanceof AxiosError) {
                toast({
                    variant: "destructive",
                    type: "foreground",
                    description: err?.response?.data?.message
                });
            }
        });
    } 

     return (
        <TableRow>
        <TableCell className="font-medium">{post.content}</TableCell>
        <TableCell>{post.likesCount}</TableCell>
        <TableCell>{formatDate(post.createdAt)}</TableCell>
        <TableCell className="text-right">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={()=>{deleteHandler(post._id)}}>
            <TrashIcon className="w-5 h-5 text-muted-foreground"/>
          </Button>
        </TableCell>
      </TableRow>
     )
}

interface PostsDataSchema {
   _id:string,
   content:string,
   createdAt:string,
   ownerId:string,
   likesCount:number
}

export function CommunityPostDashBoard(){

    const {toast} = useToast();
        
    const [reload,setReload] = useState<number>(0);
    const [loading,setLoading] = useState<boolean>(false);
    const [postsData,setPostsData] = useState<PostsDataSchema[]>([]);

    
    useEffect(()=>{
       setLoading(true);
       axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/dashboard/posts`, {
        withCredentials: true
       }).
       then(res=>{
          setPostsData(res.data.data as PostsDataSchema[]);
       })
       .catch(err => {
        if (err instanceof AxiosError) {
            toast({
                variant: "destructive",
                type: "foreground",
                description: err?.response?.data?.message
            });
        }
       })
       .finally(()=>{
         setLoading(false);
       })
    },[reload])

    const handleReload = () => {
        setReload(prev => prev+1);
    }
    return (
        <div className="grid gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
            <CardTitle className="text-4xl font-bold">Create Community Post</CardTitle>
            </div>
           
          </CardHeader>
          <CardContent>
             <CommunityPostDashBoardForm/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
               <CardTitle className="text-4xl font-bold">Community Posts</CardTitle> 
               <Button variant="ghost" size="icon" onClick={handleReload}>
                            <FiRefreshCw className="w-6 h-6 text-muted-foreground" />
            </Button>
            </div>
            
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Post</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
            
              {
                            loading == true ? 
                           (
                            Array.from({ length: 5 })?.map((_, index) => (
                                <TableRow key={index}>
                                  <TableCell className="w-[180px]">
                                    <Skeleton className="h-4 w-full" />
                                  </TableCell>
                                  <TableCell className="w-[100px]">
                                    <Skeleton className="h-4 w-full" />
                                  </TableCell>
                                  <TableCell className="w-[150px]">
                                    <Skeleton className="h-4 w-full" />
                                  </TableCell>
                                  <TableCell className="w-[100px]">
                                    <Skeleton className="h-4 w-full" />
                                  </TableCell>
                                </TableRow>
                              ))
                           )
                                :
                                <TableBody>
                                {postsData?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7}>No videos available</TableCell>
                                    </TableRow>
                                ) : (
                                    postsData?.map(post => (
                                        <CommunityPostRow
                                            key={post._id}
                                            post={post}
                                            setReload={setReload}
                                        />
                                    ))
                                )}
                            </TableBody>
                            
                        }
             
            
            </Table>
          </CardContent>
        </Card>
      </div>
    )
}