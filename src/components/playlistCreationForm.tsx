import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import axios, { AxiosError } from "axios"
import { ReloadIcon } from '@radix-ui/react-icons'



interface PlaylistCreationFormProps {
    setFormOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setReloadPlaylist: React.Dispatch<React.SetStateAction<number>>
}
const FormSchema = z.object({
  playlist_name: z.string(),
  playlist_description: z.string(),
  is_public: z.boolean().default(true),
  
})

export function PlaylistCreationForm({setFormOpen,setReloadPlaylist}:PlaylistCreationFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues:{
        is_public: true,
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
  try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/playlist`,{
            name:data.playlist_name,
            description:data.playlist_description,
            isPublic:data.is_public
      },{
          withCredentials:true
      })
      
      toast({
          variant:"success",
          type:"foreground",
          description:"Playlist created successfully"
      })
      setFormOpen(false);
      setReloadPlaylist(Math.random());
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 " id="create-playlist">
        <div>
          <h3 className="mb-4 text-lg font-medium">Playlist Creation</h3>
          <div className="space-y-4">
          <FormField
          control={form.control}
          name="playlist_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormDescription>
                This is your playlist name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="playlist_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea  placeholder="description" {...field} />
              </FormControl>
              <FormDescription>
                This is your playlist description.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
              control={form.control}
              name="is_public"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Access to the playlist
                    </FormLabel>
                    <FormDescription>
                      <p className="text-sm text-gray-500">
                        Public playlists are visible to everyone.
                      </p>
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        
          </div>
        </div>
        <div className='flex justify-between'>
        <Button variant="outline" form= "create-playlist" className="hover:bg-red-600" type="submit" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "Create Playlist"
          }
          </Button>
        <Button onClick={()=>{
            setFormOpen(false)            
        }}
         className="tabular-nums"
         variant = "outline"
        >Cancel</Button>
        </div>
      </form>
    </Form>
  )
}



